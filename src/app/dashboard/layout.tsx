import { EnterpriseLayout } from "@/components/enterprise-dashboard/EnterpriseLayout";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <EnterpriseLayout>{children}</EnterpriseLayout>;
}
