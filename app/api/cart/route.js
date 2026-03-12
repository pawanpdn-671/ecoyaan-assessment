import { NextResponse } from "next/server";
import { cartData } from "@/constants/cartData";

export async function GET() {
	// Simulate a small network delay
	await new Promise((resolve) => setTimeout(resolve, 200));
	return NextResponse.json(cartData);
}
