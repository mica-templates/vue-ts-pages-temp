const glob = require('glob');

// 配置pages多页面获取当前文件夹下的html和js
exports.getEntry = function(globPath) {
  let entries = {},
    tmp,
    entry = '',
    htmls = {};

  glob.sync(globPath + 'html').forEach(function(entry) {
    tmp = entry.split('/').splice(-3);
    htmls[tmp[1]] = entry;
  });

  glob.sync(globPath + 'ts').forEach(function(path) {
    tmp = path.split('/').splice(-3);
    !~~tmp[2].indexOf('main') && (entry = path);
    entries[tmp[1]] = {
      entry,
      template: htmls[tmp[1]] ? htmls[tmp[1]] : 'index.html',
      title: tmp[1],
      filename: tmp[1] === 'index' ? 'index.html' : tmp[1] + '/index.html',
    };
  });
  return entries;
};
