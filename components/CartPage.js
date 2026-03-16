"use client";

import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import OrderSummary from "@/components/OrderSummary";
import PageHeader from "@/components/ui/PageHeader";
import CartItem from "@/components/CartItem";
import StickyActionBar from "@/components/ui/StickyActionBar";
import { LuShieldCheck, LuTruck } from "react-icons/lu";

export default function CartPage() {
	const { cartItems, shippingFee, discount, subtotal, grandTotal, updateQuantity } = useCheckout();
	const router = useRouter();
	const totalItems = cartItems.reduce((s, i) => s + i.quantity, 0);

	return (
		<div>
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
						<OrderSummary itemCount={totalItems}>
							<div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-text-muted">
								<LuShieldCheck size={14} className="text-text-muted" />
								Secure Checkout
							</div>
						</OrderSummary>
					</div>
				</div>
			</div>

			<StickyActionBar
				nextLabel="Proceed to Checkout"
				nextIcon={LuTruck}
				onNext={() => router.push("/shipping")}
			/>
		</div>
	);
}
