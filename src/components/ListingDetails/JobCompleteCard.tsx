import React from "react";

const JobCompleteCard = () => {
  return (
    <div className="bg-white rounded-2xl transaction-card ml-2">
      <button
        style={{
          background:
            "linear-gradient(93.06deg, rgb(255, 0, 199) 2.66%, rgb(255, 159, 251) 98.99%)",
          borderRadius: 16,
          paddingTop: 20,
          paddingBottom: 20,
          fontSize: 24,
          fontWeight: 600,
          color: "white",
          width: "100%",
        }}
      >
        Complete Job
      </button>
    </div>
  );
};

export default JobCompleteCard;
