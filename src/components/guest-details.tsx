interface GuestDetailsProps {
    name: string
    email: string
    phone: string
}

export function GuestDetails({ name, email, phone }: GuestDetailsProps) {
    return (
        <div className="bg-[#dedede] p-6 rounded-lg mb-3">
            <h3 className="bg-[#f3a32d] text-white px-3 py-1 rounded font-bold inline-block mb-3">Your Details</h3>
            <div className="text-black space-y-1">
                <p>{name}</p>
                <p>Email ID : {email}</p>
                <p>Phone: {phone}</p>
            </div>
        </div>
    )
}
