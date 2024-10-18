import packager from '@electron/packager';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootPath = path.join(__dirname, '..');
const appDistPath = path.join(rootPath, 'dist');
const outPath = path.join(rootPath, 'out');

// Build renderer
execSync('vite build ./app', { cwd: rootPath, stdio: 'inherit' });

// Build main and preload
execSync('tsc', { cwd: rootPath, stdio: 'inherit' });

// Move package.json to out parh
fs.copyFileSync(
  path.join(rootPath, 'app', 'package.json'),
  path.join(appDistPath, 'package.json')
);

// Install dependencies
execSync('npm install', { cwd: appDistPath, stdio: 'inherit' });

// Packaging app
const platform = process.env.PLATFORM ?? ['win32', 'darwin', 'linux'];
packager({
  dir: appDistPath,
  out: outPath,
  appVersion: '1.0.0',
  icon: './app/assets/icons/icon',
  platform: platform,
  arch: ['x64', 'arm64'],
  overwrite: true,
  asar: true,
});
