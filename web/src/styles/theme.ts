"use client";
import {
  Checkbox,
  MultiSelect,
  NumberInput,
  Select,
  TextInput,
  Textarea,
  VariantColorsResolver,
  createTheme,
  defaultVariantColorsResolver
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  if (input.variant === "outline") {
    return {
      background: "transparent",
      border: "1px solid var(--mantine-color-primary-pink-5)",
      color: "var(--mantine-color-primary-pink-5)",
      hover: "var(--mantine-color-primary-pink-5)",
      hoverColor: "var(--mantine-color-gray-0)"
    };
  }

  if (input.variant === "default" || input.variant === "filled") {
    return {
      background: "var(--mantine-color-primary-pink-5)",
      border: "1px solid var(--mantine-color-primary-pink-5)",
      color: "var(--mantine-color-gray-0)",
      hover: "var(--mantine-color-primary-pink-6)",
      hoverColor: "var(--mantine-color-gray-0)"
    };
  }

  if (input.variant === "subtle") {
    return {
      background: "transparent",
      border: "none",
      color: "var(--mantine-color-gray-0)",
      hover: "var(--mantine-color-dark-7)"
    };
  }

  return defaultResolvedColors;
};

export const theme = createTheme({
  fontFamily: "Inter, sans-serif",
  primaryColor: "primary-pink",
  primaryShade: { light: 5, dark: 6 },
  colors: {
    "primary-pink": [
      "#F8B3E5",
      "#F58ED8",
      "#F369CC",
      "#F044BF",
      "#E21CA8",
      "#F231A5",
      "#DA0D89",
      "#95006E",
      "#72005D",
      "#4F004C"
    ]
  },
  variantColorResolver,
  components: {
    TextInput: TextInput.extend({
      styles: {
        root: { color: "var(--mantine-color-gray-0)" },
        input: { color: "var(--mantine-color-gray-0)" },
        label: { color: "var(--mantine-color-gray-0)" }
      }
    }),
    TextArea: Textarea.extend({
      styles: {
        root: { color: "var(--mantine-color-gray-0)" },
        input: { color: "var(--mantine-color-gray-0)" },
        label: { color: "var(--mantine-color-gray-0)" }
      }
    }),
    Select: Select.extend({
      styles: {
        root: { color: "var(--mantine-color-gray-0)" },
        input: { color: "var(--mantine-color-gray-0)" },
        options: { color: "var(--mantine-color-gray-0)" },
        label: { color: "var(--mantine-color-gray-0)" }
      }
    }),
    MultiSelect: MultiSelect.extend({
      styles: {
        root: { color: "var(--mantine-color-gray-0)" },
        input: { color: "var(--mantine-color-gray-0)" },
        options: { color: "var(--mantine-color-gray-0)" },
        label: { color: "var(--mantine-color-gray-0)" }
      }
    }),
    NumberInput: NumberInput.extend({
      styles: {
        root: { color: "var(--mantine-color-gray-0)" },
        input: { color: "var(--mantine-color-gray-0)" },
        label: { color: "var(--mantine-color-gray-0)" }
      }
    }),
    Checkbox: Checkbox.extend({
      styles: {
        root: { color: "var(--mantine-color-gray-0)" },
        input: { color: "var(--mantine-color-gray-0)" },
        label: { color: "var(--mantine-color-gray-0)" }
      }
    }),
    DatePickerInput: DatePickerInput.extend({
      styles: {
        root: { color: "var(--mantine-color-gray-0)" },
        input: { color: "var(--mantine-color-gray-0)" },
        label: { color: "var(--mantine-color-gray-0)" }
      }
    })
  }
});
