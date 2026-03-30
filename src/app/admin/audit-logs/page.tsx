"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAdminStore } from "@/store/admin.api";
import {
  Search,
  Loader2,
  RefreshCw,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const { auditLogs, auditLogsLoading, fetchAuditLogs } = useAdminStore();

  useEffect(() => {
    fetchAuditLogs();
  }, [fetchAuditLogs]);

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.user?.name ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (auditLogsLoading && auditLogs.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Audit Logs</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">System activity and change history</p>
        </div>
        <Button variant="outline" onClick={() => fetchAuditLogs()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search logs..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Logs</div>
            <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{auditLogs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Unique Actions</div>
            <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
              {new Set(auditLogs.map((l) => l.action)).size}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Resources</div>
            <div className="mt-1 text-2xl font-bold text-purple-600 dark:text-purple-400">
              {new Set(auditLogs.map((l) => l.resource)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Resource</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {log.user?.name ?? "System"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {log.action}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {log.resource}{log.resourceId ? ` #${log.resourceId.slice(0, 8)}` : ""}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-400">
                      {log.ipAddress ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
