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
