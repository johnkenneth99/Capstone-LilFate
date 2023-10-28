import { COLLECTION } from "@/constants";
import { isNull } from "@/functions/helpers";
import { doc, collection as getCollection, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFireStore from "@/hooks/useFireStore";

/**
 *
 * @param name Name of the collection in firestore
 *
 * returns CRUD functions
 *
 */

const useCollection = (name = "") => {
  const { reload } = useRouter();

  const { firestore } = useFireStore();
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    if (!name) return;

    setCollection(getCollection(firestore.current, name));
  }, []);

  const updateDocument = async ({ id = null, ...params }) => {
    if (isNull(id)) return;

    const document = doc(firestore.current, COLLECTION.QUESTIONS, id);

    try {
      await updateDoc(document, params);
      reload();
    } catch (error) {
      throw new Error(error);
    }
  };

  return { updateDocument };
};

export default useCollection;
