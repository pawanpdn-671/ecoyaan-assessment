"use client";

import { useState, useRef, useEffect } from "react";
import { useCheckout } from "@/context/CheckoutContext";
import { useRouter } from "next/navigation";
import { SHIPPING_VALIDATORS, SHIPPING_FIELDS, INITIAL_SHIPPING_FORM_STATE } from "@/constants/shippingFormConfig";
import OrderSummary from "@/components/OrderSummary";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import FormField from "@/components/ui/FormField";
import StickyActionBar from "@/components/ui/StickyActionBar";
import AddressCard from "@/components/AddressCard";
import Button from "@/components/ui/Button";
import { LuMapPin, LuSave, LuPlus, LuCreditCard } from "react-icons/lu";

const SavedAddressesList = ({ addresses, selectedId, onSelect, onEdit, onDelete }) => (
	<div className="mb-5">
		<h3 className="text-sm font-semibold text-text mb-3 flex items-center gap-2">
			<LuMapPin size={16} aria-hidden="true" />
			Saved Addresses
		</h3>
		<div className="space-y-3">
			{addresses.map((addr) => (
				<AddressCard
					key={addr.id}
					address={addr}
					selected={selectedId === addr.id}
					onSelect={() => onSelect(addr.id)}
					onEdit={() => onEdit(addr.id)}
					onDelete={() => onDelete(addr.id)}
				/>
			))}
		</div>
	</div>
);

const AddressForm = ({
	formRef,
	form,
	errors,
	touched,
	isEditing,
	showCancel,
	onChange,
	onBlur,
	onSubmit,
	onCancel,
}) => (
	<form ref={formRef} onSubmit={onSubmit} className="mb-5">
		<Card>
			{showCancel && (
				<h3 className="text-sm font-semibold text-text mb-4">{isEditing ? "Edit Address" : "New Address"}</h3>
			)}
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
							onChange={onChange}
							onBlur={onBlur}
						/>
					</div>
				))}
			</div>
			<div className="mt-6 flex justify-end gap-3">
				{showCancel && (
					<Button variant="secondary" size="sm" onClick={onCancel}>
						Cancel
					</Button>
				)}
				<Button type="submit" size="sm">
					<LuSave size={14} aria-hidden="true" />
					{isEditing ? "Update Address" : "Save Address"}
				</Button>
			</div>
		</Card>
	</form>
);

const AddNewButton = ({ onClick }) => (
	<div className="mb-5 flex justify-center mt-3">
		<button
			onClick={onClick}
			className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium text-text-secondary transition-all duration-200 cursor-pointer hover:border-primary hover:text-primary hover:bg-primary/5 shadow-sm">
			<span className="flex items-center justify-center gap-2">
				<LuPlus size={16} aria-hidden="true" strokeWidth={2.5} />
				Add New Address
			</span>
		</button>
	</div>
);

export default function ShippingForm() {
	const {
		setShippingAddress,
		subtotal,
		shippingFee,
		grandTotal,
		savedAddresses,
		addAddress,
		removeAddress,
		updateAddress,
		selectAddress,
	} = useCheckout();
	const router = useRouter();
	const formRef = useRef(null);

	const [form, setForm] = useState(INITIAL_SHIPPING_FORM_STATE);
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const [showForm, setShowForm] = useState(savedAddresses.length === 0);
	const [selectedId, setSelectedId] = useState(null);
	const [editingId, setEditingId] = useState(null);
	const autoSelectedRef = useRef(false);

	// Auto-select the first address when loaded from localStorage
	useEffect(() => {
		if (savedAddresses.length > 0 && !autoSelectedRef.current) {
			// eslint-disable-next-line
			setSelectedId(savedAddresses[0].id);
			setShowForm(false);
			autoSelectedRef.current = true;
		}
	}, [savedAddresses]);

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

	const validateForm = () => {
		const newErrors = {};
		let hasError = false;
		for (const key of Object.keys(SHIPPING_VALIDATORS)) {
			const err = SHIPPING_VALIDATORS[key](form[key]);
			if (err) hasError = true;
			newErrors[key] = err;
		}
		setErrors(newErrors);
		setTouched(Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
		return !hasError;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// If an existing address is selected, use it
		if (selectedId !== null && !showForm) {
			selectAddress(selectedId);
			router.push("/payment");
			return;
		}

		if (!validateForm()) return;

		if (editingId !== null) {
			updateAddress(editingId, form);
			setShippingAddress(form);
			setSelectedId(editingId);
			setEditingId(null);
		} else {
			const newId = crypto.randomUUID();
			const newAddress = { ...form, id: newId };
			addAddress(newAddress);
			setShippingAddress(newAddress);
			setSelectedId(newId);
		}

		setForm(INITIAL_SHIPPING_FORM_STATE);
		setTouched({});
		setErrors({});
		setShowForm(false);
	};

	const handleSelectSaved = (id) => {
		setSelectedId(id);
		setShowForm(false);
		setEditingId(null);
	};

	const handleAddNew = () => {
		setForm(INITIAL_SHIPPING_FORM_STATE);
		setEditingId(null);
		setShowForm(true);
	};

	const handleCancelEdit = () => {
		setShowForm(false);
		setEditingId(null);
		setForm(INITIAL_SHIPPING_FORM_STATE);
	};

	const handleEdit = (id) => {
		const addressToEdit = savedAddresses.find((addr) => addr.id === id);
		if (addressToEdit) {
			setForm(addressToEdit);
			setEditingId(id);
			setShowForm(true);

			setTimeout(() => {
				if (formRef.current) {
					formRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
				}
			}, 100);
		}
	};

	const handleDelete = (id) => {
		removeAddress(id);
		if (editingId === id) handleCancelEdit();
		if (selectedId === id) {
			setSelectedId(null);
			if (savedAddresses.length <= 1) setShowForm(true);
		}
	};

	const handleNext = () => {
		if (selectedId !== null) {
			selectAddress(selectedId);
			router.push("/payment");
		}
	};

	const isNextDisabled = selectedId === null && !showForm;
	const hasSavedAddresses = savedAddresses.length > 0;

	return (
		<div>
			<div className="animate-fade-in-up">
				<PageHeader title="Shipping Address" subtitle="Where should we deliver your order?" />

				<div className="flex flex-col lg:flex-row gap-6">
					<div className="flex-1">
						{hasSavedAddresses && (
							<SavedAddressesList
								addresses={savedAddresses}
								selectedId={selectedId}
								onSelect={handleSelectSaved}
								onEdit={handleEdit}
								onDelete={handleDelete}
							/>
						)}

						{showForm && (
							<AddressForm
								formRef={formRef}
								form={form}
								errors={errors}
								touched={touched}
								isEditing={editingId !== null}
								showCancel={hasSavedAddresses}
								onChange={handleChange}
								onBlur={handleBlur}
								onSubmit={handleSubmit}
								onCancel={handleCancelEdit}
							/>
						)}

						{hasSavedAddresses && !showForm && <AddNewButton onClick={handleAddNew} />}
					</div>

					<div className="lg:w-72">
						<OrderSummary totalLabel="Total" />
					</div>
				</div>
			</div>

			<StickyActionBar
				backPath="/"
				backLabel="Back"
				nextLabel="Continue to Payment"
				nextIcon={LuCreditCard}
				onNext={handleNext}
				nextDisabled={isNextDisabled}
			/>
		</div>
	);
}
