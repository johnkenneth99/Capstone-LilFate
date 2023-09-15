import { useEffect, useState } from "react";
import { limit } from "firebase/firestore";
import { FaPlus } from "react-icons/fa6";

import useFireStore from "@/hooks/useFireStore";
import { parseDocuments } from "@/functions/helpers";

import Layout from "@/components/Layout";
import { PrimaryButton } from "@/components/Buttons";
import QuestionTable from "@/components/Tables/QuestionTable";

import { COLLECTION } from "@/constants";

export default function Index() {
  const [documents, setDocuments] = useState([]);

  const { data, isLoading } = useFireStore(COLLECTION.QUESTIONS, limit(15));

  useEffect(() => {
    if (data) {
      setDocuments(parseDocuments(data));
    }
  }, [data]);
  return (
    <Layout>
      {!isLoading && (
        <main>
          <section className="flex justify-end my-5 gap-2">
            <PrimaryButton label="Question" icon={<FaPlus />} onClick={() => toggle()} />
          </section>

          <QuestionTable data={documents} />
        </main>
      )}
    </Layout>
  );
}
