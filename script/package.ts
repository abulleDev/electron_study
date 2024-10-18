import { createWindowsInstaller } from 'electron-winstaller';
import { archiveFolder } from 'zip-lib';
import path from 'path';
import { author, description } from '../package.json';

const rootPath = path.join(__dirname, '..');
const outPath = path.join(rootPath, 'out');

async function packageWindows() {
  try {
    await createWindowsInstaller({
      appDirectory: path.join(outPath, `electron_study-win32-${process.arch}`),
      outputDirectory: outPath,
      authors: author,
      description: description,
      setupIcon: path.join(rootPath, './app/assets/icons/icon.ico'),
      noMsi: true,
    });
  } catch (error) {
    console.error(error);
  }
}
packageWindows();

async function packageMac() {
  try {
    await archiveFolder(
      path.join(outPath, `electron_study-darwin-${process.arch}`),
      path.join(outPath, `electron_study-darwin-${process.arch}.zip`)
    );
  } catch (error) {
    console.error(error);
  }
}
packageMac();
