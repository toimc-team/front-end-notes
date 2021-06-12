---
sidebarDepth: 2
---

# 概念

## 什么是 TypeScript

[TypeScript](https://www.typescriptlang.org/)：是 JavaScript 的超集，拥有类型机制，不会再浏览器直接执行，而是编译成 JavaScript 后才会运行。

- 超集（superset）：比如 ES6 包含了 ES5 所有的内容，还有一些独特的语法特性，就可以理解为 ES6 是 ES5 的超集
- 类型：指的是静态的类型，js 中一个存放字符串的变量，后续依旧可以将数字、对象、数组等类型赋值到该变量，这是动态类型。而 ts 则是静态类型，后续不可更改类型

## TypeScript 的优势

通过一个例子（勾股定理），来体会 js 与 ts 的差异：

```javascript
// javascript
function demo(data) {
  return Math.sqrt(data.x ** 2 + data.y ** 2)
}
demo()
```

```typescript
// typescript---可以给它限制实参的类型
function tsDemo(data: { x: number; y: number }) {
  return Math.sqrt(data.x ** 2 + data.y ** 2)
}

tsDemo({ x: 1, y: 1 }) // 如果不传参数或参数类型不符，就会报错
```

下面列举 TypeScript 相比于 JavaScript 的显著优势：

1. 静态输入

静态类型化是一种功能，可以在开发人员编写脚本时检测错误。查找并修复错误是当今开发团队的迫切需求。有了这项功能，就会允许开发人员编写更健壮的代码并对其进行维护，以便使得代码质量更好、更清晰。

2. 大型的开发项目

有时为了改进开发项目，需要对代码库进行小的增量更改。这些小小的变化可能会产生严重的、意想不到的后果，因此有必要撤销这些变化。使用 TypeScript 工具来进行重构更变的容易、快捷。

3. 更好的协作

当发开大型项目时，会有许多开发人员，此时乱码和错误也会增加。类型安全是一种在编码期间检测错误的功能，而不是在编译项目时检测错误。这为开发团队创建了一个更高效的编码和调试过程。

4. 更强的生产力

干净的 ECMAScript 6 代码，自动完成和动态输入等因素有助于提高开发人员的工作效率。这些功能也有助于编译器创建优化的代码。
