import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前模块的文件路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前模块的目录名
const __dirname = path.dirname(__filename);

// Function to execute a script and return a promise
function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script ${scriptPath}:`, stderr);
        reject(error);
      } else {
        console.log(`Script ${scriptPath} executed successfully:`, stdout);
        resolve(stdout);
      }
    });
  });
}

// Main function to run all scraping tasks sequentially
async function runAllScrapingTasks() {
  try {
    const scripts = [
      path.join(__dirname, 'dealers', 'carInfo_amherst.js'),
      path.join(__dirname, 'dealers', 'carInfo_anchor.js'),
      path.join(__dirname, 'dealers', 'carInfo_bathurst.js'),
      path.join(__dirname, 'dealers', 'carInfo_breton.js'),
      path.join(__dirname, 'dealers', 'carInfo_central.js'),
      path.join(__dirname, 'dealers', 'carInfo_edmundston.js'),
      path.join(__dirname, 'dealers', 'carInfo_gander.js'),
      path.join(__dirname, 'dealers', 'carInfo_halifax.js'),
      path.join(__dirname, 'dealers', 'carInfo_kentville.js'),
      path.join(__dirname, 'dealers', 'carInfo_plazaNL.js'),
      path.join(__dirname, 'dealers', 'carInfo_south_shore.js'),
      path.join(__dirname, 'dealers', 'carInfo_summerside.js'),
      path.join(__dirname, 'dealers', 'carInfo_trimac.js'),
      path.join(__dirname, 'dealers', 'carInfo_truro.js'),
      path.join(__dirname, 'dealers', 'carInfo_woodstock.js'),
      path.join(__dirname, 'dealers', 'carInfo_dartmouth.js'),
      path.join(__dirname, 'dealers', 'carInfo_restigouche.js'),
      path.join(__dirname, 'dealers', 'carInfo_oregans_bridgewater.js'),
      path.join(__dirname, 'dealers', 'carInfo_fredericton.js'),
        
      
    ];

    for (const script of scripts) {
      await runScript(script);
    }

    console.log('All scripts executed successfully');
  } catch (error) {
    console.error('Error running scripts:', error);
  }
}

// Run all scraping tasks
runAllScrapingTasks();
