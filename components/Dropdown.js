import classNames from "classnames";
import { useField } from "formik";
import React, { Fragment } from "react";

export default function Dropdown({ name = null, label = null, options = [], disabled = false, ...props }) {
  const [field, { error, touched }] = useField(name);

  return (
    <div className="flex flex-col w-full focus-within:text-blue-400 mb-0">
      <label className="relative top-6 left-2 text-sm font-medium">{label}</label>
      <select
        placeholder="Subject"
        className={classNames(
          "pt-5 pb-2 px-2 outline-0 border rounded focus:rounded-none focus:border-0 focus:border-blue-400 focus:border-b-[1px]",
          { "text-slate-500": disabled },
          { "text-black": !disabled }
        )}
        disabled={disabled}
        {...props}
        {...field}
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
