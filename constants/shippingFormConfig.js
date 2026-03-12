export const SHIPPING_VALIDATORS = {
	fullName: (v) => (v.trim().length >= 2 ? "" : "Full name is required"),
	email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address"),
	phone: (v) => (/^\d{10}$/.test(v.replace(/\s/g, "")) ? "" : "Enter a valid 10-digit phone number"),
	pinCode: (v) => (/^\d{6}$/.test(v.replace(/\s/g, "")) ? "" : "Enter a valid 6-digit PIN code"),
	city: (v) => (v.trim().length >= 2 ? "" : "City is required"),
	state: (v) => (v.trim().length >= 2 ? "" : "State is required"),
};

export const SHIPPING_FIELDS = [
	{ name: "fullName", label: "Full Name", type: "text", placeholder: "John Doe", half: false },
	{ name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", half: true },
	{ name: "phone", label: "Phone Number", type: "tel", placeholder: "9876543210", half: true },
	{ name: "pinCode", label: "PIN Code", type: "text", placeholder: "560001", half: true },
	{ name: "city", label: "City", type: "text", placeholder: "Bangalore", half: true },
	{ name: "state", label: "State", type: "text", placeholder: "Karnataka", half: false },
];

export const INITIAL_SHIPPING_FORM_STATE = {
	fullName: "",
	email: "",
	phone: "",
	pinCode: "",
	city: "",
	state: "",
};
