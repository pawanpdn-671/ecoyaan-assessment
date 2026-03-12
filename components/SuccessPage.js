"use client";

import { useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
	const { cartItems, grandTotal, shippingAddress, orderPlaced, resetOrder } = useCheckout();
	const router = useRouter();
	const [orderNumber] = useState(() => `ECO-${Date.now().toString(36).toUpperCase()}`);

	if (!orderPlaced) {
		if (typeof window !== "undefined") {
			router.replace("/");
		}
		return null;
	}

	return (
		<div className="animate-scale-in max-w-lg mx-auto text-center">
			<div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
				<svg
					width="40"
					height="40"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-accent">
					<path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
					<polyline points="22 4 12 14.01 9 11.01" />
				</svg>
			</div>

			<h1 className="text-2xl md:text-3xl font-bold text-primary-dark mb-2">Order Successful! 🎉</h1>
			<p className="text-text-secondary text-sm mb-1">Thank you for your sustainable purchase!</p>
			<p className="text-text-muted text-xs mb-6">Order #{orderNumber}</p>

			<div className="bg-surface rounded-2xl border border-border p-5 shadow-sm text-left mb-4">
				<h3 className="font-bold text-sm text-text mb-3">Order Details</h3>
				<div className="space-y-2">
					{cartItems.map((item) => (
						<div key={item.product_id} className="flex justify-between text-sm text-text-secondary">
							<span>
								{item.product_name} × {item.quantity}
							</span>
							<span className="font-medium text-text">₹{item.product_price * item.quantity}</span>
						</div>
					))}
					<hr className="border-border" />
					<div className="flex justify-between font-bold text-primary-dark">
						<span>Total Paid</span>
						<span>₹{grandTotal}</span>
					</div>
				</div>
			</div>

			{shippingAddress && (
				<div className="bg-surface rounded-2xl border border-border p-5 shadow-sm text-left mb-6">
					<h3 className="font-bold text-sm text-text mb-2">Delivering To</h3>
					<div className="text-sm text-text-secondary space-y-0.5">
						<p className="font-medium text-text">{shippingAddress.fullName}</p>
						<p>
							{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
						</p>
						<p>{shippingAddress.phone}</p>
					</div>
				</div>
			)}

			<button
				onClick={() => {
					resetOrder();
					router.push("/");
				}}
				className="btn-pulse bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 cursor-pointer text-sm tracking-wide">
				Continue Shopping
			</button>
		</div>
	);
}
