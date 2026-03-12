"use client";

import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import OrderSummary from "@/components/OrderSummary";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import CartItem from "@/components/CartItem";

export default function CartPage() {
	const { cartItems, shippingFee, discount, subtotal, grandTotal, updateQuantity } = useCheckout();
	const router = useRouter();
	const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

	return (
		<div className="animate-fade-in-up">
			<PageHeader title="Your Cart" subtitle="Review your items before checkout" />

			<div className="flex flex-col lg:flex-row gap-6">
				{/* Items List */}
				<div className="flex-1 space-y-4">
					{cartItems.map((item, index) => (
						<CartItem
							key={item.product_id}
							item={item}
							onUpdateQuantity={updateQuantity}
							style={{ animationDelay: `${index * 100}ms` }}
						/>
					))}
				</div>

				{/* Order Summary Sidebar */}
				<div className="lg:w-80">
					<OrderSummary
						subtotal={subtotal}
						shippingFee={shippingFee}
						discount={discount}
						grandTotal={grandTotal}
						itemCount={totalItems}>
						<Button fullWidth onClick={() => router.push("/shipping")} className="mt-6">
							Proceed to Checkout →
						</Button>
						<div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-muted">
							<svg
								width="14"
								height="14"
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
							Secure Checkout
						</div>
					</OrderSummary>
				</div>
			</div>
		</div>
	);
}
