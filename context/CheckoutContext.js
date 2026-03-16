"use client";

import { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";

const CheckoutContext = createContext(null);

const ADDRESSES_STORAGE_KEY = "ecoyaan_saved_addresses";

function persistAddresses(addresses) {
	if (typeof window === "undefined") return;
	localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(addresses));
}

export function CheckoutProvider({ children, initialCartData }) {
	const [cartItems, setCartItems] = useState(initialCartData?.cartItems || []);
	const [shippingFee] = useState(initialCartData?.shipping_fee || 0);
	const [baseDiscount] = useState(initialCartData?.discount_applied || 0);
	const [appliedCoupon, setAppliedCoupon] = useState(null);
	const [couponError, setCouponError] = useState("");
	const [shippingAddress, setShippingAddress] = useState(null);
	const [orderPlaced, setOrderPlaced] = useState(false);
	const [savedAddresses, setSavedAddresses] = useState([]);

	// Load saved addresses from localStorage on mount
	useEffect(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem(ADDRESSES_STORAGE_KEY);
			const parsed = JSON.parse(stored);
			if (parsed && parsed.length > 0) {
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setSavedAddresses(parsed);
			}
		}
	}, []);

	const addAddress = useCallback((address) => {
		setSavedAddresses((prev) => {
			const next = [...prev, address];
			persistAddresses(next);
			return next;
		});
	}, []);

	const removeAddress = useCallback((id) => {
		setSavedAddresses((prev) => {
			const next = prev.filter((addr) => addr.id !== id);
			persistAddresses(next);
			return next;
		});
	}, []);

	const updateAddress = useCallback((id, newAddress) => {
		setSavedAddresses((prev) => {
			const next = prev.map((addr) => (addr.id === id ? { ...newAddress, id } : addr));
			persistAddresses(next);
			return next;
		});
	}, []);

	const selectAddress = useCallback((id) => {
		setSavedAddresses((prev) => {
			const addr = prev.find((a) => a.id === id);
			if (addr) {
				setShippingAddress(addr);
			}
			return prev;
		});
	}, []);

	const updateQuantity = useCallback((productId, newQuantity) => {
		if (newQuantity < 1) return;
		setCartItems((prev) =>
			prev.map((item) => (item.product_id === productId ? { ...item, quantity: newQuantity } : item)),
		);
	}, []);

	const subtotal = cartItems.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
	const discount = appliedCoupon ? subtotal * 0.15 : baseDiscount;
	const grandTotal = subtotal + shippingFee - discount;

	const applyCoupon = useCallback((code) => {
		const cleanCode = code.trim().toUpperCase();
		if (cleanCode === "SAVE15") {
			setAppliedCoupon(cleanCode);
			setCouponError("");
			return true;
		}
		setCouponError("Invalid coupon.");
		return false;
	}, []);

	const removeCoupon = useCallback(() => {
		setAppliedCoupon(null);
		setCouponError("");
	}, []);

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

	const value = useMemo(
		() => ({
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
			savedAddresses,
			addAddress,
			removeAddress,
			updateAddress,
			selectAddress,
			appliedCoupon,
			couponError,
			applyCoupon,
			removeCoupon,
		}),
		[
			cartItems,
			shippingFee,
			discount,
			subtotal,
			grandTotal,
			shippingAddress,
			orderPlaced,
			updateQuantity,
			placeOrder,
			resetOrder,
			savedAddresses,
			addAddress,
			removeAddress,
			updateAddress,
			selectAddress,
			appliedCoupon,
			couponError,
			applyCoupon,
			removeCoupon,
		],
	);

	return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
}

export function useCheckout() {
	const context = useContext(CheckoutContext);
	if (!context) {
		throw new Error("useCheckout must be used within a CheckoutProvider");
	}
	return context;
}
