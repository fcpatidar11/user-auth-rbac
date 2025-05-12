/**
 * Module Aliases Configuration
 * 
 * This file configures path aliases to avoid relative import paths throughout the application.
 * Using these aliases helps improve code readability and maintainability by creating
 * consistent and meaningful import paths.
 * 
 * @module module-aliases
 */

const path = require('path');
const moduleAlias = require('module-alias');

/**
 * Base directory resolve helper
 * @param {string} relativePath - Path relative to the project root
 * @returns {string} Absolute path
 */
const resolveFromRoot = (relativePath) => path.resolve(__dirname, relativePath);

/**
 * Application directory structure
 */
const DIRECTORIES = {
  // Documentation
  docs: resolveFromRoot('docs'),
  
  // Shared resources
  shared: {
    root: resolveFromRoot('shared'),
    configs: resolveFromRoot('shared/configs'),
    constants: resolveFromRoot('shared/constants'),
    utils: resolveFromRoot('shared/utils'),
    loggers: resolveFromRoot('shared/utils/loggers'),
  },
  
  // Source code
  src: {
    root: resolveFromRoot('src'),
    formatters: resolveFromRoot('src/formatters'),
    
    // API components
    api: {
      root: resolveFromRoot('src/api'),
      controllers: resolveFromRoot('src/api/controllers'),
      middlewares: resolveFromRoot('src/api/middlewares'),
      routes: resolveFromRoot('src/api/routes'),
    },
    
    // gRPC components
    grpc: {
      root: resolveFromRoot('src/grpc'),
      clients: resolveFromRoot('src/grpc/clients'),
    },
  },
};

/**
 * Register all path aliases
 */
moduleAlias.addAliases({
  // Documentation
  '@docs': DIRECTORIES.docs,
  
  // Shared resources
  '@shared': DIRECTORIES.shared.root,
  '@configs': DIRECTORIES.shared.configs,
  '@constants': DIRECTORIES.shared.constants,
  '@utils': DIRECTORIES.shared.utils,
  '@loggers': DIRECTORIES.shared.loggers,
  
  // Source code
  '@src': DIRECTORIES.src.root,
  '@formatters': DIRECTORIES.src.formatters,
  
  // API components
  '@api': DIRECTORIES.src.api.root,
  '@controllers': DIRECTORIES.src.api.controllers,
  '@middlewares': DIRECTORIES.src.api.middlewares,
  '@routes': DIRECTORIES.src.api.routes,
  
  // gRPC components
  '@grpcDir': DIRECTORIES.src.grpc.root,
  '@clients': DIRECTORIES.src.grpc.clients,
});