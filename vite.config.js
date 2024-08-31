const path = require('path');
export default {
    build: {
        rollupOptions: {
            input: {
                customizepractice: 'src/customizepractice.js',
                問診表: 'src/問診表.js',
                slack連携: 'src/slack連携.js',
            },
            output: {
                // format: 'iife', // 即時実行関数
                dir: 'dist', // 「dist」ディレクトリの下にビルド後のファイルを生成する
                entryFileNames: '[name].js', // 「bundle.js」というファイルが生成される
                inlineDynamicImports: false,
            },
        },
    },
};
