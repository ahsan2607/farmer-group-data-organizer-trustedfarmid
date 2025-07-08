'use client'

type TablePropsType<T> = {
  data: T[]
  columns: { key: keyof T; label: string }[]
  onEdit: (item: T) => void
}

export const Table = <T extends { id: number }>(props: TablePropsType<T>) => {
  const { data, columns, onEdit } = props

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Desktop view */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">No.</th>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 text-left font-semibold whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td
                    key={String(item.id)}
                    className="px-4 py-3 text-gray-800 whitespace-nowrap"
                  >
                    {String(item.id)}
                  </td>
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="px-4 py-3 text-gray-800 whitespace-nowrap"
                  >
                    {String(item[col.key] ?? '')}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-blue-600 hover:underline text-sm font-medium"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      {/* <div className="sm:hidden divide-y divide-gray-200">
        {data.map((item) => (
          <div key={item.id} className="px-4 py-4">
            <div className="space-y-3">
              {columns.map((col) => (
                <div key={String(col.key)}>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {col.label}
                  </div>
                  <div className="text-sm text-gray-800">
                    {String(item[col.key] ?? '')}
                  </div>
                </div>
              ))}
              <div className="pt-3 text-right">
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
  )
}
