import { useEffect, useReducer, useRef } from "react";
import { FIREBASE_CONFIG, ACTIONS, STATUS } from "@/constants";
import { initializeApp } from "firebase/app";
import { collection as getCollection, query as buildQuery, getDocs, getFirestore, addDoc } from "firebase/firestore";
import { useRouter } from "next/router";

const INITIAL_VALUE = {
  data: null,
  isError: false,
  isLoading: true,
  errorMessage: null,
  mutate: () => {},
};

const reducer = (state, { type, value }) => {
  switch (type) {
    case ACTIONS.SUCCESS:
      return {
        ...state,
        data: value,
        isError: false,
        isLoading: false,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        data: null,
        isError: true,
        isLoading: false,
        errorMessage: value,
      };
  }
};

export default function useFireStore(name = null, ...constraints) {
  const { reload } = useRouter();
  const collectionRef = useRef(null);
  const appRef = useRef(initializeApp(FIREBASE_CONFIG));
  const dbRef = useRef(getFirestore(appRef.current));

  const [state, dispatch] = useReducer(reducer, INITIAL_VALUE);

  const search = async (constraints) => {
    const query = buildQuery(collectionRef.current, ...constraints);

    try {
      const querySnapshot = await getDocs(query);
      dispatch({ type: ACTIONS.SUCCESS, value: querySnapshot });
    } catch (error) {
      dispatch({ type: ACTIONS.ERROR, value: error });
    }
  };

  const addDocument = async (params) => {
    const data = {
      ...params,
      status: STATUS.PENDING,
      created_at: new Date().toJSON(),
      created_by: 1,
      updated_at: new Date().toJSON(),
      updated_by: 1,
    };

    addDoc(collectionRef.current, data)
      .then(() => reload())
      .catch((error) => {
        throw new Error(error);
      });
  };

  useEffect(() => {
    if (dbRef.current === null) return;

    collectionRef.current = getCollection(dbRef.current, name);

    if (!!constraints.length) {
      (async () => {
        const query = buildQuery(collectionRef.current, ...constraints);

        try {
          const querySnapshot = await getDocs(query);

          dispatch({ type: ACTIONS.SUCCESS, value: querySnapshot });
        } catch (error) {
          dispatch({ type: ACTIONS.ERROR, value: error });
        }
      })();
    }
  }, []);

  return { ...state, search, addDocument };
}
