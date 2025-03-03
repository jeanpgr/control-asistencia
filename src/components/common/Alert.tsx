import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Feedback } from '../../types';

interface AlertProps {
  feedback: Feedback;
}

const Alert: React.FC<AlertProps> = ({ feedback }) => {
  if (!feedback.message) return null;

  return (
    <div
      className={`mb-4 p-3 rounded-md ${
        feedback.isError
          ? "bg-red-50 text-red-700"
          : "bg-green-50 text-green-700"
      } flex items-start`}
    >
      {feedback.isError ? (
        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
      ) : (
        <div className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-green-500">
          ✓
        </div>
      )}
      <p>{feedback.message}</p>
    </div>
  );
};

export default Alert;