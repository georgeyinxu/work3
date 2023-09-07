import React, { useState } from "react";
import { LineChart, Line, XAxis, Tooltip, Label } from "recharts";

const data = [
  { name: "Jan", BTCUSD: 4000 },
  { name: "Feb", BTCUSD: 4200 },
  { name: "Mar", BTCUSD: 4500 },
  { name: "Apr", BTCUSD: 4700 },
  { name: "May", BTCUSD: 4900 },
  { name: "Jun", BTCUSD: 5200 },
  { name: "Jul", BTCUSD: 5400 },
  { name: "Aug", BTCUSD: 5600 },
  { name: "Sep", BTCUSD: 5800 },
  { name: "Oct", BTCUSD: 6000 },
  { name: "Nov", BTCUSD: 6200 },
  { name: "Dec", BTCUSD: 6400 },
];

const UserDeployments = () => {
  const [showXAxis, setShowXAxis] = useState(false);

  return (
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 10,
      }}
      onMouseEnter={() => setShowXAxis(true)}
      onMouseLeave={() => setShowXAxis(false)}
    >
      {showXAxis && <XAxis dataKey="name" axisLine={false} tickLine={false} />}
      <Tooltip />
      <Line
        type="monotone"
        dataKey="BTCUSD"
        stroke="#FE66FF"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default UserDeployments;
