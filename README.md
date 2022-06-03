# 微言码道跨平台桌面客户端
这个项目是微言码道基于myddd-electron的跨平台桌面客户端。它同时也是myddd-electron的配套示例项目，用于演示myddd-electron具体的实现是怎么样的。

由于这只是一个示例项目，所以功能上只做了微言码道的博客列表及博客显示两个功能，但我认为它足以说明myddd-electron是如何使用的。

## 关键技术

myddd-electon是myddd基于electron在跨平台桌面开发的开源框架，它是领域驱动风格在前端的应用。

主要使用的核心前端技术为：

* 编程语言：TypeScript
* 前端框架：React
* 构建工具：Webpack + SWC
* 数据库： 基于SQLITE 的自封装的框架
* 网络： Axios
* 依赖注入实现： 微软的tsyringe
* 前端CSS： tailwindcss

## 核心实现能力说明

基于微言码道后端API，这个应用程序实现了：

* 从服务器增量拉取博客列表，并保存至本地SQLite数据库
* 访问博客文章时，当本地不存在时，下载文章内容至本地文件

所以，仅就实现的功能上来说，已经足够说明一个桌面客户端需要最关心的数据库，文件存储，网络等了。

## 程序效果图

实际运行的程序效果如下：

![](https://images.taoofcoding.tech/2022/06/taoofcoding-desktop-1.png)

