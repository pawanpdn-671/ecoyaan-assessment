export default function PageHeader({ title, subtitle }) {
	return (
		<div className="mb-4 sm:mb-6">
			<h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-dark mb-1">{title}</h1>
			{subtitle && <p className="text-text-secondary text-xs sm:text-sm">{subtitle}</p>}
		</div>
	);
}
