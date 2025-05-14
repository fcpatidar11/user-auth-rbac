const permissionGroupConstant = require("@constants/permissionGroup.constant");

module.exports = {
    user: {
        admin: {
            create: {
                code: "user:admin:create",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Admin User Creation",
                description: "Comprehensive permission to create new administrative users with full system control. Allows setting up new admin accounts with appropriate initial configurations and control levels."
            },
            update: {
                code: "user:admin:update",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Admin User Modification",
                description: "Enables editing and updating existing administrative user profiles, including contact information, control settings, and other configurable attributes."
            },
            status: {
                code: "user:admin:status",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Admin User Status Management",
                description: "Provides ability to activate, deactivate, suspend, or modify the current operational status of administrative user accounts."
            },
            view: {
                code: "user:admin:view",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Single Admin User Inspection",
                description: "Grants permission to view detailed information about a specific administrative user, including profile details, roles, and permissions."
            },
            views: {
                code: "user:admin:views",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Admin Users Listing",
                description: "Allows retrieval and browsing of all administrative users with comprehensive list view and optional filtering capabilities."
            },
            address: {
                create: {
                    code: "user:admin:address:create",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Admin User Address Creation",
                    description: "Comprehensive permission to create new administrative users address."
                },
                update: {
                    code: "user:admin:address:update",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Admin User Address Modification",
                    description: "Enables editing and updating existing administrative user address."
                },
                delete: {
                    code: "user:admin:address:delete",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Admin User Address Delete",
                    description: "Provides ability to delete user address."
                },
                view: {
                    code: "user:admin:address:view",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Single Admin User Address Inspection",
                    description: "Grants permission to view detailed information about a specific administrative user address."
                },
                views: {
                    code: "user:admin:address:views",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Admin User Addresses Listing",
                    description: "Allows retrieval and browsing of all administrative user addresses."
                },
            },
            contact: {
                create: {
                    code: "user:admin:contact:create",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Admin User Contact Creation",
                    description: "Comprehensive permission to create new administrative users contact."
                },
                update: {
                    code: "user:admin:contact:update",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Admin User Contact Modification",
                    description: "Enables editing and updating existing administrative user contact."
                },
                delete: {
                    code: "user:admin:contact:delete",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Admin User Contact Delete",
                    description: "Provides ability to delete user contact."
                },
                view: {
                    code: "user:admin:contact:view",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Single Admin User Contact Inspection",
                    description: "Grants permission to view detailed information about a specific administrative user contact."
                },
                views: {
                    code: "user:admin:contact:views",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Admin User Contacts Listing",
                    description: "Allows retrieval and browsing of all administrative user contacts."
                },
            },
            rbac: {
                role: {
                    update: {
                        code: "user:admin:rbac:role:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Admin Role Permission Update",
                        description: "Enables modification of role-based control (RBAC) settings for administrative users, allowing assignment of new roles or adjustment of existing role permissions."
                    }
                },
                revokePermission: {
                    update: {
                        code: "user:admin:rbac:revokePermission:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Admin Permission Revocation",
                        description: "Provides capability to selectively remove specific permissions from administrative user accounts, restricting their system control as needed."
                    }
                },
                grantPermission: {
                    update: {
                        code: "user:admin:rbac:grantPermission:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Individual Admin Permission Management",
                        description: "Allows fine-grained control over individual permissions for administrative users, enabling precise control beyond standard role assignments."
                    }
                }
            },
            activityLogs: {
                views: {
                    code: "user:admin:activityLogs:views",
                    groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                    name: "Admin Activity Logs Viewing",
                    description: "Enables control to view comprehensive activity logs for administrative users, tracking system interactions and operational history."
                }
            }
        },
        partner: {
            create: {
                code: "user:partner:create",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Partner User Creation",
                description: "Comprehensive permission to create new partner users with full system control. Allows setting up new partner accounts with appropriate initial configurations and control levels."
            },
            update: {
                code: "user:partner:update",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Partner User Modification",
                description: "Enables editing and updating existing partner user profiles, including contact information, control settings, and other configurable attributes."
            },
            status: {
                code: "user:partner:status",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Partner User Status Management",
                description: "Provides ability to activate, deactivate, suspend, or modify the current operational status of partner user accounts."
            },
            view: {
                code: "user:partner:view",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Single Partner User Inspection",
                description: "Grants permission to view detailed information about a specific partner user, including profile details, roles, and permissions."
            },
            views: {
                code: "user:partner:views",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Partner Users Listing",
                description: "Allows retrieval and browsing of all partner users with comprehensive list view and optional filtering capabilities."
            },
            address: {
                create: {
                    code: "user:partner:address:create",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Partner User Address Creation",
                    description: "Comprehensive permission to create new partner user address."
                },
                update: {
                    code: "user:partner:address:update",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Partner User Address Modification",
                    description: "Enables editing and updating existing partner user address."
                },
                delete: {
                    code: "user:partner:address:delete",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Partner User Address Delete",
                    description: "Provides ability to delete user address."
                },
                view: {
                    code: "user:partner:address:view",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Single Partner User Address Inspection",
                    description: "Grants permission to view detailed information about a specific partner user address."
                },
                views: {
                    code: "user:partner:address:views",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Partner User Addresses Listing",
                    description: "Allows retrieval and browsing of all partner user addresses."
                },
            },
            contact: {
                create: {
                    code: "user:partner:contact:create",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Partner User Contact Creation",
                    description: "Comprehensive permission to create new partner users contact."
                },
                update: {
                    code: "user:partner:contact:update",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Partner User Contact Modification",
                    description: "Enables editing and updating existing partner user contact."
                },
                delete: {
                    code: "user:partner:contact:delete",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Partner User Contact Delete",
                    description: "Provides ability to delete user contact."
                },
                view: {
                    code: "user:partner:contact:view",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Single Partner User Contact Inspection",
                    description: "Grants permission to view detailed information about a specific partner user contact."
                },
                views: {
                    code: "user:partner:contact:views",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Partner User Contacts Listing",
                    description: "Allows retrieval and browsing of all partner user contacts."
                },
            },
            rbac: {
                role: {
                    update: {
                        code: "user:partner:rbac:role:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Partner Role Permission Update",
                        description: "Enables modification of role-based control (RBAC) settings for partner users, allowing assignment of new roles or adjustment of existing role permissions."
                    }
                },
                revokePermission: {
                    update: {
                        code: "user:partner:rbac:revokePermission:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Partner Permission Revocation",
                        description: "Provides capability to selectively remove specific permissions from partner user accounts, restricting their system control as needed."
                    }
                },
                grantPermission: {
                    update: {
                        code: "user:partner:rbac:grantPermission:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Individual Partner Permission Management",
                        description: "Allows fine-grained control over individual permissions for partner users, enabling precise control beyond standard role assignments."
                    }
                }
            },
            activityLogs: {
                views: {
                    code: "user:partner:activityLogs:views",
                    groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                    name: "Partner Activity Logs Viewing",
                    description: "Enables control to view comprehensive activity logs for partner users, tracking system interactions and operational history."
                }
            }
        },
        technician: {
            create: {
                code: "user:technician:create",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Technician User Creation",
                description: "Comprehensive permission to create new technician users with full system control. Allows setting up new technician accounts with appropriate initial configurations and control levels."
            },
            update: {
                code: "user:technician:update",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Technician User Modification",
                description: "Enables editing and updating existing technician user profiles, including contact information, control settings, and other configurable attributes."
            },
            status: {
                code: "user:technician:status",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Technician User Status Management",
                description: "Provides ability to activate, deactivate, suspend, or modify the current operational status of technician user accounts."
            },
            view: {
                code: "user:technician:view",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Single Technician User Inspection",
                description: "Grants permission to view detailed information about a specific technician user, including profile details, roles, and permissions."
            },
            views: {
                code: "user:technician:views",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Technician Users Listing",
                description: "Allows retrieval and browsing of all technician users with comprehensive list view and optional filtering capabilities."
            },
            address: {
                create: {
                    code: "user:technician:address:create",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Technician User Address Creation",
                    description: "Comprehensive permission to create new technician user address."
                },
                update: {
                    code: "user:technician:address:update",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Technician User Address Modification",
                    description: "Enables editing and updating existing technician user address."
                },
                delete: {
                    code: "user:technician:address:delete",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Technician User Address Delete",
                    description: "Provides ability to delete user address."
                },
                view: {
                    code: "user:technician:address:view",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Single Technician User Address Inspection",
                    description: "Grants permission to view detailed information about a specific technician user address."
                },
                views: {
                    code: "user:technician:address:views",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Technician User Addresses Listing",
                    description: "Allows retrieval and browsing of all technician user addresses."
                },
            },
            contact: {
                create: {
                    code: "user:technician:contact:create",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Technician User Contact Creation",
                    description: "Comprehensive permission to create new technician users contact."
                },
                update: {
                    code: "user:technician:contact:update",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Technician User Contact Modification",
                    description: "Enables editing and updating existing technician user contact."
                },
                delete: {
                    code: "user:technician:contact:delete",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Technician User Contact Delete",
                    description: "Provides ability to delete user contact."
                },
                view: {
                    code: "user:technician:contact:view",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Single Technician User Contact Inspection",
                    description: "Grants permission to view detailed information about a specific technician user contact."
                },
                views: {
                    code: "user:technician:contact:views",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Technician User Contacts Listing",
                    description: "Allows retrieval and browsing of all technician user contacts."
                },
            },
            rbac: {
                role: {
                    update: {
                        code: "user:technician:rbac:role:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Technician Role Permission Update",
                        description: "Enables modification of role-based control (RBAC) settings for technician users, allowing assignment of new roles or adjustment of existing role permissions."
                    }
                },
                revokePermission: {
                    update: {
                        code: "user:technician:rbac:revokePermission:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Technician Permission Revocation",
                        description: "Provides capability to selectively remove specific permissions from technician user accounts, restricting their system control as needed."
                    }
                },
                grantPermission: {
                    update: {
                        code: "user:technician:rbac:grantPermission:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Individual Technician Permission Management",
                        description: "Allows fine-grained control over individual permissions for technician users, enabling precise control beyond standard role assignments."
                    }
                }
            },
            activityLogs: {
                views: {
                    code: "user:technician:activityLogs:views",
                    groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                    name: "Technician Activity Logs Viewing",
                    description: "Enables control to view comprehensive activity logs for technician users, tracking system interactions and operational history."
                }
            }
        },
        customer: {
            create: {
                code: "user:customer:create",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Customer User Creation",
                description: "Comprehensive permission to create new customer users with full system control. Allows setting up new customer accounts with appropriate initial configurations and control levels."
            },
            update: {
                code: "user:customer:update",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Customer User Modification",
                description: "Enables editing and updating existing customer user profiles, including contact information, control settings, and other configurable attributes."
            },
            status: {
                code: "user:customer:status",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Customer User Status Management",
                description: "Provides ability to activate, deactivate, suspend, or modify the current operational status of customer user accounts."
            },
            view: {
                code: "user:customer:view",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Single Customer User Inspection",
                description: "Grants permission to view detailed information about a specific customer user, including profile details, roles, and permissions."
            },
            views: {
                code: "user:customer:views",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Customer Users Listing",
                description: "Allows retrieval and browsing of all customer users with comprehensive list view and optional filtering capabilities."
            },
            address: {
                create: {
                    code: "user:customer:address:create",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Customer User Address Creation",
                    description: "Comprehensive permission to create new customer user address."
                },
                update: {
                    code: "user:customer:address:update",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Customer User Address Modification",
                    description: "Enables editing and updating existing customer user address."
                },
                delete: {
                    code: "user:customer:address:delete",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Customer User Address Delete",
                    description: "Provides ability to delete user address."
                },
                view: {
                    code: "user:customer:address:view",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Single Customer User Address Inspection",
                    description: "Grants permission to view detailed information about a specific customer user address."
                },
                views: {
                    code: "user:customer:address:views",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Customer User Addresses Listing",
                    description: "Allows retrieval and browsing of all customer user addresses."
                },
            },
            contact: {
                create: {
                    code: "user:customer:contact:create",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Customer User Contact Creation",
                    description: "Comprehensive permission to create new customer users contact."
                },
                update: {
                    code: "user:customer:contact:update",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Customer User Contact Modification",
                    description: "Enables editing and updating existing customer user contact."
                },
                delete: {
                    code: "user:customer:contact:delete",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Customer User Contact Delete",
                    description: "Provides ability to delete user contact."
                },
                view: {
                    code: "user:customer:contact:view",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Single Customer User Contact Inspection",
                    description: "Grants permission to view detailed information about a specific customer user contact."
                },
                views: {
                    code: "user:customer:contact:views",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Customer User Contacts Listing",
                    description: "Allows retrieval and browsing of all customer user contacts."
                },
            },
            relationships: {
                subsidiary: {
                    code: "user:customer:relationships:subsidiary",
                    groupCode: permissionGroupConstant.USER_RELATIONSHIP.code,
                    name: "Manage relationships between customer and subsidiaries",
                    description: "Manage the relationship between the customer and subsidiaries with customer control permissions."
                }
            },
            rbac: {
                role: {
                    update: {
                        code: "user:customer:rbac:role:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Customer Role Permission Update",
                        description: "Enables modification of role-based control (RBAC) settings for customer users, allowing assignment of new roles or adjustment of existing role permissions."
                    }
                },
                revokePermission: {
                    update: {
                        code: "user:customer:rbac:revokePermission:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Customer Permission Revocation",
                        description: "Provides capability to selectively remove specific permissions from customer user accounts, restricting their system control as needed."
                    }
                },
                grantPermission: {
                    update: {
                        code: "user:customer:rbac:grantPermission:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Individual Customer Permission Management",
                        description: "Allows fine-grained control over individual permissions for customer users, enabling precise control beyond standard role assignments."
                    }
                }
            },
            activityLogs: {
                views: {
                    code: "user:customer:activityLogs:views",
                    groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                    name: "Customer Activity Logs Viewing",
                    description: "Enables control to view comprehensive activity logs for customer users, tracking system interactions and operational history."
                }
            }
        },
        subsidiary: {
            create: {
                code: "user:subsidiary:create",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Subsidiary User Creation",
                description: "Comprehensive permission to create new subsidiary users with full system control. Allows setting up new subsidiary accounts with appropriate initial configurations and control levels."
            },
            update: {
                code: "user:subsidiary:update",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Subsidiary User Modification",
                description: "Enables editing and updating existing subsidiary user profiles, including contact information, control settings, and other configurable attributes."
            },
            status: {
                code: "user:subsidiary:status",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Subsidiary User Status Management",
                description: "Provides ability to activate, deactivate, suspend, or modify the current operational status of subsidiary user accounts."
            },
            view: {
                code: "user:subsidiary:view",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Single Subsidiary User Inspection",
                description: "Grants permission to view detailed information about a specific subsidiary user, including profile details, roles, and permissions."
            },
            views: {
                code: "user:subsidiary:views",
                groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                name: "Subsidiary Users Listing",
                description: "Allows retrieval and browsing of all subsidiary users with comprehensive list view and optional filtering capabilities."
            },
            address: {
                create: {
                    code: "user:subsidiary:address:create",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Subsidiary User Address Creation",
                    description: "Comprehensive permission to create new subsidiary user address."
                },
                update: {
                    code: "user:subsidiary:address:update",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Subsidiary User Address Modification",
                    description: "Enables editing and updating existing subsidiary user address."
                },
                delete: {
                    code: "user:subsidiary:address:delete",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Subsidiary User Address Delete",
                    description: "Provides ability to delete user address."
                },
                view: {
                    code: "user:subsidiary:address:view",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Single Subsidiary User Address Inspection",
                    description: "Grants permission to view detailed information about a specific subsidiary user address."
                },
                views: {
                    code: "user:subsidiary:address:views",
                    groupCode: permissionGroupConstant.USER_ADDRESS.code,
                    name: "Subsidiary User Addresses Listing",
                    description: "Allows retrieval and browsing of all subsidiary user addresses."
                },
            },
            contact: {
                create: {
                    code: "user:subsidiary:contact:create",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Subsidiary User Contact Creation",
                    description: "Comprehensive permission to create new subsidiary users contact."
                },
                update: {
                    code: "user:subsidiary:contact:update",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Subsidiary User Contact Modification",
                    description: "Enables editing and updating existing subsidiary user contact."
                },
                delete: {
                    code: "user:subsidiary:contact:delete",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Subsidiary User Contact Delete",
                    description: "Provides ability to delete user contact."
                },
                view: {
                    code: "user:subsidiary:contact:view",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Single Subsidiary User Contact Inspection",
                    description: "Grants permission to view detailed information about a specific subsidiary user contact."
                },
                views: {
                    code: "user:subsidiary:contact:views",
                    groupCode: permissionGroupConstant.USER_CONTACT.code,
                    name: "Subsidiary User Contacts Listing",
                    description: "Allows retrieval and browsing of all subsidiary user contacts."
                },
            },
            rbac: {
                role: {
                    update: {
                        code: "user:subsidiary:rbac:role:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Subsidiary Role Permission Update",
                        description: "Enables modification of role-based control (RBAC) settings for subsidiary users, allowing assignment of new roles or adjustment of existing role permissions."
                    }
                },
                revokePermission: {
                    update: {
                        code: "user:subsidiary:rbac:revokePermission:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Subsidiary Permission Revocation",
                        description: "Provides capability to selectively remove specific permissions from subsidiary user accounts, restricting their system control as needed."
                    }
                },
                grantPermission: {
                    update: {
                        code: "user:subsidiary:rbac:grantPermission:update",
                        groupCode: permissionGroupConstant.USER_PERMISSION_GUARD.code,
                        name: "Individual Subsidiary Permission Management",
                        description: "Allows fine-grained control over individual permissions for subsidiary users, enabling precise control beyond standard role assignments."
                    }
                }
            },
            activityLogs: {
                views: {
                    code: "user:subsidiary:activityLogs:views",
                    groupCode: permissionGroupConstant.USER_ACCOUNT.code,
                    name: "Subsidiary Activity Logs Viewing",
                    description: "Enables control to view comprehensive activity logs for subsidiary users, tracking system interactions and operational history."
                }
            }
        },
        me: {
            update: {
                code: "user:me:update",
                groupCode: permissionGroupConstant.OWN_ACCOUNT.code,
                name: "Personal Profile Update",
                description: "Permits users to modify their own profile information, including personal details, contact information, and non-sensitive account settings."
            },
            password: {
                change: {
                    code: "user:me:password:change",
                    groupCode: permissionGroupConstant.OWN_ACCOUNT.code,
                    name: "Personal Password Modification",
                    description: "Allows authenticated users to change their account password, with potential additional security requirements like current password verification."
                }
            },
            address: {
                create: {
                    code: "user:me:address:create",
                    groupCode: permissionGroupConstant.OWN_ADDRESS.code,
                    name: "Personal Address Creation",
                    description: "Comprehensive permission to create new personal address."
                },
                update: {
                    code: "user:me:address:update",
                    groupCode: permissionGroupConstant.OWN_ADDRESS.code,
                    name: "Personal Address Modification",
                    description: "Enables editing and updating existing personal address."
                },
                delete: {
                    code: "user:me:address:delete",
                    groupCode: permissionGroupConstant.OWN_ADDRESS.code,
                    name: "Personal Address Delete",
                    description: "Provides ability to delete personal address."
                },
                view: {
                    code: "user:me:address:view",
                    groupCode: permissionGroupConstant.OWN_ADDRESS.code,
                    name: "Single Personal Address Inspection",
                    description: "Grants permission to view detailed information about a specific personal address."
                },
                views: {
                    code: "user:me:address:views",
                    groupCode: permissionGroupConstant.OWN_ADDRESS.code,
                    name: "Personal Addresses Listing",
                    description: "Allows retrieval and browsing of all personal addresses."
                },
            },
            contact: {
                create: {
                    code: "user:me:contact:create",
                    groupCode: permissionGroupConstant.OWN_CONTACT.code,
                    name: "Personal Contact Creation",
                    description: "Comprehensive permission to create new personal contact."
                },
                update: {
                    code: "user:me:contact:update",
                    groupCode: permissionGroupConstant.OWN_CONTACT.code,
                    name: "Personal Contact Modification",
                    description: "Enables editing and updating existing personal contact."
                },
                delete: {
                    code: "user:me:contact:delete",
                    groupCode: permissionGroupConstant.OWN_CONTACT.code,
                    name: "Personal Contact Delete",
                    description: "Provides ability to delete personal contact."
                },
                view: {
                    code: "user:me:contact:view",
                    groupCode: permissionGroupConstant.OWN_CONTACT.code,
                    name: "Single Personal Contact Inspection",
                    description: "Grants permission to view detailed information about a specific personal contact."
                },
                views: {
                    code: "user:me:contact:views",
                    groupCode: permissionGroupConstant.OWN_CONTACT.code,
                    name: "Personal Contacts Listing",
                    description: "Allows retrieval and browsing of all personal contacts."
                },
            }
        }
    },
    role: {
        create: {
            code: "role:create",
            groupCode: permissionGroupConstant.ROLES.code,
            name: "Role Creation",
            description: "Grants permission to define and establish new user roles with specific sets of permissions and controls within the system."
        },
        update: {
            code: "role:update",
            groupCode: permissionGroupConstant.ROLES.code,
            name: "Role Modification",
            description: "Enables editing and updating existing role definitions, including adjusting permission sets, role names, and control parameters."
        },
        view: {
            code: "role:view",
            groupCode: permissionGroupConstant.ROLES.code,
            name: "Single Role Inspection",
            description: "Allows viewing detailed information about a specific role, including its permissions."
        },
        views: {
            code: "role:views",
            groupCode: permissionGroupConstant.ROLES.code,
            name: "Roles Listing",
            description: "Allows retrieval and browsing of all roles, including its permissions."
        },
        status: {
            code: "role:status",
            groupCode: permissionGroupConstant.ROLES.code,
            name: "Role Status Management",
            description: "Provides ability to activate, deactivate, or modify the current operational status of role."
        },
        group: {
            create: {
                code: "role:group:create",
                groupCode: permissionGroupConstant.ROLE_GROUPS.code,
                name: "Role Group Creation",
                description: "Grants permission to define and establish new role groups."
            },
            update: {
                code: "role:group:update",
                groupCode: permissionGroupConstant.ROLE_GROUPS.code,
                name: "Role Group Modification",
                description: "Enables editing and updating existing role group definitions, including role group name, and control parameters."
            },
            view: {
                code: "role:group:view",
                groupCode: permissionGroupConstant.ROLE_GROUPS.code,
                name: "Single Role Group Inspection",
                description: "Allows viewing detailed information about a specific role group."
            },
            views: {
                code: "role:group:views",
                groupCode: permissionGroupConstant.ROLE_GROUPS.code,
                name: "Role Groups Listing",
                description: "Allows retrieval and browsing of all role groups."
            },
            status: {
                code: "role:group:status",
                groupCode: permissionGroupConstant.ROLE_GROUPS.code,
                name: "Role Group Status Management",
                description: "Provides ability to activate, deactivate, or modify the current operational status of role group."
            }
        }
    },
    permission: {
        create: {
            code: "permission:create",
            groupCode: permissionGroupConstant.PERMISSIONS.code,
            name: "Permission Creation",
            description: "Grants permission to define and establish new user permission with controls within the system."
        },
        update: {
            code: "permission:update",
            groupCode: permissionGroupConstant.PERMISSIONS.code,
            name: "Permission Modification",
            description: "Enables editing and updating existing permission definitions, including control parameters."
        },
        view: {
            code: "permission:view",
            groupCode: permissionGroupConstant.PERMISSIONS.code,
            name: "Single Permission Inspection",
            description: "Allows viewing detailed information about a specific permission."
        },
        views: {
            code: "permission:views",
            groupCode: permissionGroupConstant.PERMISSIONS.code,
            name: "Permissions Listing",
            description: "Allows retrieval and browsing of all permissions."
        },
        status: {
            code: "permission:status",
            groupCode: permissionGroupConstant.PERMISSIONS.code,
            name: "Permission Status Management",
            description: "Provides ability to activate, deactivate, or modify the current operational status of permission."
        },
        group: {
            create: {
                code: "permission:group:create",
                groupCode: permissionGroupConstant.PERMISSION_GROUPS.code,
                name: "Permission Group Creation",
                description: "Grants permission to define and establish new permission groups."
            },
            update: {
                code: "permission:group:update",
                groupCode: permissionGroupConstant.PERMISSION_GROUPS.code,
                name: "Permission Group Modification",
                description: "Enables editing and updating existing permission group definitions, including permission group name, and control parameters."
            },
            view: {
                code: "permission:group:view",
                groupCode: permissionGroupConstant.PERMISSION_GROUPS.code,
                name: "Single Permission Group Inspection",
                description: "Allows viewing detailed information about a specific permission group."
            },
            views: {
                code: "permission:group:views",
                groupCode: permissionGroupConstant.PERMISSION_GROUPS.code,
                name: "Permission Groups Listing",
                description: "Allows retrieval and browsing of all permission groups."
            },
            status: {
                code: "permission:group:status",
                groupCode: permissionGroupConstant.PERMISSION_GROUPS.code,
                name: "Permission Group Status Management",
                description: "Provides ability to activate, deactivate, or modify the current operational status of permission group."
            }
        }
    },
    entityPermissionGroup: {
        create: {
            code: "entityPermissionGroup:create",
            groupCode: permissionGroupConstant.ENTITY_GROUP_PERMISSIONS.code,
            name: "User Delegate Permission Group Create",
            description: "Enables editing and updating existing user delegate permission group definitions, including individual, revoke, relationship permissions parameters."
        },
        update: {
            code: "entityPermissionGroup:update",
            groupCode: permissionGroupConstant.ENTITY_GROUP_PERMISSIONS.code,
            name: "User Delegate Permission Group Modification",
            description: "Enables editing and updating existing user delegate permission group definitions, including individual, revoke, relationship permissions parameters."
        },
        view: {
            code: "entityPermissionGroup:view",
            groupCode: permissionGroupConstant.ENTITY_GROUP_PERMISSIONS.code,
            name: "Single User Delegate Permission Group Inspection",
            description: "Allows viewing detailed information about a specific user delegate permission group."
        },
        views: {
            code: "entityPermissionGroup:views",
            groupCode: permissionGroupConstant.ENTITY_GROUP_PERMISSIONS.code,
            name: "User Delegate Permission Groups Listing",
            description: "Allows retrieval and browsing of all user delegate permission groups."
        },
        status: {
            code: "entityPermissionGroup:status",
            groupCode: permissionGroupConstant.ENTITY_GROUP_PERMISSIONS.code,
            name: "User Delegate Permission Group Status Management",
            description: "Provides ability to activate, deactivate, or modify the current operational status of user delegate permission group."
        }
    }
};