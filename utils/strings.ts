
export const pluralize = (text: string, length: number) => {
   return length > 1 ? `${text}s` : text;
};