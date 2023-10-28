import { CgSpinner } from "react-icons/cg";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-5 w-full animate-spin">
      <CgSpinner />
    </div>
  );
};

export default Spinner;
