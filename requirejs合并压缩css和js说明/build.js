({
  appDir: "./", // 项目目录
  baseUrl: "js", // 基本目录
  dir: "./dist", // 输出目录
  fileExclusionRegExp: /^(r|build|buildCss)\.js|scss|.idea|.sass-cache$/, // 不复制到输出目录
  removeCombined: true, // 是否删除合并的源文件
  paths: {// 要合并的模块的路径
    jquery: 'empty:', //跳过该文件
    template: '../lib/template-simple'
  },
  modules: [{ // 要合并的模块
    name: "main",
    excludeShallow:[ // 不要合并的文件
      "data", "datae"
    ]
  }]
})