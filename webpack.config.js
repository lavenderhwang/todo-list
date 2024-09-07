const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // This ensures the 'dist' folder is cleared before each build
    assetModuleFilename: "assets/[name][ext]", // Assets will be placed in the 'assets' folder in 'dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Webpack will inject the assets into this HTML file
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource", // Handles loading image files
      },
      {
        test: /\.css$/, // If you're using CSS, you might need this as well
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
