import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scriptsDir = path.join(__dirname, 'dealers');
const outputDir = path.join(__dirname, 'output');

// 检查输出目录是否存在，如果不存在则创建
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// 获取所有的脚本文件
const scriptFiles = fs
  .readdirSync(scriptsDir)
  .filter((file) => file.endsWith('.js'));

// 依次执行每个脚本
(async () => {
  for (const file of scriptFiles) {
    const scriptPath = path.join(scriptsDir, file);
    const outputFileName = file.replace('.js', '.csv');
    const outputFilePath = path.join(outputDir, outputFileName);

    console.log(`正在执行 ${file} 并输出到 ${outputFileName}...`);
    await new Promise((resolve, reject) => {
      exec(`node ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`执行 ${file} 时出错: ${error.message}`);
          return reject(error);
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return reject(new Error(stderr));
        }
        console.log(`stdout: ${stdout}`);
        resolve();
      });
    });
  }

  console.log('所有脚本执行完毕');
})().catch((err) => {
  console.error('执行过程中发生错误:', err);
});
