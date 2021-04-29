---
sidebar: auto
---

# TypeScript

## TypeScript 的定义

[TypeScript](https://www.typescriptlang.org/)：是 JavaScript 的超集，拥有类型机制，不会再浏览器直接执行，而是编译成 JavaScript 后才会运行。

- 超集（superset）：比如 ES6 包含了 ES5 所有的内容，还有一些独特的语法特性，就可以理解为 ES6 是 ES5 的超集
- 类型：指的是静态的类型，js 中一个存放字符串的变量，后续依旧可以将数字、对象、数组等类型赋值到该变量，这是动态类型。而 ts 则是静态类型，后续不可更改类型

## TypeScript 带来的优势？

通过一个例子（勾股定理），来体会 js 与 ts 的差异：
```javascript
// javascript
function demo (data) {
  return Math.sqrt(data.x ** 2 + data.y ** 2)
}
demo()
```
```typescript
// typescript---可以给它限制实参的类型
function tsDemo (data: { x: number, y: number }) {
  return Math.sqrt(data.x ** 2 + data.y ** 2)
}

tsDemo({ x: 1, y: 1 }); // 如果不传参数或参数类型不符，就会报错
```


<br>

## 配置 TS 环境

我们知道：.ts 文件是不可以直接执行的，需要转换成 .js 文件，才能够进行运行。那现在就开始配置 TypeScript 的环境吧 ：
```bash
# npm 全局安装 TypeScript
$ npm install typescript -g
# 将ts文件转换成js文件
$ ts demo.ts
# 通过node 运行js文件
$ node demo.js
```
上方的例子分为了两步（先转换在运行），可以通过npm（ts-node），来进行合并操作：
```bash
$ npm install ts-node -g
# 直接进行运行
$ ts-node demo.ts
```

## 静态类型的深度理解

```typescript
/** count
 * 不可以为其他类型
 * 编辑器会提示数字类型的所有方法
 */
const count: number = 2021
```

## 基础类型和对象类型

**基础类型：** boolean, number, string, void, undefined, symbol, null <br>
**对象类型：** {}, Class, function, []

```typescript
// 对象类型
class Person { }

const teacher: {
  name: string,
  age: number
} = {
  name: 'Zws',
  age: 18
}

const numbers: number[] = [1, 2, 3]

const zws: Person = new Person()


// 对象类型-函数的两种写法儿
// 第一种(可以忽略 number，类型推断会推断出返回值是number)
const func = (str: string): number => {
  return parseInt(str, 10)
}
// 第二种(可以理解为：冒号后面跟的是函数的类型，等号后面是函数体。不能忽略number，不然语法错误)
const func1: (str: string) => number = (str) => {
  return parseInt(str, 10)
}
```

## 类型注解和类型推断

类型推断(type inference)：TS 会自动的去尝试分析变量的类型。例如：
```typescript
// 这就是典型的类型推断，它们的类型是 number 而且值永远都不会变的
const firstnumber = 1;
const secondNumber = 2;
const total = firstNumber + secondNumber;
```
类型注解(type annotation) ：告诉 TS 变量是什么类型。例如：
```typescript
// 当 TS 无法推断出变量类型的时候需要添加类型注解
function getTotal (firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber
}
const total = getTotal(1, 2)

// 其他的情况
interface Person {
  name: string
}
const rawData = '{"name": "zws"}'
const newData: Person = JSON.parse(rawData)

// 一个变量是一个数字类型，后续要变成字符串。类似或运算符
let temp: number | string = 123;
temp = '456'
```

## 函数相关类型

```typescript
// void类型：没有返回值
function sayHello (): void {
  console.log('hello');
}
// never类型：函数执行不完
function errorEmitter(): never {
  while (true){}
}
// 函数的解构赋值
function add ({ first, second }: { first: number, second: number }): number {
  return first + second
}
add({ first: 1, second: 2 })
```

## 数组和元组

### 数组

```typescript
// 数组可以是数字和字符串类型
const numberArr: (string | number)[] = [1, 2, 3]
// undefined 数组
const undefinedArr: undefined[] = [undefined, undefined, undefined]

// 存储对象类型的内容
const objectArr: { name: string, age: number }[] = [{
  name: 'zws',
  age: 18
}]
// 使用类型别名(type alias) 
type User = { name: string, age: number }
// 存储对象类型的内容
const objectArr: User[] = [{
  name: 'zws',
  age: 18
}]

// 关于 Class
class Teacher {
  name: string;
  age: number;
}
const objectArr: Teacher[] = [
  new Teacher(),
  {
    name: 'zws',
    age: 18
  }
]
```

### 元组 tuple

数组长度和类型都固定的情况下，可以使用元组进行管理
```typescript
const teacherInfo: [string, string, number] = ['zws', 'jon', 18]

const teacherList: [string, string, number][] = [
  ['zws', 'jon', 18],
  ['sun', 'dea', 22],
  ['za2', 'wall', 26]
]
```

## Interface 接口

[关于Interface代码](https://gitee.com/zblh/typescript/blob/master/interface.ts)
interface 和 type 相类似，但不完全一致。type 可以校验基础类型。而 Interface 不支持基础类型的校验。TS 里，能使用Interface的话就使用Interface

### 关于 interface：

- 接口只是 TS 帮助我们校验的工具，并不会变成 JS
- 属性前加上?，代表该变量可有可无
- 属性前加上readonly，代表只读不可修改
```typescript
interface Pereson {
  name: string
  age?: number
  readonly test: string
}
const getPersonName = (person: Pereson) => {
  console.log(person.name)
}

const setPersonName = (person: Pereson, name: string): void => {
  person.name = name
}

const person = {
  name: 'zws',
  age: 18,
  sex: 'male',
}

getPersonName(person)
setPersonName(person, 'lin')

```

- 如果以字面量的形式传给函数，TS 会进行强校验。例如：

```typescript
interface Pereson {
  name: string
  age?: number
}
const getPersonName = (person: Pereson) => {
  console.log(person.name)
}

const setPersonName = (person: Pereson, name: string): void => {
  person.name = name
}

const person = {
  name: 'zws',
  age: 18,
  sex: 'male',
}

getPersonName({
  name: 'zws',
  age: 18,
  sex: 'male'
}) // 会报错，sex不在 Person 种
setPersonName(person, 'lin')

// 修改 Interface 解决（最后一行代表的是，可以是任何字符串类型的键，任何值）
interface Pereson {
  name: string
  age?: number
  [propName: string]: any
}
```

- Interface 里支持方法的写入
```typescript
interface Pereson {
  name: string
  age?: number
  say(): string
}
const person = {
  name: 'zws',
  say() {
    return 'say hello'
  }
}
```

- class类应用接口
```typescript
interface Pereson {
  name: string
  age?: number
  say(): string
}
// 语法 implements
class User implements Pereson {
  name = 'zws'
  say() {
    return 'say hello'
  }
}
```

- 接口之间互相继承
```typescript
// 关键字 extends
interface Teacher extends Pereson {}
```

- 接口定义函数
```typescript
interface SayHi {
  (word: string): string
}
const say: SayHi = (word: string) => {
  return word
}
```

### 使用 interface 实现公用

```typescript
interface Person {
  name: string
}
interface Teacher extends Person {}
interface Student extends Person {
  age: number
}
const teacher = {
  name: 'zws'
}
const student = {
  name: 'has',
  age: 18
}
const getUserInfo = (user: Person) => {
  console.log(user.name)
}
getUserInfo(teacher)
getUserInfo(student)
```

## class-类

### 类的定义与继承

[关于类的定义与继承代码](https://gitee.com/zblh/typescript/blob/master/class.ts)
```typescript
// 类里写属性与方法
class Person {
  name = 'zws'
  getName() {
    return this.name
  }
}
const person = new Person()
console.log(person.getName()) // zws

// 继承类，继承类属于字类，被继承的属于父类
class Teacher extends Person {
  getTeacherName() {
    return 'zws Teacher'
  }
  // 子类可以重写父类的属性与方法
  getName() {
    // super 关键字指向了父类，可以直接调用父类。不会受到类重写的影响
    return super.getName() + 'TTT'
  }
}

const teacher = new Teacher()
console.log(teacher.getName()) // zws
console.log(teacher.getTeacherName()) // zws Teacher

```
### 类的访问类型和构造器

#### 访回类型：

- private：允许在类内使用
- protected：允许在类内及继承的子类中使用
- public：允许在类的内外调用（默认）

#### 自带方法：

- readonly：只读属性
- static：将方法挂载到类上而不是实例上

**tips: **直接写在类里的属性或函数，相当于前面加了public
```typescript
class Person {
  protected name: string = '123'
  private age: number = 10
  public sayHi() {
    console.log('hi' + this.age)
  }
}
class Teacher extends Person {
  public sayBye() {
    return this.name
  }
}
const person = new Person()
person.sayHi()
const teacher = new Teacher()
console.log(teacher.sayBye())

```

#### 构造器 constructor

**constructor** 会在 new 实例的时候自动执行
```typescript
// 以下两段代码相同, constructor 里,参数前加上public代表在之前已经声明过这个变量了
// 传统写法
class Person {
  public name: string
  constructor(name: string) {
    this.name = name
  }
}
const person = new Person('zws')
// 简化写法
class Person {
  // public name: string
  constructor(public name: string) {
    // this.name = name
  }
}
const person = new Person('zws')
console.log(person.name)
```
字类集成父类并使用 **constructor** 的话,必须先调用父类的 **constructor** ,并按照父类的参数规则进行
```typescript
// super()代表调用父类的 constructor
// 如果父类没有使用constructor 字类需要调用一个空的super()
class Person {
  constructor(public name: string) {}
}

class Teacher extends Person {
  constructor(public age: number) {
    super('zws')
  }
}

const teacher = new Teacher(28)
```

### 静态属性，Setter和Getter

Getter：
Setter：
```typescript
// 可以通过getter访问私有属性,通过setter更改私有属性
// 一般用于对数据的加密
class Person {
  constructor(private _name: string) {}
  get name() {
    return this._name + ' has'
  }
  set name(name: string) {
    const realName = name.split(' ')[0]
    this._name = realName
  }
}
const person = new Person('zws')
console.log(person.name)
person.name = 'zwsa has'
console.log(person.name)
```

#### 做个小案例

通过 TS 创建一个 Demo 类,这个类只能被调用一次
**思路:**

- 不能在外部以new Demo 的形式创建一个实例（将 **constructor** 设置为私有属性）
- 使用 static (将方法挂载到类上而不是实例上)来实现
- 使用 instance 方法来保存传入的值,并判断
```typescript
class Demo {
  private constructor(public name: string) {}

  private static instance: Demo
  static getInstance(name: string) {
    if (!this.instance) {
      this.instance = new Demo(name)
    }
    return this.instance
  }
}
const demo1 = Demo.getInstance('zws')
const demo2 = Demo.getInstance('zwsa')
console.log(demo1.name)
console.log(demo2.name)
```

### 抽象类

- 只能被继承，不能实例化
- 抽象类里的抽象方法，不能够写具体实现
```typescript
abstract class Gemo {
  width: number
  getType() {
    return 'Gemo'
  }
  abstract getArea(): number
}
class Cricle extends Gemo {
  // 字类继承了抽象类，里面的抽象方法必须实现一下
  getArea() {
    return 123
  }
}
class Square {}
class Triangle {}
```


