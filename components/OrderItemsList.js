import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";

const BagIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round">
		<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
		<line x1="3" y1="6" x2="21" y2="6" />
		<path d="M16 10a4 4 0 01-8 0" />
	</svg>
);

export default function OrderItemsList({ items }) {
	return (
		<Card>
			<SectionHeading icon={<BagIcon />}>Order Items</SectionHeading>
			<div className="space-y-3">
				{items.map((item) => (
					<div key={item.product_id} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
						<div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-alt shrink-0 relative">
							<Image src={item.image} alt={item.product_name} fill sizes="48px" className="object-cover" loading="eager" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-text truncate">{item.product_name}</p>
							<p className="text-xs text-text-muted">Qty: {item.quantity}</p>
						</div>
						<p className="font-semibold text-sm text-text">
							{formatCurrency(item.product_price * item.quantity)}
						</p>
					</div>
				))}
			</div>
		</Card>
	);
}
