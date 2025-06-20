import { useAuth } from "@/store/auth";
import { ModeToggle } from "@/components/mode-toggle";

const TopBar = () => {
	const { user } = useAuth();
	return (
		<div className="w-full flex p-8  bg-gradient-to-r dark:from-gray-900 dark:to-gray-800 from-amber-900 to-amber-600 justify-between items-center text-white h-16 shadow-xl">
			<div className="flex gap-2 justify-between items-center">
				<h1 className="text-2xl font-bold flex items-center gap-2">
					{user?.restorantName}
				</h1>
			</div>
			<ModeToggle />
		</div>
	);
};

export default TopBar;
