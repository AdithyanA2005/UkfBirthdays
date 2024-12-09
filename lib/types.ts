export type ModifyField<Type, Key extends keyof Type, NewType> = Omit<Type, Key> & {
  [K in Key]: NewType;
};

export type AddField<Type, NewFieldName extends string, NewFieldType> = Type & {
  [K in NewFieldName]: NewFieldType;
};

export type NamedValue<T> = { title: string; value: T };

export enum Theme {
   Slate = "slate",
   Gray = "gray",
   Zinc = "zinc",
   Neutral = "neutral",
   Stone = "stone",
   Red = "red",
   Orange = "orange",
   Amber = "amber",
   Yellow = "yellow",
   Lime = "lime",
   Green = "green",
   Emerald = "emerald",
   Teal = "teal",
   Cyan = "cyan",
   Sky = "sky",
   Blue = "blue",
   Indigo = "indigo",
   Violet = "violet",
   Purple = "purple",
   Fuchsia = "fuchsia",
   Pink = "pink",
   Rose = "rose",
}