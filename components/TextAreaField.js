import { useField, ErrorMessage } from "formik";
import classNames from "classnames";

export default function TextAreaField({ label, name, ...props }) {
  const [field, meta, _] = useField(name);

  const { error, touched } = meta;

  const textAreaClass = classNames(
    "pt-5",
    "pb-2",
    "px-2",
    "border",
    "rounded",
    "outline-0",
    "text-black",
    "focus:border-0",
    "focus:rounded-none",
    "focus:border-b-[1px]",
    { "focus:border-blue-400": !error },
    { "border-red-500": !!error && touched }
  );

  const labelClass = classNames("relative", "top-6", "left-2", " text-sm", "font-medium", { "text-red-500": !!error && touched });

  return (
    <div className="flex flex-col focus-within:text-blue-400 mb-0">
      <label className={labelClass}>{label}</label>
      <textarea type="text" className={textAreaClass} {...props} {...field} />
      <ErrorMessage name={name}>{(ErrorMessage) => <p className="text-sm text-red-500 mt-1">{ErrorMessage}</p>}</ErrorMessage>
    </div>
  );
}
