module.exports = {
    ACCEPT_LANGUAGES: ["en", "fr", "de", "nl", "lb"],
    DEFAULT_ROLES: {
        SUPER_ADMIN: "superAdmin",
        ADMIN: "admin",
        PARTNER: "partner",
        CUSTOMER: "customer",
        SUBSIDIARY: "subsidiary",
        TECHNICIAN: "technician"
    },
    USER_TYPES: {
        ADMIN: "admin",
        PARTNER: "partner",
        CUSTOMER: "customer",
        SUBSIDIARY: "subsidiary",
        TECHNICIAN: "technician"
    },
    GENDER_TYPES: {
        MALE: "male",
        FEMALE: "female",
        OTHER: "other"
    },
    EMAIL_TEMPLATES_SUBJECTS: {
        INVITATION_EMAIL: "Account Invitations",
        RESET_PASSWORD: "Password Reset",
        RESET_PASSWORD_CONFIRMATION: "Password Reset Confirmation"
    },
    USERS_SORTING: {
        created_at_asc: { createdAt: 1 },
        created_at_desc: { createdAt: -1 },
        name_asc: { fullName: 1 },
        name_desc: { fullName: -1 }
    },
    LOGGED_SORTING: {
        created_at_asc: { createdAt: 1 },
        created_at_desc: { createdAt: -1 }
    },
    RELATIONSHIP_TYPES: {
        ASSIGN: "assign",
        NOT_ASSIGN: "unassign"
    },
    LOGGED_ACTIONS: {
        CREATE: "Create",
        UPDATE: "Update",
        DELETE: "Delete",
        VIEW: "View",
        VIEWS: "Views",
        EMAIL_VERIFY: "Email Verify",
        FORGOT_PASSWORD: "Forgot Password",
        RESET_PASSWORD: "Reset Password",
        LOGIN: "Login",
        LOGOUT: "Logout",
        CHANGE_PASSWORD: "Change Password",
        RESEND_INVITATION: "Resend Invitation"
    },
    LOGGED_MODULES: {
        User: "User",
        UserStatus: "User Status",
        UserRole: "User Roles",
        UserAddress: "User Addresses",
        UserContact: "User Contacts",
        UserPermission: "User Permissions",
        UserRevokePermission: "User Revoke Permissions",
        UserRelationship: "User Relationship",
        UserRelationshipPermission: "User Relationship Permissions",
        Role: "Role",
        RoleStatus: "Role Status",
        EntityPermissionGroup: "Entity Permission Group",
        EntityPermissionGroupStatus: "Entity Permission Group Status",
        Permission: "Permission",
        PermissionStatus: "Permission Status",
        RoleGroup: "Role Group",
        RoleGroupStatus: "Role Group Status",
        PermissionGroup: "Permission Group",
        PermissionGroupStatus: "Permission Group Status",
        Authentication: "Authentication"
    },
    LOGGED_ENTITY_TYPES: {
        User: "users",
        Role: "roles",
        Permission: "permissions",
        Address: "addresses",
        Contact: "contacts",
        RoleGroup: "role_groups",
        EntityPermissionGroup: "entity_permission_groups",
        PermissionGroup: "permission_groups",
        UserRelationship: "user_relationships",
        EMPTY: ""
    }
}