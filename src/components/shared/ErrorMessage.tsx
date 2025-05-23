import { FaExclamationTriangle } from "react-icons/fa";

const ErrorMessage = ({ errorMessage } : { errorMessage: string}) => {
  return (
    <div className="flex justify-center items-center  h-[200px]">
        <FaExclamationTriangle className="text-slate-800 text-4xl mr-2" />
        <span className="text-slate-800 text-lg font-medium">
            {errorMessage}
        </span>
    </div>
  )
}

export default ErrorMessage