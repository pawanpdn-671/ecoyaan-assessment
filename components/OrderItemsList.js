import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { LuShoppingBag } from "react-icons/lu";

export default function OrderItemsList({ items }) {
	return (
		<Card>
			<SectionHeading icon={<LuShoppingBag size={16} />}>Order Items</SectionHeading>
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
