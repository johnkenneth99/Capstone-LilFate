import { FaRegCheckCircle } from "react-icons/fa";
import Spinner from "@/components/Spinner";

const ApproveDialogContent = ({ isProcessing, setIsDialogOpen, onSubmit }) => {
  return (
    <div className="p-5">
      <div className="flex flex-col items-center gap-10">
        <div className="text-green-500">
          <FaRegCheckCircle size={128} />
        </div>
        <p className="text-lg">Are you sure you want to approve this question?</p>
      </div>
      <div className="flex justify-center gap-10 mt-5">
        <button className="rounded text-white bg-slate-500 p-3 hover:bg-slate-700" disabled={isProcessing} onClick={() => setIsDialogOpen(false)}>
          Cancel
        </button>
        <button className="rounded text-white bg-green-400 p-3 hover:bg-green-600" onClick={onSubmit}>
          <div className="flex justify-center items-center gap-1">
            {isProcessing && <Spinner />} <p>Approve</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ApproveDialogContent;
