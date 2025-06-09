import type { ReactNode } from "react";
import CustomerSidebar from "@/components/shared/CustomerSidebar";

interface CustomerLayoutProps {
	children: ReactNode;
}

const CustomerLayout = ({ children }: CustomerLayoutProps) => {
	return (
		<div className="min-h-screen bg-gray-50">
			<CustomerSidebar />
			<main className="ml-64 p-8">{children}</main>
		</div>
	);
};

export default CustomerLayout;
