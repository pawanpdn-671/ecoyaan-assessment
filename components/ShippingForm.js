"use client";

import { useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { SHIPPING_VALIDATORS, SHIPPING_FIELDS, INITIAL_SHIPPING_FORM_STATE } from "@/constants/shippingFormConfig";

export default function ShippingForm() {
	const { setShippingAddress, subtotal, shippingFee, grandTotal } = useCheckout();
	const router = useRouter();

	const [form, setForm] = useState(INITIAL_SHIPPING_FORM_STATE);
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	const handleChange = (name, value) => {
		setForm((prev) => ({ ...prev, [name]: value }));
		if (touched[name]) {
			setErrors((prev) => ({ ...prev, [name]: SHIPPING_VALIDATORS[name](value) }));
		}
	};

	const handleBlur = (name) => {
		setTouched((prev) => ({ ...prev, [name]: true }));
		setErrors((prev) => ({ ...prev, [name]: SHIPPING_VALIDATORS[name](form[name]) }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = {};
		let hasError = false;
		for (const key of Object.keys(SHIPPING_VALIDATORS)) {
			const err = SHIPPING_VALIDATORS[key](form[key]);
			if (err) hasError = true;
			newErrors[key] = err;
		}
		setErrors(newErrors);
		setTouched(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
		if (!hasError) {
			setShippingAddress(form);
			router.push("/payment");
		}
	};

	return (
		<div className="animate-fade-in-up">
			<h1 className="text-2xl md:text-3xl font-bold text-primary-dark mb-1">Shipping Address</h1>
			<p className="text-text-secondary text-sm mb-6">Where should we deliver your order?</p>

			<div className="flex flex-col lg:flex-row gap-6">
				<form onSubmit={handleSubmit} className="flex-1">
					<div className="bg-surface rounded-2xl border border-border p-5 md:p-6 shadow-sm">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{SHIPPING_FIELDS.map((field) => (
								<div key={field.name} className={field.half ? "" : "md:col-span-2"}>
									<label htmlFor={field.name} className="block text-sm font-medium text-text mb-1.5">
										{field.label}
										<span className="text-error ml-0.5">*</span>
									</label>
									<input
										id={field.name}
										type={field.type}
										value={form[field.name]}
										onChange={(e) => handleChange(field.name, e.target.value)}
										onBlur={() => handleBlur(field.name)}
										placeholder={field.placeholder}
										className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-200 outline-none ${
											errors[field.name] && touched[field.name]
												? "border-error bg-red-50 focus:ring-2 focus:ring-red-200"
												: "border-border bg-surface-alt focus:border-primary focus:ring-2 focus:ring-primary/20"
										}`}
									/>
									{errors[field.name] && touched[field.name] && (
										<p className="text-error text-xs mt-1 flex items-center gap-1">
											<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
												<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
											</svg>
											{errors[field.name]}
										</p>
									)}
								</div>
							))}
						</div>

						<button
							type="submit"
							className="btn-pulse w-full mt-6 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer text-sm tracking-wide">
							Continue to Payment →
						</button>
					</div>
				</form>

				{/* Mini Order Summary */}
				<div className="lg:w-72">
					<div className="bg-surface rounded-2xl border border-border p-5 shadow-sm sticky top-6">
						<h3 className="font-bold text-sm text-text mb-3">Order Summary</h3>
						<div className="space-y-2 text-sm text-text-secondary">
							<div className="flex justify-between">
								<span>Subtotal</span>
								<span className="font-medium text-text">₹{subtotal}</span>
							</div>
							<div className="flex justify-between">
								<span>Shipping</span>
								<span className="font-medium text-text">₹{shippingFee}</span>
							</div>
							<hr className="border-border" />
							<div className="flex justify-between font-bold text-primary-dark">
								<span>Total</span>
								<span>₹{grandTotal}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
