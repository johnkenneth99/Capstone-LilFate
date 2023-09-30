import QuestionForm from "@/components/Forms/QuestionForm";
import { useEffect, useRef } from "react";
import { FaXmark } from "react-icons/fa6";

const ESCAPE_KEY_CODE = 27;

export default function QuestionDialog({ header = null, dialogRef = null, ...props }) {
  const formikRef = useRef(null);

  useEffect(() => {
    if (!dialogRef) return;

    dialogRef.current.addEventListener("keydown", handleKeydownEvent);

    return () => {
      dialogRef.current.removeEventListener("keydown", handleKeydownEvent);
    };
  }, [dialogRef]);

  const handleKeydownEvent = ({ isTrusted, keyCode }) => {
    if (isTrusted && keyCode === ESCAPE_KEY_CODE) {
      formikRef.current.handleReset();
    }
  };

  const handleOnClose = () => {
    dialogRef.current.close();
    formikRef.current.handleReset();
  };

  return (
    <dialog className="border-0 drop-shadow-lg rounded-t backdrop:bg-black backdrop:opacity-60" ref={dialogRef}>
      <div className="w-[720px] overflow-auto">
        <section className="flex items-center w-full bg-slate-600 p-3">
          <h1 className="text-white text-xl font-bold mr-auto">{header}</h1>
          <button className="text-white text-lg" onClick={() => handleOnClose()}>
            <FaXmark />
          </button>
        </section>
        <QuestionForm formikRef={formikRef} {...props} />
      </div>
    </dialog>
  );
}
