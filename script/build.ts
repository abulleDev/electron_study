import packager from '@electron/packager';
import fs from 'fs';
import path from 'path';
import  { execSync } from 'child_process';

const rootPath = path.join(__dirname, '..')
const appDistPath = path.join(rootPath, 'dist')
const outParh = path.join(rootPath, 'out')

fs.copyFileSync(
  path.join(rootPath, 'app', 'package.json'),
  path.join(appDistPath, 'package.json')
)
execSync('npm install', {
  cwd: appDistPath
})

packager({
  dir: appDistPath,
  out: outParh,
  appVersion: '1.0.0',
  icon: './app/assets/icons/icon',
  platform: ['win32', 'darwin', 'linux'],
  arch: ['x64', 'arm64'],
  overwrite: true,
  asar: true,
});
