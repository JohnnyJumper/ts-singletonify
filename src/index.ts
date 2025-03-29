import { ExtractArgs, SingletonClass, instanceInitializeGuard } from "./types";

function Singleton<T, TArgs extends ExtractArgs<T>>(
  Base: new () => T,
  ...args: TArgs
): SingletonClass<T> {
  abstract class SingletonBase {
    private static instance: T;

    protected constructor() {}

    public static getInstance(): T {
      if (!this.instance) {
        this.instance = new Base();
      }
      return this.instance;
    }
  }

  const instance = SingletonBase.getInstance();
  if (instanceInitializeGuard(instance)) {
    instance.initialize?.(...args);
  }
  return SingletonBase;
}

async function AsyncSingleton<T, TArgs extends ExtractArgs<T>>(
  Base: new () => T,
  ...args: TArgs
): Promise<SingletonClass<T>> {
  abstract class SingletonBase {
    private static instance: T;

    protected constructor() {}

    public static getInstance(): T {
      if (!this.instance) {
        this.instance = new Base();
      }
      return this.instance;
    }
  }
  const instance = SingletonBase.getInstance();
  if (instanceInitializeGuard(instance)) {
    await instance.initialize(...args);
  }
  return SingletonBase;
}

export { Singleton, AsyncSingleton, SingletonClass };
