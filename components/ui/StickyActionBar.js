"use client";

import Button from "./Button";
import { useRouter } from "next/navigation";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function StickyActionBar({
	onBack,
	backPath,
	onNext,
	backLabel = "Back",
	nextLabel = "Next Step",
	nextIcon: NextIcon = LuChevronRight,
	nextDisabled = false,
	nextLoading = false,
	nextType = "button",
}) {
	const router = useRouter();

	const handleBack = () => {
		if (onBack) {
			onBack();
		} else if (backPath) {
			router.push(backPath);
		}
	};

	const showBack = !!(onBack || backPath);

	return (
		<div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-border shadow-[0_-8px_30px_rgba(0,0,0,0.08)] py-3 px-4 sm:px-6">
			<div className="max-w-5xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
				{showBack ? (
					<Button
						variant="secondary"
						onClick={handleBack}
						className="p-2.5 sm:px-4 sm:py-3 min-w-11 sm:min-w-32 flex justify-center items-center">
						<LuChevronLeft className="w-5 h-5 sm:w-4 sm:h-4 stroke-[2.5] sm:stroke-2 shrink-0" aria-hidden="true" />
						<span className="hidden sm:inline-block">{backLabel}</span>
					</Button>
				) : (
					<div />
				)}

				<Button
					onClick={nextType === "button" ? onNext : undefined}
					type={nextType}
					disabled={nextDisabled}
					loading={nextLoading}
					className="flex-1 sm:flex-none p-2.5 sm:px-6 sm:py-3 sm:min-w-40 ml-auto flex justify-center items-center">
					{!nextLoading && (
						<NextIcon className="w-5 h-5 stroke-[2.5] sm:stroke-2 shrink-0" aria-hidden="true" />
					)}
					<span className="truncate">{nextLabel}</span>
				</Button>
			</div>
		</div>
	);
}
