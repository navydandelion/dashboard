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

// URL API
const API_URL = "https://867d-89-236-218-41.ngrok-free.app/api/dataForm";

export default function DataTable() {
  const [data, setData] = useState([]); // Данные из API

  // Запрос к API при загрузке страницы
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        const text = await response.text(); // Получаем текст ответа
        console.log("Ответ API:", text); // Логируем полный ответ
        const result = JSON.parse(text); // Пробуем разобрать JSON
        setData(result); // Устанавливаем данные
      } catch (error) {
        console.error("Ошибка запроса:", error);
      }
    }

    fetchData();
  }, []);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "department",
      header: "Department",
    },
    {
      accessorKey: "doctor",
      header: "Doctor",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "time",
      header: "Time",
    },
    {
      accessorKey: "request",
      header: "Special Request",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => new Date(row.getValue("created_at")).toLocaleString(),
    },
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
      {/* Фильтр поиска */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by name..."
          value={table.getColumn("name")?.getFilterValue() || ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Таблица */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
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
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
