export type Promisify<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[K];
};

export type SingletonClass<T> = {
  getInstance: () => T;
};

export type ExtractArgs<T> = T extends {
  initialize?: (...args: infer A) => any;
}
  ? A extends []
    ? never[]
    : A
  : never[];

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
