export default function QuantityControl({ quantity, onIncrease, onDecrease }) {
	const btnClass =
		"w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-surface-alt border border-border flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 cursor-pointer text-base sm:text-lg font-medium";

	return (
		<div className="flex items-center gap-1.5 sm:gap-2">
			<button onClick={onDecrease} className={btnClass} aria-label="Decrease quantity">
				−
			</button>
			<span className="w-7 sm:w-8 text-center font-semibold text-sm sm:text-base text-text">{quantity}</span>
			<button onClick={onIncrease} className={btnClass} aria-label="Increase quantity">
				+
			</button>
		</div>
	);
}
