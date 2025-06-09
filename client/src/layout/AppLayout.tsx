import type { ReactNode } from "react";
import Sidebar from "@/components/shared/Sidebar";

interface LayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className="min-h-screen bg-gray-50">
			<Sidebar />
			<main className="ml-64 p-8">{children}</main>
		</div>
	);
};

export default Layout;
