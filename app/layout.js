import { CheckoutProvider } from "@/context/CheckoutContext";
import Stepper from "@/components/Stepper";
import "./globals.css";

export const metadata = {
	title: "Ecoyaan Checkout",
	description: "Eco-friendly shopping checkout — sustainable products for a greener planet.",
};

async function getCartData() {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
	const res = await fetch(`${baseUrl}/api/cart`, { cache: "no-store" });
	if (!res.ok) {
		throw new Error("Failed to fetch cart data");
	}
	return res.json();
}

export default async function RootLayout({ children }) {
	const cartData = await getCartData();

	return (
		<html lang="en">
			<head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<CheckoutProvider initialCartData={cartData}>
					{/* Header */}
					<header className="bg-surface/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
						<div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
							<div className="flex items-center gap-2">
								<div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="white"
										strokeWidth="2.5"
										strokeLinecap="round"
										strokeLinejoin="round">
										<path d="M12 2L2 7l10 5 10-5-10-5z" />
										<path d="M2 17l10 5 10-5" />
										<path d="M2 12l10 5 10-5" />
									</svg>
								</div>
								<span className="font-bold text-lg text-primary-dark tracking-tight">Ecoyaan</span>
							</div>
							<div className="text-xs text-text-muted hidden sm:block">🌿 Sustainable Shopping</div>
						</div>
					</header>

					{/* Stepper */}
					<div className="max-w-5xl mx-auto px-4 pt-6">
						<Stepper />
					</div>

					{/* Main Content */}
					<main className="max-w-5xl mx-auto px-4 pb-12">{children}</main>
				</CheckoutProvider>
			</body>
		</html>
	);
}
