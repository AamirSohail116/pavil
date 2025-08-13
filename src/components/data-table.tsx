interface Column {
    header: string
    key: string
    className?: string
}

interface DataTableProps {
    title: string
    columns: Column[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>[]
    className?: string
}

export function DataTable({ title, columns, data, className = "" }: DataTableProps) {
    return (
        <div className={`bg-[#dedede] p-6 rounded-lg mb-3 ${className}`}>
            <h3 className="bg-[#f3a32d] text-white px-3 py-1 rounded font-bold inline-block mb-4">{title}</h3>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-300">
                            {columns.map((column, index) => (
                                <th key={index} className="border border-gray-400 px-3 py-2 text-left text-black font-semibold">
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex} className="bg-white">
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`border border-gray-400 px-3 py-2 text-black ${column.className || ""}`}
                                    >
                                        {row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
