import { limit, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { isAllObjectValueEmpty, parseDocuments } from "@/functions/helpers";
import useFireStore from "@/hooks/useFireStore";

import Layout from "@/components/Layout";
import QuestionTable from "@/components/Tables/QuestionTable";

import QuestionSearchForm from "@/components/Forms/QuestionSearchForm";
import { ACTION_TYPE, COLLECTION } from "@/constants";

export default function Index() {
  const [documents, setDocuments] = useState([]);

  const { data, search, isLoading, addDocument } = useFireStore(COLLECTION.QUESTIONS, limit(15));

  useEffect(() => {
    if (data) {
      const parsedData = parseDocuments(data);

      const modifiedData = parsedData.map(toValidItem);

      setDocuments(modifiedData);
    }
  }, [data]);

  const toValidItem = ({ choices, ...rest }) => {
    const [option_1, option_2, option_3, option_4] = choices;

    return { option_1, option_2, option_3, option_4, ...rest };
  };

  const handleSubmit = ({ action_type, ...values }) => {
    switch (action_type) {
      case ACTION_TYPE.SEARCH:
        {
          const query = [];

          if (isAllObjectValueEmpty(values)) {
            query.push(limit(15));
          } else {
            for (const [key, value] of Object.entries(values)) {
              if (Boolean(value)) {
                query.push(where(String(key), "==", castValue(key, value)));
              }
            }
          }

          search(query);
        }
        break;
      case ACTION_TYPE.CREATE:
        const { option_1, option_2, option_3, option_4, ...rest } = values;

        const modifiedValues = { choices: [option_1, option_2, option_3, option_4], ...rest };

        addDocument(modifiedValues);
        break;

      default:
        throw new Error("Invalid action type.");
    }
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
