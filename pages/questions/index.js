import { limit, where } from "firebase/firestore";
import { useEffect, useState } from "react";

import { isAllObjectValueEmpty, parseDocuments } from "@/functions/helpers";
import useFireStore from "@/hooks/useFireStore";

import Layout from "@/components/Layout";
import QuestionTable from "@/components/Tables/QuestionTable";

import QuestionSearchForm from "@/components/Forms/QuestionSearchForm";
import { ACTION_TYPE, COLLECTION } from "@/constants";
import { PrimaryButton } from "@/components/Buttons";

export default function Index() {
  const [documents, setDocuments] = useState([]);
  const [currentQuery, setCurrentQuery] = useState([limit(10)]);
  const [isLastPage, setIsLastPage] = useState(false);

  const { data, isConcatenated, search, getNext, isLoading, addDocument, updateDocument, deleteDocument } = useFireStore(
    COLLECTION.QUESTIONS,
    ...currentQuery
  );

  useEffect(() => {
    if (data) {
      const { docs, empty } = data;

      const parsedData = parseDocuments({ docs, empty });

      const modifiedData = parsedData.map(toValidItem);

      const documentList = isConcatenated ? [...documents, ...modifiedData] : modifiedData;

      setIsLastPage(empty);
      setDocuments(documentList);
    }
  }, [data]);

  const toValidItem = ({ choices, ...rest }) => {
    const [option_1, option_2, option_3, option_4] = choices;

    return { option_1, option_2, option_3, option_4, ...rest };
  };

  const handleSubmit = ({ action_type, limit_count, ...values }) => {
    switch (action_type) {
      case ACTION_TYPE.SEARCH:
        {
          const query = [limit(limit_count)];

          if (!isAllObjectValueEmpty(values)) {
            for (const [key, value] of Object.entries(values)) {
              if (Boolean(value)) {
                query.push(where(key, "==", value));
              }
            }
          }

          search(query);
          setCurrentQuery(query);
        }
        break;

      case ACTION_TYPE.CREATE:
        {
          // const { option_1, option_2, option_3, option_4, ...rest } = values;

          // const modifiedValues = { collection_name: COLLECTION.QUESTIONS, choices: [option_1, option_2, option_3, option_4], ...rest };

          addDocument({ ...values, collection_name: COLLECTION.QUESTIONS });
        }
        break;

      case ACTION_TYPE.UPDATE:
        updateDocument({ ...values, collection_name: COLLECTION.QUESTIONS });
        break;

      case ACTION_TYPE.DELETE:
        deleteDocument({ ...values, collection_name: COLLECTION.QUESTIONS });
        break;

      default:
        throw new Error("Invalid action type.");
    }
  };

  return (
    <Layout>
      {!isLoading && (
        <main className="flex gap-10">
          <div>
            <QuestionSearchForm handleSubmit={handleSubmit} />
          </div>
          <div className="w-full">
            <QuestionTable data={documents} handleSubmit={handleSubmit} />
            <div className="flex justify-center items-center my-5" key={data.docs}>
              <PrimaryButton
                type="button"
                label="SHOW MORE"
                width="w-[25rem]"
                onClick={() => getNext(data.docs.at(-1), ...currentQuery)}
                disabled={isLastPage}
              />
            </div>
          </div>
        </main>
      )}
    </Layout>
  );
}
