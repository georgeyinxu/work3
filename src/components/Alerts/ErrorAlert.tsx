import React from "react";

type Props = {
  header: string;
  text: string;
};

const ErrorAlert: React.FC<Props> = ({ header, text }) => {
  return (
    <div
      className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400"
      role="alert"
    >
      <span className="font-medium">{header}</span> {text}
    </div>
  );
};

export default ErrorAlert;
