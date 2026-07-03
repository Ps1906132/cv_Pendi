type Column = { key: string; label: string }
type Props = { columns: Column[]; data: Record<string, any>[] }

export default function Table({ columns, data }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-800 bg-gray-900">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-semibold text-gray-300">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-gray-800 last:border-0 hover:bg-gray-900/50">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-400">{row[col.key] ?? "-"}</td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">Tidak ada data</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
