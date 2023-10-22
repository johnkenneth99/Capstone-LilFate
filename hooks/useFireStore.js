import { useEffect, useReducer, useRef, useState } from "react";
import { FIREBASE_CONFIG, ACTIONS, STATUS, COLLECTION } from "@/constants";
import { initializeApp } from "firebase/app";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  collection as getCollection,
  query as buildQuery,
  getFirestore,
  startAfter,
} from "firebase/firestore";

const INITIAL_VALUE = {
  data: null,
  isError: false,
  isLoading: true,
  errorMessage: null,
  isConcatenated: false,
  mutate: () => {},
};

const reducer = (state, { type, value, isConcatenated }) => {
  switch (type) {
    case ACTIONS.SUCCESS:
      return {
        ...state,
        isConcatenated,
        data: value,
        isError: false,
        isLoading: false,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        isConcatenated,
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

  const [auth, setAuth] = useState(getAuth(appRef.current));
  const [state, dispatch] = useReducer(reducer, INITIAL_VALUE);

  const search = async (constraints) => {
    const query = buildQuery(collectionRef.current, ...constraints);

    try {
      const querySnapshot = await getDocs(query);

      dispatch({ type: ACTIONS.SUCCESS, value: querySnapshot, isConcatenated: false });
    } catch (error) {
      dispatch({ type: ACTIONS.ERROR, value: error });
    }
  };

  const addDocument = async (params) => {
    const { option_1, option_2, option_3, option_4, ...rest } = values;

    const modifiedValues = { collection_name: COLLECTION.QUESTIONS, choices: [option_1, option_2, option_3, option_4], ...rest };

    const data = {
      ...params,
      status: STATUS.PENDING,
      created_at: new Date().toJSON(),
      created_by: 1,
      updated_at: new Date().toJSON(),
      updated_by: 1,
    };

    try {
      await addDoc(collectionRef.current, data);

      reload();
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateDocument = async ({ id, option_1, option_2, option_3, option_4, ...rest }) => {
    const documentRef = doc(dbRef.current, COLLECTION.QUESTIONS, id);

    const params = {
      updated_by: 1,
      status: STATUS.PENDING,
      updated_at: new Date().toJSON(),
      choices: [option_1, option_2, option_3, option_4],
      ...rest,
    };

    try {
      await updateDoc(documentRef, params);

      reload();
    } catch (error) {
      throw new Error(error);
    }
  };

  const deleteDocument = async ({ id, collection_name }) => {
    const documentRef = doc(dbRef.current, collection_name, id);

    try {
      await deleteDoc(documentRef);

      reload();
    } catch (error) {
      throw new Error(error);
    }
  };

  const getNext = async (lastDocument, ...currentQuery) => {
    const query = buildQuery(collectionRef.current, ...currentQuery, startAfter(lastDocument));

    try {
      const querySnapshot = await getDocs(query);

      dispatch({ type: ACTIONS.SUCCESS, value: querySnapshot, isConcatenated: true });
    } catch (error) {
      dispatch({ type: ACTIONS.ERROR, value: error });
    }
  };

  useEffect(() => {
    if (dbRef.current === null || !name) return;
    console.log(name);

    collectionRef.current = getCollection(dbRef.current, name);

    if (!!constraints.length) {
      (async () => {
        const query = buildQuery(collectionRef.current, ...constraints);

        try {
          const querySnapshot = await getDocs(query);

          dispatch({ type: ACTIONS.SUCCESS, value: querySnapshot, isConcatenated: false });
        } catch (error) {
          dispatch({ type: ACTIONS.ERROR, value: error });
        }
      })();
    }
  }, []);

  return { ...state, auth, search, getNext, addDocument, updateDocument, deleteDocument };
}
