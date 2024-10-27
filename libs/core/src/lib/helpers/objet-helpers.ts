  export type AnyObject = Record<string, any>;
  export type AnyArray = unknown[];
  export type AnyObjectOrArray = AnyObject | AnyArray;
  export type MapBool<I = any> = (item: I, index?: number, array?: I[]) => boolean;


  export const omit = (mapper: MapBool) => <T extends AnyObjectOrArray>(object: T): T => (
    Array.isArray(object)
      ? object.filter(mapper)
      : typeof object === 'object' ? Object.fromEntries(Object.entries(object).filter(([, value]) => mapper(value))) : {}
  ) as T;
  
  export const removeUndefined = omit((value) => value !== undefined);
  export const removeNullish = omit((value) => value !== null);
  
  export const undefinder = <T>(condition: boolean, rtr: T) => {
    return condition ? rtr : undefined;
  }
  
  export const definePathInObject = <T>(obj: Record<string | number | symbol, any>, key: string, finalValue?: T) => {
    let currentObj = obj
    const keys = key.split('.')
    for (const key of keys) {
      if (!currentObj[key]) {
        currentObj[key] = {};
      }
      currentObj = currentObj[key];
    }
    const finalKey = keys[keys.length - 1];
    currentObj[finalKey] = finalValue !== undefined ? finalValue : {};
    return currentObj;
  }