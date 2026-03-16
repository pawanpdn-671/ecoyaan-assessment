"use client";

import Spinner from "./Spinner";

export default function Button({
	children,
	onClick,
	type = "button",
	disabled = false,
	loading = false,
	variant = "primary",
	size = "md",
	fullWidth = false,
	className = "",
	...rest
}) {
	const base =
		"font-semibold rounded-xl transition-all duration-300 cursor-pointer tracking-wide flex items-center justify-center gap-2";

	const sizes = {
		sm: "py-2.5 px-4 text-xs",
		md: "py-3 px-6 text-sm",
		lg: "py-4 px-8 text-base",
	};

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
			className={`${base} ${sizes[size] || sizes.md} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${disabledStyles} ${className}`}
			{...rest}>
			{loading ? (
				<>
					<Spinner size={size === "sm" ? 14 : 16} />
					Processing…
				</>
			) : (
				children
			)}
		</button>
	);
}
