export class AssertionError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'AssertionError';
  }
}

/**
 * 断言函数, 当断言条件为 falsy 时抛出 `AssertionError`, 支持 Typescript 类型断言
 * @param condition 断言条件, 断言条件将影响之后代码的类型推断
 * @param message 自定义错误信息
 *
 * @example
 * ```ts
 * const numOrString: string | number = 2;
 * assert(typeof numOrString === 'number')
 * // 此时变量类型将自动被推断为 number
 * numOrString++;
 * ```
 */
export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new AssertionError(message);
  }
}
