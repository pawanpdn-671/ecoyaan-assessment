"use client";

import { useState } from "react";
import Image from "next/image";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
	const { cartItems, shippingFee, discount, subtotal, grandTotal, shippingAddress, placeOrder } = useCheckout();
	const router = useRouter();
	const [processing, setProcessing] = useState(false);

	// Redirect if no address
	if (!shippingAddress) {
		if (typeof window !== "undefined") {
			router.replace("/shipping");
		}
		return null;
	}

	const handlePay = async () => {
		setProcessing(true);
		// Simulate payment processing
		await new Promise((r) => setTimeout(r, 2000));
		placeOrder();
		router.push("/success");
	};

	return (
		<div className="animate-fade-in-up">
			<h1 className="text-2xl md:text-3xl font-bold text-primary-dark mb-1">Review & Pay</h1>
			<p className="text-text-secondary text-sm mb-6">Confirm your order details and complete payment</p>

			<div className="flex flex-col lg:flex-row gap-6">
				{/* Order Details */}
				<div className="flex-1 space-y-4">
					{/* Shipping Address Card */}
					<div className="bg-surface rounded-2xl border border-border p-5 shadow-sm">
						<div className="flex items-center justify-between mb-3">
							<h2 className="font-bold text-sm text-text flex items-center gap-2">
								<svg
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-primary">
									<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
									<circle cx="12" cy="10" r="3" />
								</svg>
								Delivery Address
							</h2>
							<button
								onClick={() => router.push("/shipping")}
								className="text-xs text-primary hover:text-primary-dark font-medium cursor-pointer transition-colors">
								Edit
							</button>
						</div>
						<div className="text-sm text-text-secondary space-y-0.5">
							<p className="font-semibold text-text">{shippingAddress.fullName}</p>
							<p>{shippingAddress.email}</p>
							<p>{shippingAddress.phone}</p>
							<p>
								{shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
							</p>
						</div>
					</div>

					{/* Items */}
					<div className="bg-surface rounded-2xl border border-border p-5 shadow-sm">
						<h2 className="font-bold text-sm text-text mb-3 flex items-center gap-2">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="text-primary">
								<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
								<line x1="3" y1="6" x2="21" y2="6" />
								<path d="M16 10a4 4 0 01-8 0" />
							</svg>
							Order Items
						</h2>
						<div className="space-y-3">
							{cartItems.map((item) => (
								<div
									key={item.product_id}
									className="flex items-center gap-3 py-2 border-b border-border last:border-0">
									<div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-alt shrink-0 relative">
										<Image src={item.image} alt={item.product_name} fill className="object-cover" />
									</div>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-text truncate">{item.product_name}</p>
										<p className="text-xs text-text-muted">Qty: {item.quantity}</p>
									</div>
									<p className="font-semibold text-sm text-text">₹{item.product_price * item.quantity}</p>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Payment Sidebar */}
				<div className="lg:w-80">
					<div className="bg-surface rounded-2xl border border-border p-5 md:p-6 shadow-sm sticky top-6">
						<h2 className="font-bold text-lg text-text mb-4">Payment Summary</h2>
						<div className="space-y-3 text-sm">
							<div className="flex justify-between text-text-secondary">
								<span>Subtotal</span>
								<span className="font-medium text-text">₹{subtotal}</span>
							</div>
							<div className="flex justify-between text-text-secondary">
								<span>Shipping</span>
								<span className="font-medium text-text">₹{shippingFee}</span>
							</div>
							{discount > 0 && (
								<div className="flex justify-between text-accent">
									<span>Discount</span>
									<span className="font-medium">-₹{discount}</span>
								</div>
							)}
							<hr className="border-border my-2" />
							<div className="flex justify-between text-base font-bold text-primary-dark">
								<span>Total</span>
								<span>₹{grandTotal}</span>
							</div>
						</div>

						<button
							onClick={handlePay}
							disabled={processing}
							className={`btn-pulse w-full mt-6 font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer text-sm tracking-wide flex items-center justify-center gap-2 ${
								processing
									? "bg-primary/60 text-white/80 cursor-not-allowed"
									: "bg-primary hover:bg-primary-dark text-white"
							}`}>
							{processing ? (
								<>
									<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
										<circle
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="3"
											className="opacity-25"
										/>
										<path
											d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
											fill="currentColor"
											className="opacity-75"
										/>
									</svg>
									Processing…
								</>
							) : (
								<>
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round">
										<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
										<path d="M7 11V7a5 5 0 0110 0v4" />
									</svg>
									Pay Securely — ₹{grandTotal}
								</>
							)}
						</button>

						<div className="mt-4 text-center">
							<p className="text-xs text-text-muted">🔒 Your payment info is secure and encrypted</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
