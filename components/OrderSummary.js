"use client";

import { useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import Card from "@/components/ui/Card";
import { useCheckout } from "@/context/CheckoutContext";
import { LuTag, LuX, LuCheckCheck } from "react-icons/lu";

export default function OrderSummary({ title = "Order Summary", totalLabel = "Grand Total", itemCount, children }) {
	const { subtotal, shippingFee, discount, grandTotal, appliedCoupon, couponError, applyCoupon, removeCoupon } =
		useCheckout();

	const [couponInput, setCouponInput] = useState("");

	const handleApplyCoupon = (e) => {
		e.preventDefault();
		if (couponInput.trim()) {
			applyCoupon(couponInput);
		}
	};

	return (
		<Card sticky>
			<h2 className="font-bold text-xl text-text mb-5">{title}</h2>

			<div className="space-y-4 text-sm">
				<div className="flex justify-between text-text-secondary items-center">
					<span>Subtotal{itemCount !== undefined ? ` (${itemCount} items)` : ""}</span>
					<span className="font-medium text-text">{formatCurrency(subtotal)}</span>
				</div>

				<div className="flex justify-between text-text-secondary items-center">
					<span>Shipping</span>
					<span className="font-medium text-text">
						{shippingFee === 0 ? (
							<span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-md">Free</span>
						) : (
							formatCurrency(shippingFee)
						)}
					</span>
				</div>

				{discount > 0 && (
					<div className="flex justify-between text-accent items-center">
						<span className="flex items-center gap-1.5">
							<LuTag size={14} />
							Discount {appliedCoupon && `(${appliedCoupon})`}
						</span>
						<span className="font-semibold">-{formatCurrency(discount)}</span>
					</div>
				)}

				<hr className="border-border my-4 border-dashed" />

				<div className="flex justify-between items-center text-lg font-bold text-text">
					<span>{totalLabel}</span>
					<span className="text-primary-dark">{formatCurrency(grandTotal)}</span>
				</div>
			</div>

			<div className="mt-6">
				{!appliedCoupon ? (
					<form onSubmit={handleApplyCoupon} className="space-y-2">
						<div>
							<label
								htmlFor="coupon"
								className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">
								Promo Code
							</label>
							<p className="text-[12px] text-text-muted mt-1">
								Use <span className="font-semibold text-primary">SAVE15</span> for a 15% discount
							</p>
						</div>
						<div className="flex gap-2">
							<div className="relative flex-1">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<LuTag className="text-text-muted" size={16} />
								</div>
								<input
									type="text"
									id="coupon"
									value={couponInput}
									onChange={(e) => setCouponInput(e.target.value)}
									className="block w-full pl-9 pr-3 py-2.5 bg-background border border-border rounded-xl text-xs focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 outline-none placeholder:text-text-muted"
									placeholder="Enter your promo code"
								/>
							</div>
							<button
								type="submit"
								disabled={!couponInput.trim()}
								className="px-4 py-2.5 bg-text hover:bg-black text-white text-sm font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
								Apply
							</button>
						</div>
						{couponError && <p className="text-xs text-red-500 font-medium animate-fade-in-up">{couponError}</p>}
					</form>
				) : (
					<div className="bg-green-50/50 rounded-xl p-3 border border-green-200 flex items-center justify-between animate-fade-in-up">
						<div className="flex items-center gap-3">
							<div className="bg-green-100 p-1.5 rounded-full text-green-600">
								<LuCheckCheck size={16} />
							</div>
							<div>
								<p className="text-sm font-semibold text-green-800">&apos;{appliedCoupon}&apos; applied</p>
								<p className="text-xs text-green-600 font-medium">15% discount active</p>
							</div>
						</div>
						<button
							onClick={() => {
								removeCoupon();
								setCouponInput("");
							}}
							className="p-1.5 hover:bg-green-100 rounded-lg text-green-600 transition-colors"
							aria-label="Remove promo code">
							<LuX size={16} />
						</button>
					</div>
				)}
			</div>

			{children && <div className="mt-5">{children}</div>}
		</Card>
	);
}
