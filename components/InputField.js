import { useField, ErrorMessage } from "formik";
import classNames from "classnames";

export default function InputField({ label, name, inputProps, ...props }) {
  const [field, meta, _] = useField(name);

  const { error, touched } = meta;

  const inputClass = classNames(
    "px-2",
    "pb-2",
    "pt-5",
    "border",
    "rounded",
    "outline-0",
    "text-black",
    "focus:border-b-[1px]",
    { "border-red-500": !!error && touched },
    { "focus:rounded-none focus:border-b-blue-400 focus:border-x-white focus:border-t-white": !error },
    { ...inputProps }
  );

  const labelClass = classNames("relative", "top-6", "left-2", "text-sm", "font-medium", { "text-red-500": !!error && touched });

  return (
    <div className="flex flex-col w-full focus-within:text-blue-400 mb-0">
      <label className={labelClass}>{label}</label>
      <input className={inputClass} {...props} {...field} />
      <ErrorMessage name={name}>{(ErrorMessage) => <p className="text-sm text-red-500">{ErrorMessage}</p>}</ErrorMessage>
    </div>
  );
}
