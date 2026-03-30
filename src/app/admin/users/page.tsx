"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAdminStore } from "@/store/admin.api";
import {
  Search,
  UserX,
  UserCheck,
  Trash2,
  KeyRound,
  Loader2,
  Shield,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    users,
    usersLoading,
    fetchUsers,
    deactivateUser,
    reinstateUser,
    deleteUser,
    resetUserPassword,
  } = useAdminStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeactivate = async (id: string) => {
    if (!confirm("Deactivate this user?")) return;
    try { await deactivateUser(id); } catch {}
  };

  const handleReinstate = async (id: string) => {
    try { await reinstateUser(id); } catch {}
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this user? This cannot be undone.")) return;
    try { await deleteUser(id); } catch {}
  };

  const handleResetPassword = async (id: string) => {
    const newPassword = prompt("Enter new password (min 8 chars):");
    if (!newPassword || newPassword.length < 8) return;
    try { await resetUserPassword(id, { newPassword }); alert("Password reset successfully."); } catch {}
  };

  if (usersLoading && users.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Users</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage platform users</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search users..." className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Users</div>
            <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{users.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Active</div>
            <div className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{users.filter((u) => u.isActive).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">Verified</div>
            <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">{users.filter((u) => u.isVerified).length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Joined</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
                        <Shield className="mr-1 h-3 w-3" />
                        {user.role?.name ?? "user"}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center gap-2">
                        {user.isActive ? (
                          <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">Active</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Inactive</Badge>
                        )}
                        {user.isVerified && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Verified</Badge>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleResetPassword(user.id)} title="Reset Password">
                          <KeyRound className="h-4 w-4" />
                        </Button>
                        {user.isActive ? (
                          <Button variant="ghost" size="sm" onClick={() => handleDeactivate(user.id)} title="Deactivate">
                            <UserX className="h-4 w-4 text-amber-600" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" onClick={() => handleReinstate(user.id)} title="Reinstate">
                            <UserCheck className="h-4 w-4 text-emerald-600" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)} title="Delete">
                          <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </Button>
                      </div>
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
