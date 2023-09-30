import { limit, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

import { parseDocuments } from "@/functions/helpers";
import useFireStore from "@/hooks/useFireStore";

import Layout from "@/components/Layout";
import QuestionTable from "@/components/Tables/QuestionTable";

import QuestionSearchForm from "@/components/Forms/QuestionSearchForm";
import { COLLECTION } from "@/constants";

export default function Index() {
  const [documents, setDocuments] = useState([]);

  const { data, search, isLoading } = useFireStore(COLLECTION.QUESTIONS, limit(15));

  useEffect(() => {
    if (data) {
      setDocuments(parseDocuments(data));
    }
  }, [data]);

  const handleSubmit = (values) => {
    const query = [];

    for (const [key, value] of Object.entries(values)) {
      if (value !== null) {
        query.push(where(String(key), "==", castValue(key, value)));
      }
    }

    search(query);
  };

  const castValue = (key, value) => {
    return isNumberValue(key) ? Number(value) : String(value);
  };

  const isNumberValue = (key) => {
    return key === "status" || key === "year_level";
  };

  return (
    <Layout>
      {!isLoading && (
        <main>
          <QuestionSearchForm handleSubmit={handleSubmit} />
          <QuestionTable data={documents} />
        </main>
      )}
    </Layout>
  );
}
