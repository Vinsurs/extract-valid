interface ExtractValidOptions {
  /**
   * @default false
   */
  deep?: boolean;
  /**
   * @default true
   */
  respectEmptyArray?: boolean;
  /**
   * @default false
   */
  respectEmptyString?: boolean;
  /**
   * @default false
   */
  respectNaN?: boolean;
  /**
   * @default false
   */
  respectNull?: boolean;
  /**
   * @default false
   */
  respectUndefined?: boolean;
  /**
   * @default true
   */
  respectZero?: boolean;
  /**
   * Specify a predicate function to custom pick valid value you want up. This option takes precedence over other preset options.
   */
  respect?: (value: unknown) => boolean;
}
function isUndefined(value?: unknown): value is undefined {
  return value === undefined;
}
function isObject(value?: unknown): value is object {
  return !!value && Object.prototype.toString.call(value) === "[object Object]";
}
/** Extract valid field value from object scheme. */
export function extractValid<T extends Record<string, any>>(
  obj: T,
  options?: ExtractValidOptions,
): Partial<T> {
  if (!isObject(obj)) return obj;
  const keys = Object.keys(obj);
  if (keys.length === 0) return obj;
  options = Object.assign<ExtractValidOptions, ExtractValidOptions | undefined>(
    {
      deep: false,
      respectEmptyArray: true,
      respectEmptyString: false,
      respectNaN: false,
      respectNull: false,
      respectUndefined: false,
      respectZero: true,
    },
    options,
  );
  return keys.reduce((acc, key) => {
    const value = obj[key];
    if (typeof options.respect === "function") {
      const predicate = options.respect(value)
      if (predicate === true) {
        if (options.deep && isObject(value)) {
          // @ts-ignore
          acc[key] = extractValid(value, options);
        } else {
          // @ts-ignore
          acc[key] = value;
        }
        return acc;
      }
    }
    if (!options.respectUndefined && isUndefined(value)) {
      return acc;
    }
    if (!options.respectNull && value === null) {
      return acc;
    }
    if (
      !options.respectEmptyString &&
      typeof value === 'string' &&
      value.trim().length === 0
    ) {
      return acc;
    }
    if (
      !options.respectEmptyArray &&
      Array.isArray(value) &&
      value.length === 0
    ) {
      return acc;
    }
    if (!options.respectZero && value === 0) {
      return acc;
    }
    if (!options.respectNaN && Number.isNaN(value)) {
      return acc;
    }
    if (options.deep && isObject(value)) {
      // @ts-ignore
      acc[key] = extractValid(value, options);
    } else {
      // @ts-ignore
      acc[key] = value;
    }
    return acc;
  }, {} as Partial<T>);
}