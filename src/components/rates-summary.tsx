interface RateItem {
    label: string
    amount: string
    isTotal?: boolean
}

interface RatesSummaryProps {
    title: string
    items: RateItem[]
}

export function RatesSummary({ title, items }: RatesSummaryProps) {
    return (
        <div className="bg-[#dedede] p-6 rounded-lg mb-3">
            <h3 className="bg-[#f3a32d] text-white px-3 py-1 rounded font-bold inline-block mb-4">{title}</h3>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-300">
                            <th className="border border-gray-400 px-3 py-2 text-left text-black font-semibold">Details</th>
                            <th className="border border-gray-400 px-3 py-2 text-right text-black font-semibold">Rates (RM)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="bg-white">
                                <td className={`border border-gray-400 px-3 py-2 text-black ${item.isTotal ? "font-bold" : ""}`}>
                                    {item.label}
                                </td>
                                <td
                                    className={`border border-gray-400 px-3 py-2 text-right text-black ${item.isTotal ? "font-bold" : ""}`}
                                >
                                    {item.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
