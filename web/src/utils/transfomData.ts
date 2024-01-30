import { UseFormReturnType } from "@mantine/form";

export function getDirtyValues<T>(obj: T, form: UseFormReturnType<T>): Partial<T> {
  const dirtyValues: Partial<T> = {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "object" && !(value instanceof Date) && !Array.isArray(value)) {
      const nestedDirtyValues: Partial<typeof value> = {};
      const nestedObj = value;

      for (const nestedKey in nestedObj) {
        if (Object.prototype.hasOwnProperty.call(nestedObj, nestedKey)) {
          const nestedValue = nestedObj[nestedKey];

          if (form.isDirty(`${key}.${nestedKey}`)) {
            nestedDirtyValues[nestedKey] = nestedValue;
          }
        }
      }

      if (Object.keys(nestedDirtyValues).length > 0) {
        dirtyValues[key as keyof T] = {
          ...nestedObj
        };
      }
    } else if (form.isDirty(key)) {
      dirtyValues[key as keyof T] = value;
    }
  }

  return dirtyValues;
}
