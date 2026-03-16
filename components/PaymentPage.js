"use client";

import { useState, useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/utils/formatCurrency";
import OrderSummary from "@/components/OrderSummary";
import PageHeader from "@/components/ui/PageHeader";
import AddressCard from "@/components/AddressCard";
import OrderItemsList from "@/components/OrderItemsList";
import StickyActionBar from "@/components/ui/StickyActionBar";
import { LuLock } from "react-icons/lu";

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
		<div>
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
							totalLabel="Total">
							<div className="mt-4 text-center">
								<p className="text-xs text-text-muted">🔒 Your payment info is secure and encrypted</p>
							</div>
						</OrderSummary>
					</div>
				</div>
			</div>

			<StickyActionBar
				backPath="/shipping"
				backLabel="Back"
				nextLabel={`Pay Securely — ${formatCurrency(grandTotal)}`}
				nextIcon={LuLock}
				onNext={handlePay}
				nextLoading={processing}
				nextDisabled={processing}
			/>
		</div>
	);
}
