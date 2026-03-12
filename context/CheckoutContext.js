"use client";

import { createContext, useContext, useState, useCallback } from "react";

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children, initialCartData }) {
	const [cartItems, setCartItems] = useState(initialCartData?.cartItems || []);
	const [shippingFee] = useState(initialCartData?.shipping_fee || 0);
	const [discount] = useState(initialCartData?.discount_applied || 0);
	const [shippingAddress, setShippingAddress] = useState(null);
	const [orderPlaced, setOrderPlaced] = useState(false);

	const updateQuantity = useCallback((productId, newQuantity) => {
		if (newQuantity < 1) return;
		setCartItems((prev) =>
			prev.map((item) => (item.product_id === productId ? { ...item, quantity: newQuantity } : item)),
		);
	}, []);

	const subtotal = cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
	const grandTotal = subtotal + shippingFee - discount;

	const placeOrder = useCallback(() => {
		setOrderPlaced(true);
	}, []);

	const resetOrder = useCallback(() => {
		setOrderPlaced(false);
		setShippingAddress(null);
		if (initialCartData?.cartItems) {
			setCartItems(initialCartData.cartItems);
		}
	}, [initialCartData]);

	return (
		<CheckoutContext.Provider
			value={{
				cartItems,
				shippingFee,
				discount,
				subtotal,
				grandTotal,
				shippingAddress,
				setShippingAddress,
				updateQuantity,
				orderPlaced,
				placeOrder,
				resetOrder,
			}}>
			{children}
		</CheckoutContext.Provider>
	);
}

export function useCheckout() {
	const context = useContext(CheckoutContext);
	if (!context) {
		throw new Error("useCheckout must be used within a CheckoutProvider");
	}
	return context;
}
