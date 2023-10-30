import { isNull } from "@/functions/helpers";
import React, { useEffect, useRef } from "react";
import { FaX } from "react-icons/fa6";

/**
 * @param {React.Component} children
 *
 * @param {string} header
 *
 * @param {boolean} showCloseButton
 *
 * @param {boolean} hasHeader
 *
 * @returns {React.Component}
 */

const Dialog = ({ children, isOpen, header, showCloseButton, hasHeader }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isNull(isOpen)) return;

    isOpen ? dialogRef.current.showModal() : dialogRef.current.close();
  }, [isOpen]);

  useEffect(() => {
    dialogRef.current.addEventListener("cancel", (event) => event.preventDefault());
  }, []);

  return (
    <dialog className="border-0 rounded shadow-md backdrop:bg-black backdrop:opacity-60" ref={dialogRef}>
      <div className="flex flex-col gap-5">
        {hasHeader && (
          <section className="flex text-white bg-slate-700 p-5">
            <h1 className="font-bold text-xl">{header}</h1>
            {showCloseButton && (
              <button className="ml-auto">
                <FaX />
              </button>
            )}
          </section>
        )}
        <section className="p-5">{children}</section>
      </div>
    </dialog>
  );
};

Dialog.defaultProps = {
  isOpen: true,
  header: "Sample Header",
  showCloseButton: true,
  hasHeader: true,
};

export default Dialog;
