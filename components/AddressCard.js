"use client";

import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { useRouter } from "next/navigation";
import { LuMapPin, LuCheck, LuTrash2, LuPencil } from "react-icons/lu";

const LocationIcon = () => <LuMapPin size={16} aria-hidden="true" />;

export default function AddressCard({ address, editable = false, selected, onSelect, onDelete, onEdit }) {
	const router = useRouter();

	// Selectable mode (for shipping page saved addresses list)
	if (onSelect) {
		return (
			<div
				onClick={onSelect}
				className={`relative bg-surface rounded-2xl border-2 p-4 md:p-5 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md ${
					selected
						? "border-primary bg-primary/3"
						: "border-border hover:border-primary/40"
				}`}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onSelect();
					}
				}}
				aria-pressed={selected}
				aria-label={`Select address for ${address.fullName}`}>

				{/* Selection indicator */}
				<div className="flex items-start gap-3">
					<div className={`w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
						selected ? "border-primary bg-primary" : "border-border"
					}`}>
						{selected && (
							<LuCheck size={12} strokeWidth={3} className="text-white" aria-hidden="true" />
						)}
					</div>

					<div className="flex-1 min-w-0">
						<p className="font-semibold text-sm text-text">{address.fullName}</p>
						{address.email && <p className="text-xs text-text-secondary mt-0.5">{address.email}</p>}
						<p className="text-xs text-text-secondary mt-0.5">{address.phone}</p>
						<p className="text-xs text-text-secondary mt-0.5">
							{address.city}, {address.state} - {address.pinCode}
						</p>
					</div>

					{/* Edit button */}
					{onEdit && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								onEdit();
							}}
							className="w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-text-muted hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-pointer"
							aria-label={`Edit address for ${address.fullName}`}>
							<LuPencil size={14} aria-hidden="true" />
						</button>
					)}

					{/* Delete button */}
					{onDelete && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								onDelete();
							}}
							className="w-7 h-7 shrink-0 rounded-lg flex items-center justify-center text-text-muted hover:text-error hover:bg-red-50 transition-all duration-200 cursor-pointer"
							aria-label={`Remove address for ${address.fullName}`}>
							<LuTrash2 size={14} aria-hidden="true" />
						</button>
					)}
				</div>
			</div>
		);
	}

	// Default display mode (payment & success pages)
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
