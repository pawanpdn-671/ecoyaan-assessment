import { LuLoader } from "react-icons/lu";

export default function Spinner({ size = 16 }) {
	return <LuLoader size={size} className="animate-spin" aria-hidden="true" />;
}
