"use client";

import { usePathname } from "next/navigation";
import { STEPPER_STEPS } from "@/constants/stepperSteps";
import { LuCheck } from "react-icons/lu";

export default function Stepper() {
	const pathname = usePathname();
	const currentIndex = STEPPER_STEPS.findIndex((s) => s.path === pathname);

	return (
		<div className="flex items-center justify-center gap-0 mb-5 sm:mb-8">
			{STEPPER_STEPS.map((step, i) => {
				const isCompleted = i < currentIndex;
				const isActive = i === currentIndex;

				return (
					<div key={step.path} className="flex items-center gap-0">
						<div className="flex flex-col items-center">
							<div
								className={`
									w-7 h-7 min-[481px]:w-8 min-[481px]:h-8 sm:w-9 sm:h-9
									rounded-full flex items-center justify-center text-[0.75rem] sm:text-[0.85rem] font-semibold transition-all duration-300 ease-in-out shrink-0
									${isCompleted ? "bg-accent text-white" : isActive ? "bg-primary text-white shadow-[0_0_0_4px_rgba(45,106,79,0.2)]" : "bg-border text-text-muted"}
								`}>
								{isCompleted ? (
									<LuCheck size={16} strokeWidth={3} aria-hidden="true" />
								) : (
									i + 1
								)}
							</div>
							<span
								className={`text-[0.6rem] sm:text-[0.7rem] mt-1.5 sm:mt-[0.35rem] font-medium text-center whitespace-nowrap ${
									isActive ? "text-primary font-semibold" : isCompleted ? "text-accent" : "text-text-muted"
								}`}>
								{step.label}
							</span>
						</div>
						{i < STEPPER_STEPS.length - 1 && (
							<div
								className={`
									h-0.75 transition-colors duration-300 ease-in-out mx-1 mb-4 
									w-5 min-[481px]:w-9 sm:w-15
									${i < currentIndex ? "bg-accent" : "bg-border"}
								`}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}
