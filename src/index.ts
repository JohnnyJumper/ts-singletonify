import {
  ExtractArgs,
  SingletonClass,
  AsyncSingletonClass,
  instanceInitializeGuard,
} from "./types";

function Singleton<T, TArgs extends any[] = ExtractArgs<T>>(
  Base: new () => T
): SingletonClass<T, TArgs> {
  abstract class SingletonBase {
    private static instance: T;

    protected constructor() {}

    public static getInstance(...args: TArgs): T {
      if (!this.instance) {
        this.instance = new Base();
        if (instanceInitializeGuard(this.instance)) {
          this.instance.initialize?.(...args);
        }
      }
      return this.instance;
    }
  }
  return SingletonBase;
}

function AsyncSingleton<T, TArgs extends any[] = ExtractArgs<T>>(
  Base: new () => T
): AsyncSingletonClass<T, TArgs> {
  abstract class SingletonBase {
    private static instance: T;

    protected constructor() {}

    public static async getInstance(...args: TArgs): Promise<T> {
      if (!this.instance) {
        this.instance = new Base();
        if (instanceInitializeGuard(this.instance)) {
          await this.instance.initialize(...args);
        }
      }
      return this.instance;
    }
  }
  return SingletonBase;
}

export { Singleton, AsyncSingleton };
