import type { ReactNode } from "react";
import Sidebar from "@/components/shared/Sidebar";
import TopBar from "@/components/shared/TopBar";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-black">
			<Sidebar />
			<main className="ml-64">
				<TopBar />
				<div className="p-8">{children}</div>
			</main>
		</div>
	);
};

export default Layout;
