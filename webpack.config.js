const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    cache: {
        type: "filesystem",
        buildDependencies: {
            // 更改配置文件时，重新缓存
            config: [__filename],
        },
    },
    entry: {
        index: path.resolve(__dirname, "./src_js/index.ts"),
        sw: path.resolve(__dirname, "./src_js/sw.ts"),
        sw_buffer: path.resolve(__dirname, "./src_js/sw_buffer.ts"),
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",
        filename: "[name].js",
    },

    resolve: {
        extensions: [".js", ".ts"],
        fallback: { crypto: false },
    },
    experiments: {
        syncWebAssembly: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["babel-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ["index"],
            template: path.resolve(__dirname, "./index.html"),
            filename: "index.html",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "./public/"),
                    to: "static/",
                },
            ],
        }),
    ],
};
