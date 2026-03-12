"use client";

import { usePathname } from "next/navigation";
import { STEPPER_STEPS } from "@/constants/stepperSteps";

export default function Stepper() {
	const pathname = usePathname();
	const currentIndex = STEPPER_STEPS.findIndex((s) => s.path === pathname);

	return (
		<div className="stepper">
			{STEPPER_STEPS.map((step, i) => {
				const isCompleted = i < currentIndex;
				const isActive = i === currentIndex;

				return (
					<div key={step.path} className="stepper-step">
						<div className="flex flex-col items-center">
							<div className={`stepper-circle ${isCompleted ? "completed" : isActive ? "active" : "inactive"}`}>
								{isCompleted ? (
									<svg
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="3"
										strokeLinecap="round"
										strokeLinejoin="round">
										<polyline points="20 6 9 17 4 12" />
									</svg>
								) : (
									i + 1
								)}
							</div>
							<span
								className={`stepper-label ${
									isActive ? "text-primary font-semibold" : isCompleted ? "text-accent" : "text-text-muted"
								}`}>
								{step.label}
							</span>
						</div>
						{i < STEPPER_STEPS.length - 1 && (
							<div className={`stepper-line mx-1 mb-4 ${i < currentIndex ? "active" : "inactive"}`} />
						)}
					</div>
				);
			})}
		</div>
	);
}
