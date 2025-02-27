import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const data = [
  { name: "Cardiology", patients: 320, revenue: 500000 },
  { name: "Neurology", patients: 280, revenue: 420000 },
  { name: "Orthopedics", patients: 340, revenue: 540000 },
  { name: "Pediatrics", patients: 410, revenue: 620000 },
];

export default function Analytics() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-white">Total Patients</h2>
          <p className="text-3xl text-white">12,345</p>
          <p className="text-green-500">+4.7% this month</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-white">New Appointments</h2>
          <p className="text-3xl text-white">2,543</p>
          <p className="text-green-500">+6.2% this month</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-white">Surgeries Completed</h2>
          <p className="text-3xl text-white">785</p>
          <p className="text-red-500">-1.3% this month</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-white">Total Revenue ($)</h2>
          <p className="text-3xl text-white">25,000</p>
          <p className="text-green-500">+8.1% this month</p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4">
          Department Statistics
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" stroke="gray" />
            <Legend />
            <Bar dataKey="patients" fill="blueviolet" />
            <Bar dataKey="revenue" fill="lightgreen" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
