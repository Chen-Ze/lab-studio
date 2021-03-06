import { NonFunctionKeys, NonUndefined } from 'utility-types';

export function sharedUtilTypes(): string {
  return 'shared-util-types';
}

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};
type AllowedNames<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];

export type SubType<Base, Condition> = Pick<
  Base,
  AllowedNames<Base, Condition>
>;

export type AllowedKeys<T extends object, Condition> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Condition ? K : never;
}[keyof T];

export type ConvertLeafType<T, TFrom, TTo> = T extends TFrom
  ? TFrom extends T
    ? TTo
    : {
        [key in keyof T]: ConvertLeafType<T[key], TFrom, TTo>;
      }
  : {
      [key in keyof T]: ConvertLeafType<T[key], TFrom, TTo>;
    };

export interface Typed<T> {
  _type: string;
  data: T;
}

export function encodeType<T>(_type: string, data: T): Typed<T> {
  return {
    _type,
    data,
  };
}

export function decodeType<T>(dataTyped: Typed<T>): T {
  return dataTyped.data;
}

export function getTypeName(dataTyped: Typed<unknown>) {
  return dataTyped._type;
}
