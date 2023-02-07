import { spawn } from 'child_process';

const buildOutput = 'dist/netlify/';
const clearOutputDir = async () => await execCommand('rm -rf ' + buildOutput);
const createOutputDir = async () => await execCommand('mkdir ' + buildOutput);

clearOutputDir();
createOutputDir();
moveFiles('dist/apps/landing-page/*', buildOutput);
moveFiles('dist/apps/frontend', buildOutput + 'tournaments');

async function moveFiles(sourcePath: string, destinationPath: string) {
  await execCommand(`mv ${sourcePath} ${destinationPath}`);
}

export function execCommand(command: string) {
  return new Promise<void>((resolve, reject) => {
    console.log(command);
    const instance = spawn(command, [], { shell: true });
    instance.stdout.on('data', (stdout) => {
      process.stdout.write(stdout.toString());
    });
    instance.stderr.on('data', (stderr) => {
      console.error(stderr.toString());
    });
    instance.on('exit', (code) => {
      if (code !== 0) {
        console.error('exec error for cmd: ' + command);
        console.error('exec code: ' + code);
        process.exit(1);
        reject();
      } else {
        resolve();
      }
    });
  });
}
