/**
 * Signals stage — derives accessibility-relevant signals from component metadata.
 */

import type { ComponentMetadata } from "./extract.js";

export interface Signal {
  type: "color-contrast" | "touch-target" | "spacing" | "label" | "keyboard" | "state" | "focus";
  variant?: string;
  value: number | string | boolean;
  unit?: string;
  token?: string;
}

function relativeLuminance(hex: string): number {
  const rgb = hex
    .replace("#", "")
    .match(/.{2}/g)!
    .map((c) => {
      const srgb = parseInt(c, 16) / 255;
      return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
    });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function deriveSignals(metadata: ComponentMetadata): Signal[] {
  const signals: Signal[] = [];

  // Color contrast signals per variant
  for (const variant of metadata.variants) {
    const bg = variant.tokens["--ds-color-bg-primary"];
    const fg = variant.tokens["--ds-color-text-on-primary"];
    if (bg && fg) {
      signals.push({
        type: "color-contrast",
        variant: variant.name,
        value: Math.round(contrastRatio(bg, fg) * 100) / 100,
        unit: ":1",
        token: "--ds-color-bg-primary",
      });
    }
  }

  // Touch target signal
  signals.push({
    type: "touch-target",
    value: metadata.dimensions.height,
    unit: "px",
  });

  return signals;
}
