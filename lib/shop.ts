// Everything the website says about the shop itself, in one place.

export const SHOP = {
  name: "Rahul Motors",
  siteUrl: "https://rahulmotors.in",
  phones: [
    { label: "Sales", display: "+91 82401 54155", tel: "+918240154155" },
    { label: "Service", display: "+91 90383 94734", tel: "+919038394734" },
  ],
  whatsapp: { display: "+91 82401 54155", raw: "918240154155" },
  email: "rahulmotors08@gmail.com",
  address: {
    line1: "38, A.J.C. Bose Road",
    line2: "Mullick Bazar, Kolkata 700017",
    street: "38, A.J.C. Bose Road, Mullick Bazar",
    city: "Kolkata",
    region: "West Bengal",
    postcode: "700017",
  },
  /** The shop's pin on Google Maps. */
  geo: { lat: 22.5493414, lng: 88.3621979 },
  mapsLink: "https://maps.app.goo.gl/uDs9Hsg248Akzt6G9",
  /** Opening hours as people read them. */
  hours: [
    { days: "Monday to Saturday", time: "9 am to 9 pm" },
    { days: "Sunday", time: "9 am to 3 pm" },
  ],
  /** Same hours by weekday (0 = Sunday), in 24-hour Kolkata time, for "Open now" and search engines. */
  week: [
    [9, 15],
    [9, 21],
    [9, 21],
    [9, 21],
    [9, 21],
    [9, 21],
    [9, 21],
  ] as [number, number][],
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d845.3505747175014!2d88.36156583328685!3d22.548830941506473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02774aa3b3c63d%3A0x33fca4435b441b2e!2sRAHUL%20MOTORS!5e0!3m2!1sen!2sin!4v1779022219307!5m2!1sen!2sin",
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${SHOP.whatsapp.raw}?text=${encodeURIComponent(message)}`;
}

export function telLink(tel: string) {
  return `tel:${tel.replace(/\s/g, "")}`;
}

export function mailtoLink(subject: string, body = "") {
  return `mailto:${SHOP.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** The message a WhatsApp button opens with. */
export function askMessage(part?: { type: string; name: string; maker?: string | null; partNo?: string | null; id?: number; url?: string }) {
  if (!part) return "Hello Rahul Motors, I am looking for a part.\n\nCar and model:\nPart needed:\n";
  const lines = [
    "Hello Rahul Motors, is this part available?",
    "",
    `Part: ${part.type}`,
    `For: ${[part.maker, part.name].filter(Boolean).join(" ")}`,
  ];
  if (part.partNo) lines.push(`Part no: ${part.partNo}`);
  if (part.id) lines.push(`Shop code: ${shopCode(part.id)}`);
  if (part.url) lines.push("", part.url);
  return lines.join("\n");
}

/** The code printed on the shop's labels: RM + the part id in six digits. */
export function shopCode(id: number) {
  return `RM${String(id).padStart(6, "0")}`;
}

export function askForType(typeName: string, maker?: string) {
  return `Hello Rahul Motors, I am looking for a ${typeName.toLowerCase()}${maker ? ` for a ${maker}` : ""}.\n\nCar and model:\nYear:\n`;
}

/** Opens Uber with the shop already set as the drop-off. */
export const uberLink =
  "https://m.uber.com/looking?drop%5B0%5D=" +
  encodeURIComponent(
    JSON.stringify({ latitude: SHOP.geo.lat, longitude: SHOP.geo.lng, addressLine1: SHOP.name, addressLine2: `${SHOP.address.line1}, ${SHOP.address.line2}` }),
  );

/** Google Maps directions to the shop from wherever the visitor is. */
export const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${SHOP.geo.lat},${SHOP.geo.lng}`;

/**
 * Buses that stop at Mollick Bazar Crossing on A.J.C. Bose Road (same list as
 * the Hemant Motors site, plus 202). Routes change, so the page says to check.
 */
export const BUS_ROUTES = ["21", "21/1", "45A", "45B", "202", "218", "221", "223", "227", "230", "234", "KB-21", "S-108", "S-125", "S-178"];
