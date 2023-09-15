import { useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6";

export default function Dialog({ header = null, isOpen = false, content = null, toggle = () => {} }) {
  const modalRef = useRef(null);

  useEffect(() => {
    console.log(modalRef.current.addEventListener);
  }, []);

  useEffect(() => {
    if (isOpen) modalRef.current.showModal();
  }, [isOpen]);
  return (
    <dialog className="border drop-shadow-lg backdrop:bg-slate-950 backdrop:opacity-50" ref={modalRef}>
      <div className="w-[720px] max-h-[700px] overflow-auto">
        <section className="flex items-center w-full bg-slate-600 rounded-t p-3">
          <h1 className="text-white text-xl font-bold mr-auto">{header}</h1>
          <button
            className="text-white text-lg"
            onClick={() => {
              modalRef.current.close();
              toggle();
            }}
          >
            <FaXmark />
          </button>
        </section>
        {content}
      </div>
    </dialog>
  );
}
