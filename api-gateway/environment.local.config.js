/**
 * PM2 Configuration File
 * 
 * This file contains configuration for PM2 process manager to run Node.js applications.
 * PM2 uses this configuration to manage application instances, environment settings,
 * and runtime behavior.
 */

module.exports = {
    /**
     * Applications List
     * Array of application configurations to be managed by PM2
     */
    apps: [
      {
        // Unique name for the application instance
        name: "captive-api-gateway-local",
        
        // Path to the entry point script
        script: "./src/api/api.server.js",
        
        // Disable automatic file watching to prevent unnecessary restarts
        watch: false,
        
        // Environment variables to be injected into the application
        env: {
          // Set Node environment to local
          NODE_ENV: "local"
        },
        
        // Number of instances to launch (cluster mode)
        instances: 1,
        
        // Optional: Additional common settings you might want to add
        // exec_mode: "cluster",           // Execution mode (fork|cluster)
        // max_memory_restart: "512M",     // Restart if app reaches memory limit
        // log_date_format: "YYYY-MM-DD HH:mm:ss", // Log timestamp format
        // error_file: "./logs/error.log", // Error log file path
        // out_file: "./logs/out.log",     // Output log file path
      }
    ]
  };