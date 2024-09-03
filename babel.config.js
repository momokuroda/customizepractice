module.exports = function (api) {
    api.cache(true);
    const presets = [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'entry',
                corejs: 3,
            },
        ],
        '@babel/preset-react',
        '@babel/typescript',
    ];
    const plugins = [
        ['@babel/proposal-class-properties'],
        [
            '@babel/plugin-transform-for-of',
            {
                assumeArray: true, // defaults to false
            },
        ],
    ];
    return {
        presets,
        plugins,
    };
};
