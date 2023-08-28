import React, { useEffect, useState } from "react";
import { FIREBASE_CONFIG } from "@/constants";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function useFireStore() {
  const [firestoreDB, setFirestoreDB] = useState(null);

  useEffect(() => {
    const app = initializeApp(FIREBASE_CONFIG);

    setFirestoreDB(getFirestore(app));
  }, []);

  return { db: firestoreDB };
}
