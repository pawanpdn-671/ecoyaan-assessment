"use client";

import { useState } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { SHIPPING_VALIDATORS, SHIPPING_FIELDS, INITIAL_SHIPPING_FORM_STATE } from "@/constants/shippingFormConfig";
import OrderSummary from "@/components/OrderSummary";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";

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
			<PageHeader title="Shipping Address" subtitle="Where should we deliver your order?" />

			<div className="flex flex-col lg:flex-row gap-6">
				<form onSubmit={handleSubmit} className="flex-1">
					<Card>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{SHIPPING_FIELDS.map((field) => (
								<div key={field.name} className={field.half ? "" : "md:col-span-2"}>
									<FormField
										name={field.name}
										label={field.label}
										type={field.type}
										value={form[field.name]}
										placeholder={field.placeholder}
										error={errors[field.name]}
										touched={touched[field.name]}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
							))}
						</div>

						<Button type="submit" fullWidth className="mt-6">
							Continue to Payment →
						</Button>
					</Card>
				</form>

				{/* Mini Order Summary */}
				<div className="lg:w-72">
					<OrderSummary
						subtotal={subtotal}
						shippingFee={shippingFee}
						grandTotal={grandTotal}
						totalLabel="Total"
					/>
				</div>
			</div>
		</div>
	);
}
