# 🚀 ts-singleton

![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue)
![Tests](https://github.com/JohnnyJumper/ts-singleton/actions/workflows/tests.yml/badge.svg)

A TypeScript utility to enforce singleton instances in your applications.

## ✨ Features

- ✅ Simple API for creating singleton classes
- 🔒 Strict TypeScript enforcement
- 🔄 Works seamlessly with ES2020 and CommonJS modules
- 🧪 Fully tested with Vitest

## 📦 Installation

To install using npm:

```
npm install ts-singleton
```

Or using Yarn:

```
yarn add ts-singleton
```

## 🚀 Usage

All you need is to pass your class to the Singleton function and it will singletonify your class. 
Any class should work, giving you full control over it. 

```ts
import { Singleton } from "ts-singleton";

class ExampleService {
  sayHello(): string {
    return "hello";
  }
}

const singleton = Singleton(ExampleService);
const instance1 = singleton.getInstance();
const instance2 = singleton.getInstance();

console.log(instance1 === instance2); // true
console.log(instance1.sayHello()); // "hello"
```
You can also specify the initialize function within your class and Singleton will pick it up and make sure it is run after instance is created:


```ts
class ExampleService {
  initialized = false;
  // This has to be named initialize
  initialize(): void {
    // some logic to perform the initialization 
    this.initialized = true;
  }
}
const singleton = Singleton(ExampleService);
const instance1 = singleton.getInstance();
const instance2 = singleton.getInstance();
expect(instance1).toBe(instance2);
expect(instance1.initialized).toBe(true);
```

Use **AsyncSingleton** for async initialization functions:

```ts
class ExampleService{
  initialize = false;
  async initialize(): Promise<void> {
    await new Promise((res) => setTimeout(res, 100));
    this.initialize = true
  }
}

const singleton = AsyncSingleton(ExampleService)
const instance1 = await singleton.getInstance();
const instance2 = await singleton.getInstance();
console.log(instance1 === instance2);
```

**initialize function** can have any signature and accepts any parameters. You will need to pass these parameters into getInstance to get the instance.

```ts
class ExampleService {
  initialized = false;

  async initialize(arg1: number, arg2: number): Promise<void> {
    await new Promise((res) => setTimeout(res, 100));
    this.initialized = true;
  }
}
const singleton = AsyncSingleton(ExampleService);
//typescript will enforce the initialize signature with arg1: number and arg2: number
const instance1 = await singleton.getInstance(2, 3);  
const instance2 = await singleton.getInstance(); // X -> will complain
expect(instance1).toBe(instance2);
```

***NOTE*** If you currently have a constructor that takes some arguments you will need to move this logic into the initialize function instead and pass arguments to getInstance. If your constructor doesn't take any params it is alright to have some logic going on.

## ⚙️ Build

To compile the TypeScript code:

```
npm run build
```

## 🧪 Testing

Run unit tests using Vitest:

```
npm test
```

Run tests in watch mode:

```
npm run test:watch
```

Check coverage:

```
npm run coverage
```
