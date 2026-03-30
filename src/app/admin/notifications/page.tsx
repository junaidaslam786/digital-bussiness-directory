"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAdminStore } from "@/store/admin.api";
import {
  Search,
  Loader2,
  Send,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sending, setSending] = useState(false);

  const {
    notificationLogs,
    notifLogsLoading,
    fetchNotificationLogs,
    broadcastNotification,
    retryFailedNotifications,
  } = useAdminStore();

  useEffect(() => {
    fetchNotificationLogs();
  }, [fetchNotificationLogs]);

  const filteredLogs = notificationLogs.filter(
    (log) =>
      (log.subject ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.user?.name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBroadcast = async () => {
    if (!subject.trim() || !content.trim()) return;
    setSending(true);
    try {
      const result = await broadcastNotification({ subject: subject.trim(), content: content.trim() });
      alert(`Sent: ${result.sent}, Failed: ${result.failed}`);
      setSubject("");
      setContent("");
      fetchNotificationLogs();
    } catch {} finally {
      setSending(false);
    }
  };

  const handleRetry = async () => {
    try {
      const result = await retryFailedNotifications();
      alert(`Retried: ${result.retriedCount} notifications`);
      fetchNotificationLogs();
    } catch {}
  };

  const sentCount = notificationLogs.filter((l) => l.status === "sent").length;
  const failedCount = notificationLogs.filter((l) => l.status === "failed").length;

  if (notifLogsLoading && notificationLogs.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "failed": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Broadcast notifications and view logs</p>
      </div>

      {/* Broadcast Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span>Broadcast Notification</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Input placeholder="Subject..." value={subject} onChange={(e) => setSubject(e.target.value)} />
            <textarea
              className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900"
              rows={3}
              placeholder="Notification content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleBroadcast} disabled={sending}>
              {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Send Broadcast
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Sent</div>
            <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{sentCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Failed</div>
            <div className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">{failedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Retry Failed</div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">Resend failed notifications</div>
            </div>
            <Button variant="outline" onClick={handleRetry} disabled={failedCount === 0}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search logs..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Recipient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Channel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                      {log.user?.name ?? log.recipientEmail ?? "N/A"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                      {log.subject ?? log.type}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {log.channel}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge className={statusColor(log.status)}>{log.status}</Badge>
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
