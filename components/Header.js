export default function Header() {
	return (
		<header className="bg-surface/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
			<div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 rounded-lg bg-primary-light/10 flex items-center justify-center">🌿</div>
					<div className="flex flex-col">
						<span className="font-bold text-lg text-primary-dark tracking-tight">Ecoyaan</span>
						<span className="text-xs text-text-muted hidden sm:block">Sustainable made easy</span>
					</div>
				</div>
			</div>
		</header>
	);
}
