// eslint-disable-next-line
module.exports = (function (env, argv) {
  return {
    plugins: [require("precss"), require("autoprefixer"), require("cssnano")],
  };
})();
