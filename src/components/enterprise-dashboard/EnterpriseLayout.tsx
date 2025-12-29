"use client";

import { EnterpriseSidebar } from "@/components/enterprise-dashboard/EnterpriseSidebar";
import { EnterpriseTopBar } from "@/components/enterprise-dashboard/EnterpriseTopBar";

export function EnterpriseLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
            <EnterpriseSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
                <EnterpriseTopBar />
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}
