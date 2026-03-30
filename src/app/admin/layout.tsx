"use client";

import { AdminLayout } from "@/components/admin/AdminLayout";
import { AuthGuard } from "@/components/providers/AuthGuard";

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard allowedRoles={["admin", "super_admin"]}>
            <AdminLayout>{children}</AdminLayout>
        </AuthGuard>
    );
}
