import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { name: "January", patients: 120, surgeries: 30, consultations: 200 },
  { name: "February", patients: 140, surgeries: 35, consultations: 220 },
  { name: "March", patients: 160, surgeries: 40, consultations: 250 },
  { name: "April", patients: 180, surgeries: 50, consultations: 270 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-white">Total Patients</h2>
          <p className="text-3xl text-white">5,432</p>
          <p className="text-green-500">+5.2% this month</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-white">Surgeries</h2>
          <p className="text-3xl text-white">1,234</p>
          <p className="text-green-500">+3.1% this month</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-white">Consultations</h2>
          <p className="text-3xl text-white">8,765</p>
          <p className="text-green-500">+4.8% this month</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-white">Revenue ($)</h2>
          <p className="text-3xl text-white">18,000</p>
          <p className="text-green-500">+6.5% this month</p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">
          Monthly Statistics
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" stroke="gray" />
            <Legend />
            <Line type="monotone" dataKey="patients" stroke="blue" />
            <Line type="monotone" dataKey="surgeries" stroke="lightgreen" />
            <Line
              type="monotone"
              dataKey="consultations"
              stroke="orange"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
