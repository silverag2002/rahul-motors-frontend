// Photos made for the website (bright, clean shop look), by part type.
// Part types without one use a real photo from one of their parts.
import { photoSrc, type PartTypeSummary } from "./types";

/**
 * The picture for a part type: the photo made for the site if there is one
 * (so the home page tiles stay one matching set), else the shop's own
 * category photo from the admin panel.
 */
export function typeImage(t: PartTypeSummary, width = 400): string | null {
  return TYPE_PHOTOS[t.slug] ?? (t.image ? photoSrc(t.image, width) : null);
}

export const TYPE_PHOTOS: Record<string, string> = {
  "power-window-switch": "/img/cat-window-switch.webp",
  "fuel-pump-assembly": "/img/cat-fuel-pump.webp",
  "ignition-coil": "/img/cat-ignition-coil.webp",
  "radiator-fan-assembly": "/img/cat-fan.webp",
  "oxygen-sensor": "/img/cat-oxygen-sensor.webp",
  "front-wiper-set": "/img/cat-wiper.webp",
  "clock-spring-ribbon": "/img/cat-clock-spring.webp",
  "fan-motor": "/img/cat-fan-motor.webp",
  "fuel-pump-motor": "/img/cat-fuel-pump-motor.webp",
  "wiper-linkage": "/img/cat-wiper-linkage.webp",
  "water-pump": "/img/cat-water-pump.webp",
  "blower-motor": "/img/cat-blower-motor.webp",
};
