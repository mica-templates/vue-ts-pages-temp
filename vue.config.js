const { getEntry } = require('./build/util');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const resolve = dir => path.join(__dirname, dir);

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

let pages = getEntry('./src/pages/**/*.');

NODE_MODULE = process.env.NODE_MODULE;
const devServer = {
  open: false,
  port: 8088,
  https: false,
  index: 'index.html',
  hotOnly: false,
};

if (NODE_MODULE) {
  pages = {
    [NODE_MODULE]: pages[NODE_MODULE],
  };
  devServer.index = pages[NODE_MODULE].filename;
}

module.exports = {
  pages,
  publicPath: './',
  assetsDir: 'static',
  outputDir: 'dist',
  chainWebpack: config => {
    // 修复HMR
    config.resolve.symlinks(true);

    // img排除svg
    config.module
      .rule('images')
      .exclude.add(resolve('src/assets/icon/svg'))
      .add(resolve('src/pages/**/icon/svg'))
      .end()
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 40000;
        return options;
      });

    // svg 添加 svg-sprite-loader
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.include
      .add(resolve('src/assets/icon/svg'))
      .add(resolve('src/pages/**/icon/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon__[name]',
      });

    // 别名
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src/'))
      .set('@$', resolve('src/pages/'))
      .set('static', resolve('public/'));
  },
  configureWebpack: config => {
    const plugins = [];
    // config.externals = {
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex',
    //   axios: 'axios',
    // };
    if (process.env.IS_ANALYZ && IS_PROD) {
      plugins.push(new BundleAnalyzerPlugin());
    }
    if (process.env.IS_GZIP && IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  css: {
    modules: false,
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        data: `
        @import "@/styles/config.scss";
        @import "@/styles/variables.scss";
        @import "@/styles/mixins.scss";
        @import "@/styles/utils.scss";
        $src: "${process.env.VUE_APP_OSS_SRC}";
        `,
      },
    },
  },
  parallel: require('os').cpus().length > 1,
  devServer,
};
