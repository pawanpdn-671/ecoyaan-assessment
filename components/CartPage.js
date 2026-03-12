"use client";

import Image from "next/image";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";

export default function CartPage() {
	const { cartItems, shippingFee, discount, subtotal, grandTotal, updateQuantity } = useCheckout();
	const router = useRouter();

	return (
		<div className="animate-fade-in-up">
			<h1 className="text-2xl md:text-3xl font-bold text-primary-dark mb-1">Your Cart</h1>
			<p className="text-text-secondary text-sm mb-6">Review your items before checkout</p>

			<div className="flex flex-col lg:flex-row gap-6">
				{/* Items List */}
				<div className="flex-1 space-y-4">
					{cartItems.map((item, index) => (
						<div
							key={item.product_id}
							className="bg-surface rounded-2xl border border-border p-4 md:p-5 flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow duration-300"
							style={{ animationDelay: `${index * 100}ms` }}>
							<div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-surface-alt flex-shrink-0 relative">
								<Image src={item.image} alt={item.product_name} fill className="object-cover" />
							</div>
							<div className="flex-1 min-w-0">
								<h3 className="font-semibold text-text text-sm md:text-base truncate">{item.product_name}</h3>
								<p className="text-primary font-bold text-lg mt-1">₹{item.product_price}</p>
							</div>
							<div className="flex items-center gap-2">
								<button
									onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
									className="w-8 h-8 rounded-lg bg-surface-alt border border-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 cursor-pointer text-lg font-medium"
									aria-label="Decrease quantity">
									−
								</button>
								<span className="w-8 text-center font-semibold text-text">{item.quantity}</span>
								<button
									onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
									className="w-8 h-8 rounded-lg bg-surface-alt border border-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 cursor-pointer text-lg font-medium"
									aria-label="Increase quantity">
									+
								</button>
							</div>
							<div className="text-right min-w-[70px]">
								<p className="font-bold text-text text-base md:text-lg">
									₹{item.product_price * item.quantity}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Order Summary Sidebar */}
				<div className="lg:w-80">
					<div className="bg-surface rounded-2xl border border-border p-5 md:p-6 shadow-sm sticky top-6">
						<h2 className="font-bold text-lg text-text mb-4">Order Summary</h2>
						<div className="space-y-3 text-sm">
							<div className="flex justify-between text-text-secondary">
								<span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
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
								<span>Grand Total</span>
								<span>₹{grandTotal}</span>
							</div>
						</div>
						<button
							onClick={() => router.push("/shipping")}
							className="btn-pulse w-full mt-6 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer text-sm tracking-wide">
							Proceed to Checkout →
						</button>
						<div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-muted">
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
								<path d="M7 11V7a5 5 0 0110 0v4" />
							</svg>
							Secure Checkout
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
