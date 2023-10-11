import React from "react";

type Props = {
  header: string;
  text: string;
};

const AlertCard: React.FC<Props> = ({ header, text }) => {
  return (
    <div
      className="p-4 text-sm text-green-800 rounded-2xl bg-green-50 dark:text-green-400"
      role="alert"
    >
      <span className="font-medium">{header}</span> {text}
    </div>
  );
};

export default AlertCard;
