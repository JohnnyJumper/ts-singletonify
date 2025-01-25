import { describe, it, expect } from "vitest";
import { Singleton, AsyncSingleton } from "../src";

describe("Singleton", () => {
  it("should work even without initialize", () => {
    class ExampleService {
      sayHello(): string {
        return "hello";
      }
    }
    const singleton = Singleton(ExampleService);
    const instance1 = singleton.getInstance();
    const instance2 = singleton.getInstance();
    expect(instance1).toBe(instance2);
    expect(instance1.sayHello()).toBe("hello");
  });

  it("should work with constructor", () => {
    class ExampleService {
      initialized: boolean = false;
      constructor() {
        this.initialized = true;
      }
    }
    const singleton = Singleton(ExampleService);
    const instance1 = singleton.getInstance();
    const instance2 = singleton.getInstance();
    expect(instance1).toBe(instance2);
    expect(instance1.initialized).toBe(true);
  });

  it("should work with initialize", () => {
    class ExampleService {
      initialized = false;
      initialize(): void {
        expect(this.initialized).toBe(false);
        this.initialized = true;
      }
    }
    const singleton = Singleton(ExampleService);
    const instance1 = singleton.getInstance();
    const instance2 = singleton.getInstance();
    expect(instance1).toBe(instance2);
    expect(instance1.initialized).toBe(true);
  });

  it("should work with initialize params", () => {
    const firstArg = "test";
    const secondArg = 12;
    class ExampleService {
      initialized = false;
      initialize(arg1: string, arg2: number): void {
        expect(this.initialized).toBe(false);
        expect(arg1).toBe(firstArg);
        expect(arg2).toBe(secondArg);
        this.initialized = true;
      }
    }
    const singleton = Singleton(ExampleService);
    const instance1 = singleton.getInstance("test", 12);
    const instance2 = singleton.getInstance("broom vroom", 89); // these doesn't matter since initialize will run only once on previous line
    expect(instance1).toBe(instance2);
    expect(instance1.initialized).toBe(true);
  });
});

describe("AsyncSingleton", () => {
  it("should work without initialize", async () => {
    class ExampleService {}
    const singleton = AsyncSingleton(ExampleService);
    const instance1 = await singleton.getInstance();
    const instance2 = await singleton.getInstance();
    expect(instance1).toBe(instance2);
  });
  it("should work with initialize", async () => {
    class ExampleService {
      initialized = false;

      async initialize(): Promise<void> {
        expect(this.initialized).toBe(false); // this will fail if initialize runs twice
        await new Promise((res) => setTimeout(res, 100));
        this.initialized = true;
      }
    }

    const singleton = AsyncSingleton(ExampleService);
    const instance1 = await singleton.getInstance();
    const instance2 = await singleton.getInstance();
    expect(instance1).toBe(instance2);
    expect(instance1.initialized).toBe(true);
  });

  it("should work with initialize params", async () => {
    const testValue1 = 5;
    const testValue2 = 10;
    class ExampleService {
      initialized = false;

      async initialize(arg1: number, arg2: number): Promise<void> {
        expect(this.initialized).toBe(false);
        expect(arg1).toBe(testValue1);
        expect(arg2).toBe(testValue2);
        await new Promise((res) => setTimeout(res, 100));
        this.initialized = true;
      }
    }
    const singleton = AsyncSingleton(ExampleService);
    const instance1 = await singleton.getInstance(testValue1, testValue2);
    const instance2 = await singleton.getInstance(2, 3);
    expect(instance1).toBe(instance2);
    expect(instance1.initialized).toBe(true);
  });
});
