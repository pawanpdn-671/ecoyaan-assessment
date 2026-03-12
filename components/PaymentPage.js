"use client";

import { useState, useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatCurrency";
import OrderSummary from "@/components/OrderSummary";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import AddressCard from "@/components/AddressCard";
import OrderItemsList from "@/components/OrderItemsList";

export default function PaymentPage() {
	const { cartItems, shippingFee, discount, subtotal, grandTotal, shippingAddress, placeOrder } = useCheckout();
	const router = useRouter();
	const [processing, setProcessing] = useState(false);

	useEffect(() => {
		if (!shippingAddress) {
			router.replace("/shipping");
		}
	}, [shippingAddress, router]);

	if (!shippingAddress) return null;

	const handlePay = async () => {
		setProcessing(true);
		try {
			await new Promise((r) => setTimeout(r, 2000));
			placeOrder();
			router.push("/success");
		} catch {
			setProcessing(false);
		}
	};

	return (
		<div className="animate-fade-in-up">
			<PageHeader title="Review & Pay" subtitle="Confirm your order details and complete payment" />

			<div className="flex flex-col lg:flex-row gap-6">
				{/* Order Details */}
				<div className="flex-1 space-y-4">
					<AddressCard address={shippingAddress} editable />
					<OrderItemsList items={cartItems} />
				</div>

				{/* Payment Sidebar */}
				<div className="lg:w-80">
					<OrderSummary
						title="Payment Summary"
						subtotal={subtotal}
						shippingFee={shippingFee}
						discount={discount}
						grandTotal={grandTotal}
						totalLabel="Total">
						<Button
							fullWidth
							onClick={handlePay}
							disabled={processing}
							loading={processing}
							className="mt-6">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true">
								<rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
								<path d="M7 11V7a5 5 0 0110 0v4" />
							</svg>
							Pay Securely — {formatCurrency(grandTotal)}
						</Button>

						<div className="mt-4 text-center">
							<p className="text-xs text-text-muted">🔒 Your payment info is secure and encrypted</p>
						</div>
					</OrderSummary>
				</div>
			</div>
		</div>
	);
}
