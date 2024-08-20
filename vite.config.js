export default {
    build: {
        rollupOptions: {
            input: { customizepractice: 'src/customizepractice.js' }, // 「vite-kintone.js」 を起点にビルドする
            output: {
                format: 'iife', // 即時実行関数
                dir: 'dist', // 「dist」ディレクトリの下にビルド後のファイルを生成する
                entryFileNames: '[name].js', // 「bundle.js」というファイルが生成される
            },
        },
    },
};
