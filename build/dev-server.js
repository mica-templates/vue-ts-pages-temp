const { getEntry } = require('./util');
const exec = require('child_process').execSync;

const pages = getEntry('./src/pages/**/*.');

const inquirer = require('inquirer');

(async () => {
  const ps = Object.keys(pages).map(k => {
    const v = pages[k];
    v.name = k;
    return v;
  });
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: '此命令是单独启动某个模块。请选择，您要启动的模块！！',
      choices: ps.map((v, i) => {
        return {
          name: v.name,
          value: v,
        };
      }),
    },
  ]);

  exec(`cross-env NODE_MODULE=${action.name} npm run serve`, { stdio: 'inherit' });
})();
