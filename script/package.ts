import { createWindowsInstaller } from 'electron-winstaller';
import { archiveFolder } from 'zip-lib';
import path from 'path';
import { author, description, name } from '../package.json';
import { c } from 'tar';

const rootPath = path.join(__dirname, '..');
const outPath = path.join(rootPath, 'out');
const packagePath = path.join(outPath, `./package`)

async function packageWindows() {
  try {
    console.log('Packaging Windows x64...')
    await createWindowsInstaller({
      appDirectory: path.join(outPath, `${name}-win32-x64`),
      outputDirectory: path.join(packagePath, `${name}-win32-x64`),
      authors: author,
      description: description,
      setupIcon: path.join(rootPath, './app/assets/icons/icon.ico'),
      iconUrl: path.join(rootPath, './app/assets/icons/icon.ico'),
      setupExe: `${name}-win32-x64.exe`,
      noMsi: true,
    });
    console.log('Packaging Windows arm64...')
    await createWindowsInstaller({
      appDirectory: path.join(outPath, `${name}-win32-arm64`),
      outputDirectory: path.join(packagePath, `${name}-win32-arm64`),
      authors: author,
      description: description,
      setupIcon: path.join(rootPath, './app/assets/icons/icon.ico'),
      iconUrl: path.join(rootPath, './app/assets/icons/icon.ico'),
      setupExe: `${name}-win32-arm64.exe`,
      noMsi: true,
    });
  } catch (error) {
    console.error(error);
  }
}

async function packageMac() {
  try {
    console.log('Packaging macOS x64...')
    await archiveFolder(
      path.join(packagePath, `${name}-darwin-x64`),
      path.join(packagePath, `${name}-darwin-x64.zip`)
    );
    console.log('Packaging macOS arm64...')
    await archiveFolder(
      path.join(packagePath, `${name}-darwin-arm64`),
      path.join(packagePath, `${name}-darwin-arm64.zip`)
    );
  } catch (error) {
    console.error(error);
  }
}

async function packageLinux() {
  try {
    console.log('Packaging Linux x64...')
    await c(
      {
        gzip: true,
        file: path.join(packagePath, `${name}-linux-x64.tar.gz`),
        cwd: outPath,
      },
      [`${name}-linux-x64`]
    );
    console.log('Packaging Linux arm64...')
    await c(
      {
        gzip: true,
        file: path.join(packagePath, `${name}-linux-arm64.tar.gz`),
        cwd: outPath,
      },
      [`${name}-linux-arm64`]
    );
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  if (process.platform === 'win32') {
    await packageWindows();
  } else {
    await packageMac();
  }
  await packageLinux();
})()
