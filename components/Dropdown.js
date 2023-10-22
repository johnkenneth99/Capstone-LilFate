import classNames from "classnames";
import { useField } from "formik";
import { Fragment, useId } from "react";
import { ErrorMessage } from "formik";

export default function Dropdown({ name = null, label = null, options = [], disabled = false, ...props }) {
  const id = useId();

  const [field, meta, _] = useField(name);

  const { error, touched } = meta;

  const selectClass = classNames(
    "pt-5 pb-2 px-2 outline-0 border rounded text-black",
    { "opacity-100": disabled },
    { "bg-gray-100": disabled },
    { "border-red-500": !!error && touched },
    { "focus:rounded-none focus:border-b-blue-400 focus:border-x-white focus:border-t-white": !error }
  );

  const labelClass = classNames("top-6", "left-2 ", "relative", "text-sm", "font-medium", { "text-red-500": !!error && touched });

  return (
    <div className="flex flex-col w-full focus-within:text-blue-400 mb-0">
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <select className={selectClass} id={id} disabled={disabled} {...props} {...field}>
        {options.map(({ value, label, isHidden }, index) => (
          <Fragment key={index}>
            <option value={value} hidden={index === 0 && isHidden}>
              {label}
            </option>
          </Fragment>
        ))}
      </select>
      <ErrorMessage name={name}>{(ErrorMessage) => <p className="text-red-500">{ErrorMessage}</p>}</ErrorMessage>
    </div>
  );
}
