"use client";

import React, { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const API_URL = "https://5d3f-89-236-218-41.ngrok-free.app/api/formData_get";

export default function Appointments() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        console.log("Response status:", response.status);

        const contentType = response.headers.get("content-type");
        console.log("Content-Type:", contentType);

        // Читаем ответ как текст, чтобы увидеть, что сервер реально возвращает
        const text = await response.text();
        console.log("Raw response:", text);

        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
        }

        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response type — expected JSON");
        }

        // Парсим JSON из текста
        const result = JSON.parse(text);
        setData(result);
      } catch (error) {
        console.error("Ошибка запроса:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const columns = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "doctor", header: "Doctor" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "phone", header: "Phone Number" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "time", header: "Time" },
    { accessorKey: "request", header: "Special Request" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      {error && <div className="text-red-500">Ошибка: {error}</div>}
      {loading && <div className="text-center">Загрузка...</div>}

      <div className="flex items-center py-4">
        <Input
          placeholder="Поиск по имени..."
          value={table.getColumn("name")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell ??
                          cell.column.columnDef.accessorKey,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Нет данных.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
