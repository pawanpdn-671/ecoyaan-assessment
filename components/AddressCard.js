"use client";

import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { useRouter } from "next/navigation";

const LocationIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
		<circle cx="12" cy="10" r="3" />
	</svg>
);

export default function AddressCard({ address, editable = false }) {
	const router = useRouter();

	return (
		<Card>
			<SectionHeading
				icon={<LocationIcon />}
				action={
					editable ? (
						<button
							onClick={() => router.push("/shipping")}
							className="text-xs text-primary hover:text-primary-dark font-medium cursor-pointer transition-colors"
							aria-label="Edit shipping address">
							Edit
						</button>
					) : null
				}>
				{editable ? "Delivery Address" : "Delivering To"}
			</SectionHeading>
			<div className="text-sm text-text-secondary space-y-0.5">
				<p className="font-semibold text-text">{address.fullName}</p>
				{address.email && <p>{address.email}</p>}
				<p>{address.phone}</p>
				<p>
					{address.city}, {address.state} - {address.pinCode}
				</p>
			</div>
		</Card>
	);
}
