"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import Card from "@/components/ui/Card";

export default function OrderSummary({
	subtotal,
	shippingFee,
	discount = 0,
	grandTotal,
	title = "Order Summary",
	totalLabel = "Grand Total",
	itemCount,
	children,
}) {
	return (
		<Card sticky>
			<h2 className="font-bold text-lg text-text mb-4">{title}</h2>
			<div className="space-y-3 text-sm">
				<div className="flex justify-between text-text-secondary">
					<span>
						Subtotal{itemCount !== undefined ? ` (${itemCount} items)` : ""}
					</span>
					<span className="font-medium text-text">{formatCurrency(subtotal)}</span>
				</div>
				<div className="flex justify-between text-text-secondary">
					<span>Shipping</span>
					<span className="font-medium text-text">{formatCurrency(shippingFee)}</span>
				</div>
				{discount > 0 && (
					<div className="flex justify-between text-accent">
						<span>Discount</span>
						<span className="font-medium">-{formatCurrency(discount)}</span>
					</div>
				)}
				<hr className="border-border my-2" />
				<div className="flex justify-between text-base font-bold text-primary-dark">
					<span>{totalLabel}</span>
					<span>{formatCurrency(grandTotal)}</span>
				</div>
			</div>
			{children}
		</Card>
	);
}
