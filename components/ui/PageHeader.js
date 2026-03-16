export default function PageHeader({ title, subtitle }) {
	return (
		<div className="mb-6 sm:mb-8 text-center sm:text-left relative">
			<h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-primary-dark mb-2">{title}</h1>
			{subtitle && <p className="text-text-secondary text-base sm:text-lg max-w-2xl">{subtitle}</p>}
			<div className="hidden sm:block absolute -left-4 top-2 bottom-2 w-1.5 bg-accent rounded-full opacity-70"></div>
		</div>
	);
}
