require('../../moduleAliases');
const appDatabase = require("@database/app.database");
const { DEFAULT_ROLES } = require('@constants/app.constant');
const passwordHash = require("password-hash");
const readline = require('readline');

async function createUser() {
    const terminalInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const terminalPrompt = (question) => {
        return new Promise((resolve) => {
            this.terminalInterface
            terminalInterface.question(question, (answer) => resolve(answer));
        });
    }
    try {
        console.log("=== Create User Initialization Started ===");
        // Step 1: Create user account with user input
        const roles = await appDatabase.Role.find({ isSystem: true });
        const superAdminRole = roles.find((role) => role.name == DEFAULT_ROLES.SUPER_ADMIN);
        const adminRole = roles.find((role) => role.name == DEFAULT_ROLES.ADMIN);
        const partnerRole = roles.find((role) => role.name == DEFAULT_ROLES.PARTNER);
        const customerRole = roles.find((role) => role.name == DEFAULT_ROLES.CUSTOMER);
        const subsidiaryRole = roles.find((role) => role.name == DEFAULT_ROLES.ADMIN);
        // Step 7: Assign role to user
        console.log("\nAvailable roles:");
        console.log(`1. ${DEFAULT_ROLES.SUPER_ADMIN}`);
        console.log(`2. ${DEFAULT_ROLES.ADMIN}`);
        console.log(`3. ${DEFAULT_ROLES.PARTNER}`);
        console.log(`4. ${DEFAULT_ROLES.CUSTOMER}`);
        console.log(`5. ${DEFAULT_ROLES.SUBSIDIARY}`);
        const roleChoice = await terminalPrompt("Enter role number (1-5): ");
        let selectedRoleId;
        switch (roleChoice) {
            case "1": selectedRoleId = superAdminRole._id; break;
            case "2": selectedRoleId = adminRole._id; break;
            case "3": selectedRoleId = partnerRole._id; break;
            case "4": selectedRoleId = customerRole._id; break;
            case "5": selectedRoleId = subsidiaryRole._id; break;
            default: selectedRoleId = superAdminRole._id;
        }
        const firstName = await terminalPrompt("Enter first name: ");
        const middleName = await terminalPrompt("Enter middle name (optional): ");
        const lastName = await terminalPrompt("Enter last name: ");
        const userName = await terminalPrompt("Enter username: ");
        const email = await terminalPrompt("Enter email: ");
        let password;
        while (true) {
            password = await terminalPrompt("Enter password (at least 6 digits): ");
            if (password) {
                break; // Exit loop if password is exists
            }
            console.log("Invalid password. It must be at least 6 digits. Please try again.");
        }

        // Hash the password before storing
        const hashedPassword = passwordHash.generate(password);
        const userAccount = await appDatabase.User.create({
            firstName,
            middleName,
            lastName,
            userName,
            email,
            password: hashedPassword,
            isEmailVerified: true,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            roles: [selectedRoleId],
            revokePermissions: [],
            grantPermissions: []
        });

        console.log(`User account created for ${userAccount.firstName} ${userAccount.lastName}`);
    } catch (error) {
        console.error("Error during database setup:", error);
    } finally {
        terminalInterface.close();
        process.exit(0);
    }
}

// Run the function if this script is executed directly
if (require.main === module) {
    createUser();
}

module.exports = createUser;