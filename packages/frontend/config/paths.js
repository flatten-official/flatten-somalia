const path = require("path");
const fs = require("fs");

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
  "web.mjs",
  "mjs",
  "web.js",
  "js",
  "json",
  "web.jsx",
  "jsx",
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
  appPath: resolveApp("."),
  appBuild: resolveApp("build"),
  appPublic: resolveApp("packages/frontend/public"),
  appHtml: resolveApp("packages/frontend/public/index.html"),
  appIndexJs: resolveModule(resolveApp, "packages/frontend/src/index"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("packages/frontend/src"),
  appNodeModules: resolveApp("node_modules"),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
