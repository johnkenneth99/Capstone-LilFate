export function PrimaryButton({ label = "Button", icon, ...props }) {
  return (
    <button className="flex justify-center items-center bg-slate-600 rounded text-white font-medium p-3 gap-1 hover:bg-slate-400" {...props}>
      {icon}
      {label}
    </button>
  );
}
