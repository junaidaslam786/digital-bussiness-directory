// ────────────────────────────────────────────────────────
// Role & Permission types – aligned with backend entities
// ────────────────────────────────────────────────────────

export interface Role {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  rolePermissions?: RolePermission[];
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  createdAt: string;
  updatedAt: string;
}

export interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  createdAt: string;
  role?: Role;
  permission?: Permission;
}

// ── DTOs ──

export interface CreateRoleData {
  name: string;
  description?: string;
}

export type UpdateRoleData = Partial<CreateRoleData>;

export interface CreatePermissionData {
  name: string;
  description?: string;
  resource: string;
  action: string;
}

export type UpdatePermissionData = Partial<CreatePermissionData>;

export interface AssignRolePermissionsData {
  permissionIds: string[];
  action?: "add" | "remove" | "set";
}
