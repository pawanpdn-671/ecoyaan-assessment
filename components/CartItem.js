import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import QuantityControl from "@/components/ui/QuantityControl";

export default function CartItem({ item, onUpdateQuantity, style }) {
	return (
		<div
			className="bg-surface rounded-2xl border border-border p-3 sm:p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
			style={style}>
			{/* Mobile: stacked layout, Desktop: horizontal */}
			<div className="flex gap-3 sm:gap-4 items-start sm:items-center">
				<div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-surface-alt shrink-0 relative">
					<Image src={item.image} alt={item.product_name} loading="eager" fill sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px" className="object-cover" />
				</div>
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-text text-sm md:text-base line-clamp-2 sm:truncate">
						{item.product_name}
					</h3>
					<p className="text-primary font-bold text-base sm:text-lg mt-0.5 sm:mt-1">
						{formatCurrency(item.product_price)}
					</p>
				</div>
				{/* Desktop: quantity + total inline */}
				<div className="hidden sm:flex items-center gap-4">
					<QuantityControl
						quantity={item.quantity}
						onDecrease={() => onUpdateQuantity(item.product_id, item.quantity - 1)}
						onIncrease={() => onUpdateQuantity(item.product_id, item.quantity + 1)}
					/>
					<div className="text-right min-w-17.5">
						<p className="font-bold text-text text-base md:text-lg">
							{formatCurrency(item.product_price * item.quantity)}
						</p>
					</div>
				</div>
			</div>
			{/* Mobile: quantity + total below */}
			<div className="flex sm:hidden items-center justify-between mt-3 pt-3 border-t border-border">
				<QuantityControl
					quantity={item.quantity}
					onDecrease={() => onUpdateQuantity(item.product_id, item.quantity - 1)}
					onIncrease={() => onUpdateQuantity(item.product_id, item.quantity + 1)}
				/>
				<p className="font-bold text-text text-base">{formatCurrency(item.product_price * item.quantity)}</p>
			</div>
		</div>
	);
}
