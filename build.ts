import packager from '@electron/packager';

packager({
  dir: '.',
  out: './out',
  appVersion: '1.0.0',
  icon: './src/assets/icons/icon',
  platform: ['win32', 'darwin', 'linux'],
  arch: ['x64', 'arm64'],
  overwrite: true,
  asar: true,
});
