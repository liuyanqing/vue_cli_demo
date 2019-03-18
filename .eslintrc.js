/**
 "off" or 0 - turn the rule off
 "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
 "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
*/
module.exports = {
  "rules": {
    "for-direction": 2,
    "getter-return": 2,
    "no-await-in-loop": 2, // Disallow await inside of loops
    "no-compare-neg-zero": 2, // 不要出现负零，即 -0
    "no-cond-assign": 2, // 条件语句中，不应该出现 = ，比如 if (x = 2) {  } 是会报错的
    "no-console": 0, // 是否允许 console
  },
  "root": true, // 设置他后，子的js文件找到该 eslint配置文件后，则不再向上查找其他eslint配置文件
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "plugins": [
    "html"
  ]
};
