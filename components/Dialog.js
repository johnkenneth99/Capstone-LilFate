import { useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6";

const ESCAPE_KEY_CODE = 27;

export default function Dialog({ header = null, isOpen = false, content = null, setFalse = () => {} }) {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.addEventListener("keydown", handleKeydownEvent);
  }, []);

  useEffect(() => {
    if (isOpen) modalRef.current.showModal();
  }, [isOpen]);

  const handleKeydownEvent = ({ isTrusted, keyCode }) => {
    if (isTrusted && keyCode === ESCAPE_KEY_CODE) setFalse();
  };

  return (
    <dialog className="border-0 drop-shadow-lg rounded-t backdrop:bg-black backdrop:opacity-60" ref={modalRef}>
      <div className="w-[720px] max-h-[700px] overflow-auto">
        <section className="flex items-center w-full bg-slate-600 p-3">
          <h1 className="text-white text-xl font-bold mr-auto">{header}</h1>
          <button
            className="text-white text-lg"
            onClick={() => {
              modalRef.current.close();
              setFalse();
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
