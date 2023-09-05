import React from "react";

export default function InputField({ label, ...props }) {
  return (
    <div className="flex flex-col focus-within:text-blue-400 mb-0">
      <label className="relative top-6 left-2 text-sm font-medium">{label}</label>
      <input
        type="text"
        placeholder=""
        className="text-black pt-5 pb-2 px-2 outline-0 border rounded focus:rounded-none focus:border-0 focus:border-blue-400 focus:border-b-[1px]"
        {...props}
      />
    </div>
  );
}
