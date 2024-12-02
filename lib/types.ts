export type ModifyField<Type, Key extends keyof Type, NewType> = Omit<Type, Key> & {
  [K in Key]: NewType;
};

export type AddField<Type, NewFieldName extends string, NewFieldType> = Type & {
  [K in NewFieldName]: NewFieldType;
};

export type NamedValue<T> = { title: string; value: T };
