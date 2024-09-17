const path = require('path');
export default {
    build: {
        rollupOptions: {
            input: {
                customizepractice: 'src/customizepractice.js',
                問診表: 'src/問診表.mjs',
                slack連携: 'src/slack連携.js',
                カスタマイズビュー: 'src/カスタマイズビュー.js',
                API試す用: 'src/API試す用.js',
                在庫管理: 'src/在庫管理.js',
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
