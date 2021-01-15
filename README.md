# ncuhome-recruit-2017
2017 年招新项目，测试你最适合家园的哪一个组。
2020 年二次上线，重新更新了家园组别并做了数值策划。

## 技术相关

* 首先，这是一个原生 js 项目。
* 使用 VS code 的 Live Server 插件来修改 File 协议为 http 协议，而不是直接打开 html。
* 核心的逻辑在 app.js 当中。
* 数值 Max Min 测试在 test.py 文件中，为了防止用户选择出没有适合组别的结果。

## 动效相关
### 视察效果
[parallax.js](http://matthew.wagerfield.com/parallax/)
在 div 中添加 data-depth 属性，其定义的是该层的深度，数值越大代表运动的越激烈，"0.00" 为固定不动。

### Lottie 动画
bodymovin 是一个 AE 的插件，它可以把动画直接输出成为 Lottie 文件，直接放在各个终端上使用。 