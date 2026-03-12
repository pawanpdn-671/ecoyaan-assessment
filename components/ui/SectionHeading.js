export default function SectionHeading({ icon, children, action }) {
	return (
		<div className="flex items-center justify-between mb-3">
			<h2 className="font-bold text-sm text-text flex items-center gap-2">
				{icon && <span className="text-primary" aria-hidden="true">{icon}</span>}
				{children}
			</h2>
			{action}
		</div>
	);
}
