"use client";

import Spinner from "./Spinner";

export default function Button({
	children,
	onClick,
	type = "button",
	disabled = false,
	loading = false,
	variant = "primary",
	fullWidth = false,
	className = "",
	...rest
}) {
	const base =
		"font-semibold py-3 px-6 rounded-xl transition-all duration-300 cursor-pointer text-sm tracking-wide flex items-center justify-center gap-2";

	const variants = {
		primary: "bg-primary hover:bg-primary-dark text-white",
		secondary: "bg-surface border border-border text-text hover:bg-surface-alt",
	};

	const disabledStyles = disabled || loading
		? "opacity-60 cursor-not-allowed"
		: "";

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled || loading}
			className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${disabledStyles} ${className}`}
			{...rest}>
			{loading ? (
				<>
					<Spinner size={16} />
					Processing…
				</>
			) : (
				children
			)}
		</button>
	);
}
