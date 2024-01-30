import { ArtistFormData } from "@/utils/data";

export function handleTransformSubmittedValues(values: ArtistFormData) {
  const transformedValues = {
    ...values,
    name: values.name.trim(),
    about: values.about.trim()
  };
  return transformedValues;
}
