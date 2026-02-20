/**
 * Extract stage — pulls component metadata from design system sources.
 *
 * In a full implementation this would query Figma API, Storybook API,
 * and token definitions. For the PoC, it returns structured sample data.
 */

export interface ComponentMetadata {
  id: string;
  name: string;
  variants: Variant[];
  tokens: Record<string, string>;
  dimensions: { width: number; height: number };
}

export interface Variant {
  name: string;
  properties: Record<string, string>;
  tokens: Record<string, string>;
}

export async function extract(): Promise<ComponentMetadata> {
  // PoC: return sample button metadata
  return {
    id: "button",
    name: "Button",
    variants: [
      {
        name: "Variant=Primary",
        properties: { variant: "primary" },
        tokens: { "--ds-color-bg-primary": "#206f77", "--ds-color-text-on-primary": "#ffffff" },
      },
      {
        name: "Variant=Secondary",
        properties: { variant: "secondary" },
        tokens: { "--ds-color-bg-primary": "#636363", "--ds-color-text-on-primary": "#ffffff" },
      },
      {
        name: "Variant=Danger",
        properties: { variant: "danger" },
        tokens: { "--ds-color-bg-primary": "#bc002a", "--ds-color-text-on-primary": "#ffffff" },
      },
    ],
    tokens: {
      "--ds-font-size-body": "14",
      "--ds-font-weight-medium": "500",
      "--ds-space-inline": "16",
      "--ds-space-block": "12",
    },
    dimensions: { width: 89.5, height: 36 },
  };
}
