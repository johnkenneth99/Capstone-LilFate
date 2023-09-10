import { useEffect, useReducer } from "react";
import { FIREBASE_CONFIG, ACTIONS } from "@/constants";
import { initializeApp } from "firebase/app";
import { collection as getCollection, query as buildQuery, getDocs, getFirestore } from "firebase/firestore";

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
  const [state, dispatch] = useReducer(reducer, INITIAL_VALUE);

  useEffect(() => {
    (async () => {
      const app = initializeApp(FIREBASE_CONFIG);
      const db = getFirestore(app);

      const collectionReference = getCollection(db, name);

      const query = buildQuery(collectionReference, ...constraints);

      try {
        const querySnapshot = await getDocs(query);

        dispatch({ type: ACTIONS.SUCCESS, value: querySnapshot });
      } catch (error) {
        dispatch({ type: ACTIONS.ERROR, value: error });
      }
    })();
  }, [name]);

  return state;
}
