import { useEffect, useState } from "react";
import { limit } from "firebase/firestore";
import { FaPlus } from "react-icons/fa6";

import useFireStore from "@/hooks/useFireStore";
import { parseDocuments } from "@/functions/helpers";

import Layout from "@/components/Layout";
import Dropdown from "@/components/Dropdown";
import { PrimaryButton } from "@/components/Buttons";
import QuestionTable from "@/components/Tables/QuestionTable";

import { COLLECTION, DROP_DOWN_OPTIONS } from "@/constants";
import { Form, Formik } from "formik";

const DROP_DOWN_FIELDS = [
  { name: "subject", label: "Subject", options: DROP_DOWN_OPTIONS.SUBJECT },
  { name: "year_level", label: "Year Level", options: DROP_DOWN_OPTIONS.YEAR_LEVEL },
  { name: "difficulty", label: "Difficulty", options: DROP_DOWN_OPTIONS.DIFFICULTY },
  { name: "status", label: "Status", options: DROP_DOWN_OPTIONS.STATUS },
];

const INITIAL_VALUE = {
  subject: null,
  year_level: null,
  difficulty: null,
};

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
          <section>
            <Formik initialValues={INITIAL_VALUE} validateOnBlur={false} validateOnChange={false} validateOnMount enableReinitialize>
              {(props) => (
                <Form>
                  <div className="grid grid-cols-8 my-5 gap-5">
                    {DROP_DOWN_FIELDS.map((item, index) => (
                      <div className="col-span-1" key={index}>
                        <Dropdown {...item} />
                      </div>
                    ))}
                    <div className="col-span-1 col-end-9 flex justify-end items-center ">
                      <PrimaryButton label="Question" icon={<FaPlus />} onClick={() => toggle()} />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </section>

          <QuestionTable data={documents} />
        </main>
      )}
    </Layout>
  );
}
