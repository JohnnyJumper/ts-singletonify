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
    const singleton = Singleton(ExampleService, firstArg, secondArg);
    const instance1 = singleton.getInstance();
    const instance2 = singleton.getInstance();
    expect(instance1).toBe(instance2);
    expect(instance1.initialized).toBe(true);
  });

  it("should work with initialize params as object", () => {
    const firstArg = "test";
    const secondArg = 12;
    class ExampleService {
      initialized = false;
      initialize(params: { firstArg: string; secondArg: number }): void {
        expect(this.initialized).toBe(false);
        expect(params.firstArg).toBe(firstArg);
        expect(params.secondArg).toBe(secondArg);
        this.initialized = true;
      }
    }
    const singleton = Singleton(ExampleService, { firstArg, secondArg });
    const instance1 = singleton.getInstance();
    const instance2 = singleton.getInstance();
    expect(instance1).toBe(instance2);
    expect(instance1.initialized).toBe(true);
  });

  it("should work with initialize and constructor argumentless logic", () => {
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
    const singleton = Singleton(ExampleService, params);
    const instance1 = singleton.getInstance();
    const instance2 = singleton.getInstance();
    expect(instance1).toBe(instance2);
    expect(instance1.initialized).toBe(true);
    expect(instance1.params).toStrictEqual(params);
  });
});

describe("AsyncSingleton", () => {
  it("should work without initialize", async () => {
    class ExampleService {}
    const singleton = await AsyncSingleton(ExampleService);
    const instance1 = singleton.getInstance();
    const instance2 = singleton.getInstance();
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

    const singleton = await AsyncSingleton(ExampleService);
    const instance1 = singleton.getInstance();
    const instance2 = singleton.getInstance();
    expect(instance1).toBe(instance2);
    expect(instance1.initialized).toBe(true);
  });

  it("should work with initialize params", async () => {
    const testValue1 = 5;
    const testValue2 = 10;
    class ExampleService {
      initialized = false;

      async initialize(params: {
        testValue1: number;
        testValue2: number;
      }): Promise<void> {
        expect(this.initialized).toBe(false);
        expect(params.testValue1).toBe(testValue1);
        expect(params.testValue2).toBe(testValue2);
        await new Promise((res) => setTimeout(res, 100));
        this.initialized = true;
      }
    }
    const singleton = await AsyncSingleton(ExampleService, {
      testValue1,
      testValue2,
    });
    const instance1 = singleton.getInstance();
    const instance2 = singleton.getInstance();
    expect(instance1).toBe(instance2);
    expect(instance1.initialized).toBe(true);
  });

  it("should work with initialize params as object", async () => {
    const firstArg = "test";
    const secondArg = 12;
    class ExampleService {
      initialized = false;
      async initialize(params: {
        firstArg: string;
        secondArg: number;
      }): Promise<void> {
        expect(this.initialized).toBe(false);
        expect(params.firstArg).toBe(firstArg);
        expect(params.secondArg).toBe(secondArg);
        this.initialized = true;
      }
    }
    const singleton = await AsyncSingleton(ExampleService, {
      firstArg,
      secondArg,
    });
    const instance1 = singleton.getInstance();
    const instance2 = singleton.getInstance();
    expect(instance1).toBe(instance2);
    expect(instance1.initialized).toBe(true);
  });

  it("should work with initialize and constructor argumentless logic", async () => {
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
    const singleton = await AsyncSingleton(ExampleService, params);
    const instance1 = singleton.getInstance();
    const instance2 = singleton.getInstance();
    expect(instance1).toBe(instance2);
    expect(instance1.initialized).toBe(true);
    expect(instance1.params).toStrictEqual(params);
  });
});
