import classNames from "classnames";
import { useField } from "formik";
import React, { Fragment } from "react";
import { ErrorMessage } from "formik";

export default function Dropdown({ name = null, label = null, options = [], disabled = false, ...props }) {
  const [field, { error, touched }] = useField(name);

  const labelClass = classNames("top-6", "left-2 ", "relative", "text-sm", "font-medium", { "text-red-500": !!error && touched });

  return (
    <div className="flex flex-col w-full focus-within:text-blue-400 mb-0">
      <label className={labelClass}>{label}</label>
      <select
        className={classNames(
          "pt-5 pb-2 px-2 outline-0 border rounded focus:rounded-none focus:border-0 focus:border-blue-400 focus:border-b-[1px]",
          { "text-slate-500": disabled },
          { "text-black": !disabled },
          { "border-red-500": !!error && touched }
        )}
        disabled={disabled}
        {...props}
        {...field}
      >
        {options.map(({ value, label }, index) => (
          <Fragment key={index}>
            <option value={value} hidden={index === 0}>
              {label}
            </option>
          </Fragment>
        ))}
      </select>
      <ErrorMessage name={name}>{(ErrorMessage) => <p className="text-red-500">{ErrorMessage}</p>}</ErrorMessage>
    </div>
  );
}
