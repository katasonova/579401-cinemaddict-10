const path = require(`path`);

module.exports = {
  mode: `development`,  // Режим сборки
  entry: `./src/main.js`,  // Точка входа приложения
  output: {  // Настройка выходного файла
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `sourcemap`,  // Подключаем sourcemaps
  devServer: {
    contentBase: path.join(__dirname, `public`),  // Где искать сборку
    publicPath: `http://localhost:8080/`,  // Веб адрес сборки
    compress: true,  // Сжатие
    watchContentBase: true
  }
};
