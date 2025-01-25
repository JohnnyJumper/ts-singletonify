export type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K];
};

export type SingletonClass<T, TArgs extends any[] = []> = {
  getInstance: (...args: TArgs) => T;
};

export type AsyncSingletonClass<T, TArgs extends any[] = []> = Promisify<
  SingletonClass<T, TArgs>
>;

export interface Initializable<TArgs extends any[] = []> {
  initialize?: (...args: TArgs) => void | Promise<void>;
}

export type ExtractArgs<T> = T extends {
  initialize?: (...args: infer A) => any;
}
  ? A
  : [];

export interface Initializable<TArgs extends any[] = []> {
  initialize?: (...args: TArgs) => void | Promise<void>;
}

export function instanceInitializeGuard<T>(
  instance: T
): instance is T & { initialize: (...args: any[]) => void | Promise<void> } {
  return (
    typeof instance === "object" &&
    instance &&
    "initialize" in instance &&
    typeof instance.initialize === "function"
  );
}
