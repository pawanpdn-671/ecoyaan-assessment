export default function Card({ children, className = "", sticky = false }) {
	return (
		<div
			className={`bg-surface rounded-2xl border border-border p-4 md:p-5 lg:p-6 shadow-sm ${
				sticky ? "lg:sticky lg:top-6" : ""
			} ${className}`}>
			{children}
		</div>
	);
}
