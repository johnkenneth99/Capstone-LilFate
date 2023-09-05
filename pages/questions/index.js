import { useEffect, useMemo, useState } from "react";
import Layout from "@/components/Layout";
import Table from "@/components/Table";
import useBoolean from "@/hooks/useBoolean";
import React from "react";
import { FaPlus, FaXmark, FaTrashCan, FaPen, FaEye } from "react-icons/fa6";
import { PrimaryButton } from "@/components/Buttons";
import QuestionForm from "@/components/Forms/QuestionForm";

import useFireStore from "@/hooks/useFireStore";
import { collection, addDoc, getDocs, doc, limit, query } from "firebase/firestore";

export default function index() {
  const { bool: isOpen, setBool, toggle } = useBoolean(false);

  const { db } = useFireStore();
  const [data, setData] = useState([]);
  const [test, setTest] = useState(null);

  useEffect(() => {
    if (db === null) return;

    (async () => {
      const result = [];

      const payload = query(collection(db, "questions"), limit(15));
      const snapshot = await getDocs(payload);

      snapshot.forEach((doc) => result.push(doc.data()));

      setData(result);
      console.log(result);
    })();
  }, [db]);

  const columns = useMemo(() => {
    return [
      { header: "Subject", accessorKey: "subject" },
      { header: "Year Level", accessorKey: "level" },
      { header: "Difficulty", accessorKey: "difficulty" },
      { header: "Question", accessorKey: "question" },
      {
        header: "Actions",
        cell: (info) => (
          <div className="flex items-center justify-center gap-5">
            <button
              className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400"
              onClick={() => {
                setBool(true);
                console.log(info);
                setTest(info.row.original);
              }}
            >
              <FaEye />
            </button>
            <button className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400">
              <FaPen />
            </button>
            <button className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400">
              <FaTrashCan />
            </button>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <Layout>
      <main className="">
        <dialog className="border shadow-lg rounded drop-shadow-2xl " open={isOpen}>
          <div className="w-[720px] ma-h-[700px] overflow-auto">
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
        <Table data={data} columns={columns} />
      </main>
    </Layout>
  );
}
