import { useEffect, useState } from "react";
import { limit } from "firebase/firestore";
import { FaPlus, FaXmark } from "react-icons/fa6";

import useBoolean from "@/hooks/useBoolean";
import useFireStore from "@/hooks/useFireStore";
import { parseDocuments } from "@/functions/helpers";

import Layout from "@/components/Layout";
import { PrimaryButton } from "@/components/Buttons";
import QuestionForm from "@/components/Forms/QuestionForm";
import QuestionTable from "@/components/Tables/QuestionTable";

import { COLLECTION } from "@/constants";

export default function index() {
  const [documents, setDocuments] = useState([]);
  const { bool: isOpen, setBool, toggle } = useBoolean(false);

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
          <dialog className="border drop-shadow-lg" open={isOpen}>
            {/* <div className=" bg-blue-400">test</div> */}
            <div className="w-[720px] max-h-[700px] overflow-auto">
              <section className="flex items-center w-full bg-slate-600 rounded-t p-3">
                <h1 className="text-white text-xl font-bold mr-auto">Modal Header</h1>
                <button className="text-white text-lg" onClick={() => setBool(false)}>
                  <FaXmark />
                </button>
              </section>
              <QuestionForm />
            </div>
          </dialog>
          <section className="flex justify-end my-5 gap-2">
            <PrimaryButton label="Question" icon={<FaPlus />} onClick={() => toggle()} />
          </section>

          <QuestionTable data={documents} />
        </main>
      )}
    </Layout>
  );
}
