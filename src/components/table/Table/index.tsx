"use client";
import { Button } from "@/components/ui";
import { Plus, Edit } from "lucide-react";

type TablePropsType<T> = {
  label: string;
  data: T[];
  columns: { key: keyof T; label: string }[];
  onAdd: () => void;
  onEdit: (item: T) => void;
};

export const Table = <T extends { id: number }>({ label, data, columns, onAdd, onEdit }: TablePropsType<T>) => {
  return (
    <>
      <div className="flex flex-row gap-4 mb-6 items-center">
        <h2 className="text-xl font-bold">{label}</h2>
        <Button actionType="add" variant="primary" icon={<Plus />} onClick={() => onAdd()} />
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Desktop view */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">No.</th>
                {columns.map((col) => (
                  <th key={String(col.key)} className="px-4 py-2 text-left font-semibold whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800 whitespace-nowrap">{index + 1}</td>
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-2 text-gray-800 whitespace-nowrap">
                      {String(item[col.key] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-2">
                    <Button actionType="edit" variant="secondary" icon={<Edit />} onClick={() => onEdit(item)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        {/* <div className="sm:hidden divide-y divide-gray-200">
        {data.map((item, index) => (
          <div key={item.id} className="px-4 py-4">
            <div className="space-y-2">
              <div className="text-sm text-gray-500">#{index + 1}</div>
              {columns.map((col) => (
                <div key={String(col.key)} className="text-sm">
                  <span className="font-medium text-gray-600">{col.label}: </span>
                  {String(item[col.key] ?? '')}
                </div>
              ))}
              <div className="pt-2 text-right">
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      </div>
    </>
  );
};
