# 🚀 ts-singletonify

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
npm install ts-singletonify
```

Or using Yarn:

```
yarn add ts-singletonify
```

## 🚀 Usage

All you need is to pass your class to the Singleton function and it will singletonify your class. 
Any class should work, giving you full control over it. 

```ts
import { Singleton } from "ts-singletonify";

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
import { AsyncSingleton } from "ts-singletonify";

class ExampleService{
  initialize = false;
  async initialize(): Promise<void> {
    await new Promise((res) => setTimeout(res, 100));
    this.initialize = true
  }
}

// AsyncSingleton is a Promise that will attempt to run initialize().
const singleton = await AsyncSingleton(ExampleService)
const instance1 = singleton.getInstance();
const instance2 = singleton.getInstance();
console.log(instance1 === instance2);
```

**initialize function** can have any signature and accepts any parameters. 
You will need to pass these parameters into *Singleton* or *AsyncSingleton* function.

```ts
class ExampleService {
  initialized = false;

  async initialize(arg1: number, arg2: number): Promise<void> {
    await new Promise((res) => setTimeout(res, 100));
    this.initialized = true;
  }
}

//typescript will enforce the initialize signature with arg1: number and arg2: number to be passed to AsyncSingleton
const singleton = await AsyncSingleton(ExampleService, 2, 3);
const instance1 = singleton.getInstance();  
const instance2 = singleton.getInstance(); 
```

You can spread them as well ...[2,3] 

```ts
class ExampleService {
  initialized = false;

  async initialize(arg1: number, arg2: number): Promise<void> {
    await new Promise((res) => setTimeout(res, 100));
    this.initialized = true;
  }
}

const singleton = await AsyncSingleton(ExampleService, ...[2, 3]);
const instance1 = singleton.getInstance();  
const instance2 = singleton.getInstance();
console.log(instance1 === instance2) // true
console.log(instance1.initialized) // true
```

or just pass an object for readability
```ts
class ExampleService {
  initialized: boolean = false;
  params: { arg1: string; arg2: number[] };

  constructor() {
    this.initialized = true;
  }

  initialize(params: { arg1: string; arg2: number[] }) {
    this.params = {
      arg1: params.arg1,
      arg2: params.arg2,
    };
  }
}
const params = {
  arg1: "test",
  arg2: [123, 12],
};

// Singleton enforces params to be { arg1: string, arg2: number[] }
const singleton = Singleton(ExampleService, params);
const instance1 = singleton.getInstance();
const instance2 = singleton.getInstance();
```

***NOTE*** If you currently have a constructor that takes some arguments you will need to move this logic into the initialize function instead. If your constructor doesn't take any params it is alright to have some logic going on.

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
