import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Surgery = () => {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiUrl, setApiUrl] = useState(
    "https://10e8-89-236-218-41.ngrok-free.app/api/formData_get"
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}?t=${Date.now()}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "true",
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setFormData(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      setError(error.message);
      setFormData([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = formData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Overnight services and live-in-ser Records
      </h1>

      <div className="mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search appointments..."
          className="w-full"
        />
      </div>

      {loading && <p className="text-center my-4">Loading appointments...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && filteredData.length === 0 && (
        <p className="text-center my-4">No appointments found.</p>
      )}

      {!loading && !error && filteredData.length > 0 && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Support time</TableHead>
                <TableHead>Arrival time</TableHead>
                <TableHead>Waiting time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.timeUsage1}</TableCell>
                  <TableCell>{item.timeUsage2}</TableCell>
                  <TableCell>{item.timeUsage3}</TableCell>
                  <TableCell>{item.timeUsage4}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    {new Date(item.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Surgery;
