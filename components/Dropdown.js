import React, { Fragment } from "react";

export default function Dropdown({ label = null, options = [], ...props }) {
  return (
    <div className="flex flex-col focus-within:text-blue-400 mb-0">
      <label className="relative top-6 left-2 text-sm font-medium">{label}</label>
      <select
        placeholder="Subject"
        className="text-black pt-5 pb-2 px-2 outline-0 border rounded focus:rounded-none focus:border-0 focus:border-blue-400 focus:border-b-[1px]"
        {...props}
      >
        {options.map((item, index) => (
          <Fragment key={index}>
            <option value={item.label}>{item.label}</option>
          </Fragment>
        ))}
      </select>
    </div>
  );
}
