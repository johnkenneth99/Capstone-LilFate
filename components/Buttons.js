import classNames from "classnames";

export function PrimaryButton({ width = null, height = null, label = "", icon, disabled = false, ...props }) {
  const buttonClass = classNames(
    "flex justify-center items-center rounded font-medium p-3 gap-1",
    { "text-white bg-slate-600 hover:bg-slate-400": !disabled },
    { "text-slate-500 bg-slate-400": !!disabled },
    { [width]: !!width },
    { [height]: !!height }
  );
  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      {icon}
      {label}
    </button>
  );
}
