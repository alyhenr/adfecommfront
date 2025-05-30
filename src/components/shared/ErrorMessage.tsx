import { FiAlertTriangle } from "react-icons/fi";

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="rounded-full bg-red-50 p-3">
        <FiAlertTriangle className="text-red-500 w-6 h-6" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-medium text-gray-900">Ocorreu um erro</h3>
        <p className="mt-1 text-sm text-gray-500">{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;