---
sidebarDepth: 2
---

# TypeScript 概念

## TypeScript 的定义

[TypeScript](https://www.typescriptlang.org/)：是 JavaScript 的超集，拥有类型机制，不会再浏览器直接执行，而是编译成 JavaScript 后才会运行。

- 超集（superset）：比如 ES6 包含了 ES5 所有的内容，还有一些独特的语法特性，就可以理解为 ES6 是 ES5 的超集
- 类型：指的是静态的类型，js 中一个存放字符串的变量，后续依旧可以将数字、对象、数组等类型赋值到该变量，这是动态类型。而 ts 则是静态类型，后续不可更改类型

## TypeScript 带来的优势？

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

<br>
