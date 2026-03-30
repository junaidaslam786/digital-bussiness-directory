"use client";

import { EnterpriseLayout } from "@/components/enterprise-dashboard/EnterpriseLayout";
import { AuthGuard } from "@/components/providers/AuthGuard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <EnterpriseLayout>{children}</EnterpriseLayout>
        </AuthGuard>
    );
}
