import { Inter } from "next/font/google";
import { CheckoutProvider } from "@/context/CheckoutContext";
import Header from "@/components/Header";
import Stepper from "@/components/Stepper";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	display: "swap",
	variable: "--font-sans",
});

export const metadata = {
	title: "Ecoyaan Checkout",
	description: "Eco-friendly shopping checkout — sustainable products for a greener planet.",
};

async function getCartData() {
	try {
		const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
		const res = await fetch(`${baseUrl}/api/cart`, { cache: "no-store" });
		if (!res.ok) {
			throw new Error("Failed to fetch cart data");
		}
		return res.json();
	} catch (error) {
		console.error("Error fetching cart data:", error);
		return { cartItems: [], shipping_fee: 0, discount_applied: 0 };
	}
}

export default async function RootLayout({ children }) {
	const cartData = await getCartData();

	return (
		<html lang="en" className={inter.variable} data-scroll-behavior="smooth">
			<body>
				<CheckoutProvider initialCartData={cartData}>
					<Header />

					{/* Stepper */}
					<div className="max-w-5xl mx-auto px-4 pt-4 sm:pt-6">
						<Stepper />
					</div>

					{/* Main Content */}
					<main className="max-w-5xl mx-auto px-4 pb-28">{children}</main>
				</CheckoutProvider>
			</body>
		</html>
	);
}
