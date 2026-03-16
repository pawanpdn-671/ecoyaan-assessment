import { LuInfo } from "react-icons/lu";

export default function FormField({
	name,
	label,
	type = "text",
	value,
	placeholder,
	error,
	touched,
	onChange,
	onBlur,
}) {
	const hasError = error && touched;

	return (
		<div>
			<label htmlFor={name} className="block text-sm font-medium text-text mb-1.5">
				{label}
				<span className="text-error ml-0.5">*</span>
			</label>
			<input
				id={name}
				type={type}
				value={value}
				onChange={(e) => onChange(name, e.target.value)}
				onBlur={() => onBlur(name)}
				placeholder={placeholder}
				aria-describedby={hasError ? `${name}-error` : undefined}
				aria-invalid={!!hasError}
				className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all duration-200 outline-none ${
					hasError
						? "border-error bg-red-50 focus:ring-2 focus:ring-red-200"
						: "border-border bg-surface-alt focus:border-primary focus:ring-2 focus:ring-primary/20"
				}`}
			/>
			{hasError && (
				<p id={`${name}-error`} role="alert" className="text-error text-xs mt-1 flex items-center gap-1">
					<LuInfo size={12} aria-hidden="true" />
					{error}
				</p>
			)}
		</div>
	);
}
