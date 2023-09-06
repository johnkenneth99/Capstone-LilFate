import { useField, ErrorMessage } from "formik";

export default function InputField({ label, name, ...props }) {
  const [field, meta, helpers] = useField(name);
  return (
    <div className="flex flex-col focus-within:text-blue-400 mb-0">
      <label className="relative top-6 left-2 text-sm font-medium">{label}</label>
      <input
        name={name}
        placeholder=""
        className="text-black pt-5 pb-2 px-2 outline-0 border rounded focus:rounded-none focus:border-0 focus:border-blue-400 focus:border-b-[1px]"
        {...props}
        {...field}
      />
      <ErrorMessage name={name}>{(ErrorMessage) => <p className="text-sm text-red-500">{ErrorMessage}</p>}</ErrorMessage>
    </div>
  );
}
