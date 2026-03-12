"use client";

import { useState, useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatCurrency";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import AddressCard from "@/components/AddressCard";

export default function SuccessPage() {
	const { cartItems, grandTotal, shippingAddress, orderPlaced, resetOrder } = useCheckout();
	const router = useRouter();
	const [orderNumber] = useState(() => `ECO-${Date.now().toString(36).toUpperCase()}`);

	useEffect(() => {
		if (!orderPlaced) {
			router.replace("/");
		}
	}, [orderPlaced, router]);

	if (!orderPlaced) return null;

	return (
		<div className="animate-scale-in max-w-lg mx-auto">
			<div className="w-20 h-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
				<svg
					width="40"
					height="40"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-accent"
					aria-hidden="true">
					<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
					<polyline points="22 4 12 14.01 9 11.01" />
				</svg>
			</div>

			<div className="text-center">
				<h1 className="text-2xl md:text-3xl font-bold text-primary-dark mb-2">Order Successful! 🎉</h1>
				<p className="text-text-secondary text-sm mb-1">Thank you for your sustainable purchase!</p>
				<p className="text-text-muted text-xs mb-6">Order #{orderNumber}</p>
			</div>

			<Card className="text-left mb-4">
				<h3 className="font-bold text-sm text-text mb-3">Order Details</h3>
				<div className="space-y-2">
					{cartItems.map((item) => (
						<div key={item.product_id} className="flex justify-between text-sm text-text-secondary">
							<span>
								{item.product_name} × {item.quantity}
							</span>
							<span className="font-medium text-text">{formatCurrency(item.product_price * item.quantity)}</span>
						</div>
					))}
					<hr className="border-border" />
					<div className="flex justify-between font-bold text-primary-dark">
						<span>Total Paid</span>
						<span>{formatCurrency(grandTotal)}</span>
					</div>
				</div>
			</Card>

			{shippingAddress && (
				<div className="mb-6">
					<AddressCard address={shippingAddress} />
				</div>
			)}

			<div className="flex justify-center">
				<Button
					onClick={() => {
						resetOrder();
						router.push("/");
					}}>
					Continue Shopping
				</Button>
			</div>
		</div>
	);
}
