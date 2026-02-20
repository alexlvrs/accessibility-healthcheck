/**
 * Signals stage — derives accessibility-relevant signals from component metadata.
 */

import type { ComponentMetadata } from "./extract.js";

export interface Signal {
  type: "color-contrast" | "apca-contrast" | "touch-target" | "spacing" | "label" | "keyboard" | "state" | "focus";
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

// --- APCA (Accessible Perceptual Contrast Algorithm) ---

function sRGBtoY(hex: string): number {
  const coeffs = [0.2126729, 0.7151522, 0.0721750];
  const rgb = hex
    .replace("#", "")
    .match(/.{2}/g)!
    .map((c) => {
      const val = parseInt(c, 16) / 255;
      return val <= 0.04045 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
    });
  return rgb[0] * coeffs[0] + rgb[1] * coeffs[1] + rgb[2] * coeffs[2];
}

function apcaContrast(textHex: string, bgHex: string): number {
  const Ytxt = sRGBtoY(textHex);
  const Ybg = sRGBtoY(bgHex);

  // Soft clamp near black
  const txtY = Ytxt < 0.022 ? Ytxt + (0.022 - Ytxt) ** 1.414 : Ytxt;
  const bgY = Ybg < 0.022 ? Ybg + (0.022 - Ybg) ** 1.414 : Ybg;

  // Polarity-aware contrast (output scaled to Lc 0-108 range)
  let Lc: number;
  if (bgY > txtY) {
    // Dark text on light background (normal polarity)
    Lc = (bgY ** 0.56 - txtY ** 0.57) * 1.14 * 100;
  } else {
    // Light text on dark background (reverse polarity)
    Lc = (bgY ** 0.65 - txtY ** 0.62) * 1.14 * 100;
  }

  // Output clamp: values below ±8 are considered zero
  if (Math.abs(Lc) < 8) {
    return 0;
  } else if (Lc > 0) {
    Lc -= 7;
  } else {
    Lc += 7;
  }

  return Math.round(Lc * 100) / 100;
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
      signals.push({
        type: "apca-contrast",
        variant: variant.name,
        value: apcaContrast(fg, bg),
        unit: "Lc",
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
