import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// 获取保存脚本的文件夹路径
const scriptsFolder = './dealers_backup'; // 修改为你的脚本文件夹路径

// 读取文件夹中的所有文件
fs.readdir(scriptsFolder, (err, files) => {
  if (err) {
    console.error('无法读取文件夹:', err);
    return;
  }

  // 过滤出所有以.js结尾的文件
  const jsFiles = files.filter((file) => file.endsWith('.js'));

  // 逐个运行每个.js文件
  jsFiles.forEach((file) => {
    const filePath = path.join(scriptsFolder, file);
    exec(`node ${filePath}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`运行脚本 ${file} 时出错:`, err);
        return;
      }
      if (stderr) {
        console.error(`脚本 ${file} 错误输出:`, stderr);
      }
      console.log(`脚本 ${file} 运行输出:`, stdout);
    });
  });
});
