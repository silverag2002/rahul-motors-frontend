// Clean, readable names for what the shop's database holds.
// The database is typed in by hand at the counter, so the same maker shows up
// as "RENULT", "Renault" and "renault", and some part types are misspelt.
// Nothing here changes the data; it only changes how the website shows it.

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const squash = (value: string) => value.replace(/\s+/g, " ").trim();
const key = (value: string) => squash(value).toUpperCase().replace(/[.\s]+/g, " ").trim();

/* ------------------------------------------------------------------ makers */

export interface Maker {
  name: string;
  slug: string;
  /** File in /public/makers, if we have the badge. */
  logo?: string;
  /** Two-wheelers are kept apart from cars in the menus. */
  bike?: boolean;
}

const MAKERS: Record<string, Maker> = {
  hyundai: { name: "Hyundai", slug: "hyundai", logo: "hyundai.webp" },
  maruti: { name: "Maruti Suzuki", slug: "maruti-suzuki", logo: "maruti_suzuki.webp" },
  mahindra: { name: "Mahindra", slug: "mahindra", logo: "mahindra.webp" },
  honda: { name: "Honda", slug: "honda", logo: "honda.webp" },
  tata: { name: "Tata", slug: "tata", logo: "tata.webp" },
  ford: { name: "Ford", slug: "ford", logo: "ford.webp" },
  toyota: { name: "Toyota", slug: "toyota", logo: "toyota.webp" },
  skoda: { name: "Skoda", slug: "skoda", logo: "skoda.webp" },
  renault: { name: "Renault", slug: "renault", logo: "renault.webp" },
  chevrolet: { name: "Chevrolet", slug: "chevrolet", logo: "chevrolet.webp" },
  volkswagen: { name: "Volkswagen", slug: "volkswagen", logo: "volkswagen.webp" },
  nissan: { name: "Nissan", slug: "nissan", logo: "nissan.webp" },
  bmw: { name: "BMW", slug: "bmw", logo: "bmw.webp" },
  audi: { name: "Audi", slug: "audi", logo: "audi.webp" },
  mercedes: { name: "Mercedes-Benz", slug: "mercedes-benz", logo: "mercedes.webp" },
  fiat: { name: "Fiat", slug: "fiat", logo: "fiat.webp" },
  kia: { name: "Kia", slug: "kia", logo: "kia.webp" },
  jeep: { name: "Jeep", slug: "jeep", logo: "jeep.webp" },
  mitsubishi: { name: "Mitsubishi", slug: "mitsubishi", logo: "mitsubishi.webp" },
  mg: { name: "MG", slug: "mg", logo: "mg.webp" },
  landrover: { name: "Land Rover", slug: "land-rover", logo: "land_rover.webp" },
  rangerover: { name: "Range Rover", slug: "range-rover", logo: "range_rover.webp" },
  gm: { name: "GM", slug: "gm", logo: "gm.webp" },
  ashok: { name: "Ashok Leyland", slug: "ashok-leyland", logo: "ashok_leyland.webp" },
  isuzu: { name: "Isuzu", slug: "isuzu", logo: "isuzu.webp" },
  datsun: { name: "Datsun", slug: "datsun", logo: "datsun.webp" },
  daewoo: { name: "Daewoo", slug: "daewoo", logo: "daewoo.webp" },
  opel: { name: "Opel", slug: "opel", logo: "opel.webp" },
  ssangyong: { name: "SsangYong", slug: "ssangyong", logo: "ssangyong.webp" },
  force: { name: "Force", slug: "force", logo: "force.webp" },
  volvo: { name: "Volvo", slug: "volvo", logo: "volvo.webp" },
  hero: { name: "Hero", slug: "hero", logo: "hero.webp", bike: true },
  yamaha: { name: "Yamaha", slug: "yamaha", logo: "yamaha.webp", bike: true },
  tvs: { name: "TVS", slug: "tvs", logo: "tvs.webp", bike: true },
  bajaj: { name: "Bajaj", slug: "bajaj", logo: "bajaj.webp", bike: true },
  royalenfield: { name: "Royal Enfield", slug: "royal-enfield", logo: "royal_enfield.webp", bike: true },
  jawa: { name: "Jawa", slug: "jawa", logo: "jawa.webp", bike: true },
  ktm: { name: "KTM", slug: "ktm", logo: "ktm.webp", bike: true },
  suzuki: { name: "Suzuki", slug: "suzuki", logo: "suzuki.webp", bike: true },
  pricol: { name: "Pricol", slug: "pricol", logo: "pricol.webp" },
  universal: { name: "Fits many cars", slug: "universal" },
};

/** Spellings seen in the shop's data, squashed to letters only. */
const MAKER_ALIASES: Record<string, keyof typeof MAKERS> = {
  hyundai: "hyundai", hyundat: "hyundai", hundai: "hyundai",
  maruti: "maruti", marutisuzuki: "maruti", matiz: "daewoo",
  mahindra: "mahindra", honda: "honda",
  tata: "tata", tat: "tata",
  ford: "ford",
  toyota: "toyota", toyata: "toyota",
  skoda: "skoda",
  renault: "renault", renult: "renault", renultnissan: "renault",
  chevrolet: "chevrolet", chervolet: "chevrolet", chovlate: "chevrolet", chavilot: "chevrolet", chorvolate: "chevrolet",
  volkswagen: "volkswagen", volkswage: "volkswagen", vw: "volkswagen",
  nissan: "nissan", bmw: "bmw", audi: "audi",
  mercedes: "mercedes", mercedesbenz: "mercedes", benz: "mercedes",
  fiat: "fiat", kia: "kia", kiahyundai: "kia", jeep: "jeep", mitsubishi: "mitsubishi", mg: "mg",
  landrover: "landrover", rangrover: "rangerover", rangerover: "rangerover",
  gm: "gm", ashok: "ashok", ashokleyland: "ashok", isuzu: "isuzu", datsun: "datsun", daewoo: "daewoo",
  opel: "opel", ssangyong: "ssangyong", force: "force", volvo: "volvo",
  hero: "hero", yamaha: "yamaha", tvs: "tvs", bajaj: "bajaj", royalenfield: "royalenfield", jawa: "jawa", ktm: "ktm",
  suzuki: "suzuki", pricol: "pricol",
  universal: "universal", univrsal: "universal",
};

/** The maker for a part, or null when the brand field is empty or is the shop's own name. */
export function makerOf(brand?: string | null): Maker | null {
  if (!brand) return null;
  const letters = brand.toLowerCase().replace(/[^a-z]/g, "");
  if (!letters || letters.startsWith("rahulmotor") || letters === "tc") return null;
  const id = MAKER_ALIASES[letters];
  if (id) return MAKERS[id];
  // Unknown but real-looking brand: show it tidied up, never shouted.
  const name = squash(brand).toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  return { name, slug: slugify(name) };
}

export function makerBySlug(slug: string): Maker | null {
  return Object.values(MAKERS).find((m) => m.slug === slug) ?? null;
}

/* ------------------------------------------------------------- part types */

export type PartFamily = "switches" | "sensors" | "fuel" | "cooling" | "wipers" | "body" | "engine" | "bike";

export const FAMILIES: { id: PartFamily; name: string; blurb: string }[] = [
  { id: "switches", name: "Switches & electricals", blurb: "Window, light, wiper, AC and brake switches, relays, fuse boxes and LED bulbs." },
  { id: "sensors", name: "Sensors", blurb: "Oxygen, ABS, crank, cam, air-mass, parking and speed sensors." },
  { id: "fuel", name: "Fuel system", blurb: "Fuel pumps and motors, fuel units, diesel filters and throttle bodies." },
  { id: "cooling", name: "Cooling & AC", blurb: "Radiator fans, water pumps, thermostats, oil coolers and pipes." },
  { id: "wipers", name: "Wipers & washers", blurb: "Wiper sets, motors, linkages and washer spray motors." },
  { id: "body", name: "Locks, windows & body", blurb: "Window motors and regulators, door and boot locks, central locking." },
  { id: "engine", name: "Engine & ignition", blurb: "Ignition coils, plug wires, belt tensioners, valves and pulleys." },
  { id: "bike", name: "Two-wheeler parts", blurb: "Fuel pumps and motors for bikes and scooters." },
];

interface PartType {
  name: string;
  family: PartFamily;
  /** A few other words people search with. */
  also?: string[];
}

/** Every part type the shop uses, keyed by its name in the database (upper case, single spaces). */
const PART_TYPES: Record<string, PartType> = {
  "PW SWITCH": { name: "Power window switch", family: "switches", also: ["pw switch", "window switch", "master switch"] },
  "FUEL PUMP ASSY": { name: "Fuel pump assembly", family: "fuel", also: ["fuel pump", "fpa"] },
  "IGNIATION COIL": { name: "Ignition coil", family: "engine", also: ["coil", "plug coil"] },
  "FAN ASSEMBLY": { name: "Radiator fan assembly", family: "cooling", also: ["fan", "radiator fan", "cooling fan"] },
  "RIBBEN / CLOCK SPRING": { name: "Clock spring (ribbon)", family: "switches", also: ["ribbon", "ribben", "clock spring", "airbag spring"] },
  "FAN MOTOR": { name: "Fan motor", family: "cooling", also: ["radiator fan motor"] },
  "FUEL PUMP MOTOR": { name: "Fuel pump motor", family: "fuel", also: ["fuel pump"] },
  "WIPER LINKAGE": { name: "Wiper linkage", family: "wipers" },
  "WATER PUMP": { name: "Water pump", family: "cooling" },
  "REAR WIPER SET": { name: "Rear wiper set", family: "wipers", also: ["wiper blade", "rear wiper"] },
  "OXYGEN SENSOR": { name: "Oxygen sensor", family: "sensors", also: ["o2 sensor", "lambda sensor"] },
  "FRONT WIPER SET": { name: "Front wiper set", family: "wipers", also: ["wiper blade", "wiper"] },
  "BLOWER MOTOR": { name: "Blower motor", family: "cooling", also: ["ac blower", "heater blower"] },
  "FAN BELT TENSIONER": { name: "Fan belt tensioner", family: "engine", also: ["belt tensioner", "tensioner"] },
  "OIL COOLER": { name: "Oil cooler", family: "cooling" },
  "ABS SENSOR": { name: "ABS sensor", family: "sensors", also: ["wheel speed sensor"] },
  "THERMO SWITCH": { name: "Thermo switch", family: "switches", also: ["temperature switch", "temp switch"] },
  "AIR MASS SENSOR": { name: "Air mass sensor", family: "sensors", also: ["maf sensor", "mass air flow"] },
  "COMBINATION SWITCH": { name: "Combination switch", family: "switches", also: ["indicator switch", "multi switch"] },
  "THERMOSTAT ELBOW": { name: "Thermostat elbow", family: "cooling", also: ["thermostat"] },
  "HEAD LIGHT SWITCH": { name: "Head light switch", family: "switches", also: ["headlight switch", "light switch"] },
  "SPRAY MOTOR": { name: "Washer spray motor", family: "wipers", also: ["washer motor", "washer pump"] },
  "POWER WINDOW MOTOR": { name: "Power window motor", family: "body", also: ["window motor"] },
  "DOOR LOCK": { name: "Door lock", family: "body", also: ["door lock actuator"] },
  "F P ASSY (BIKE)": { name: "Bike fuel pump assembly", family: "bike", also: ["bike fuel pump", "two wheeler fuel pump"] },
  "F P MOTOR (BIKE)": { name: "Bike fuel pump motor", family: "bike", also: ["bike fuel pump"] },
  "PLUG WIRE": { name: "Plug wire set", family: "engine", also: ["spark plug wire", "ht lead"] },
  "RELAY": { name: "Relay", family: "switches" },
  "LOCK SET": { name: "Lock set", family: "body", also: ["key set", "ignition lock"] },
  "BLOWER RESISTANCE": { name: "Blower resistor", family: "cooling", also: ["blower resistance", "resistor"] },
  "CRANK SENSOR": { name: "Crank sensor", family: "sensors", also: ["crankshaft sensor", "ckp"] },
  "REVERSE LIGHT SWITCH": { name: "Reverse light switch", family: "switches", also: ["reverse switch"] },
  "COOLANT PIPE": { name: "Coolant pipe", family: "cooling", also: ["radiator pipe", "hose"] },
  "WIPER MOTOR": { name: "Wiper motor", family: "wipers" },
  "OIL PRESSURE SWITCH": { name: "Oil pressure switch", family: "switches", also: ["oil switch"] },
  "DICKY LOCK": { name: "Boot (dicky) lock", family: "body", also: ["dicky lock", "boot lock", "trunk lock"] },
  "LED LIGHT": { name: "LED headlight bulb", family: "switches", also: ["led", "bulb", "headlight bulb"] },
  "OVER FLOW PIPE": { name: "Overflow pipe", family: "cooling", also: ["overflow"] },
  "DICKY SWITCH": { name: "Boot (dicky) switch", family: "switches", also: ["dicky switch", "boot switch"] },
  "OIL COOLER CAP": { name: "Oil cooler cap", family: "cooling" },
  "FUEL UNIT": { name: "Fuel level unit", family: "fuel", also: ["fuel sender", "fuel gauge unit"] },
  "FICD": { name: "FICD valve", family: "engine" },
  "WIPER SWITCH": { name: "Wiper switch", family: "switches" },
  "MIRROR SWITCH": { name: "Mirror switch", family: "switches", also: ["orvm switch"] },
  "HP SWITCH": { name: "AC pressure (HP) switch", family: "switches", also: ["hp switch", "ac pressure switch"] },
  "CONDENSOR FAN ASSY": { name: "Condenser fan assembly", family: "cooling", also: ["condenser fan", "ac fan"] },
  "DSL FILTER SENSER": { name: "Diesel filter sensor", family: "fuel", also: ["water in fuel sensor", "dsl sensor"] },
  "ADD PUMP": { name: "Additional water pump", family: "cooling", also: ["add pump", "auxiliary pump"] },
  "FAN RESISTANCE": { name: "Fan resistor", family: "cooling", also: ["fan resistance"] },
  "OIL COOLER ASSEMBLY": { name: "Oil cooler assembly", family: "cooling" },
  "BREAK SWITCH": { name: "Brake switch", family: "switches", also: ["break switch", "brake light switch", "stop light switch"] },
  "IAC VALVE": { name: "IAC valve", family: "engine", also: ["idle air control"] },
  "A C SWITCH": { name: "AC switch", family: "switches", also: ["a c switch", "air conditioner switch"] },
  "PARKING SENSOR": { name: "Parking sensor", family: "sensors", also: ["reverse sensor"] },
  "GLASS MACHIN": { name: "Window regulator (glass machine)", family: "body", also: ["glass machine", "window regulator"] },
  "THOTEL BODY": { name: "Throttle body", family: "fuel", also: ["throttle"] },
  "DSL FILTER HEAD": { name: "Diesel filter head", family: "fuel" },
  "VVT VALVE": { name: "VVT valve", family: "engine", also: ["solenoid"] },
  "DSL FILTER ASSY": { name: "Diesel filter assembly", family: "fuel", also: ["diesel filter"] },
  "FAN CLUTCH": { name: "Fan clutch", family: "cooling" },
  "PARKING GEAR SWITCH": { name: "Parking gear switch", family: "switches" },
  "DISTIBUTOR ASSEMBLY": { name: "Distributor assembly", family: "engine", also: ["distributor"] },
  "FAN RELAY": { name: "Fan relay", family: "switches" },
  "CAM SENSER": { name: "Cam sensor", family: "sensors", also: ["camshaft sensor", "cmp"] },
  "DOOR LOCK CABLE": { name: "Door lock cable", family: "body" },
  "VACUM PUMP": { name: "Vacuum pump", family: "engine", also: ["vacuum"] },
  "UREA MOTOR": { name: "Urea (AdBlue) motor", family: "engine", also: ["adblue", "def"] },
  "SPEED SENSOR (MGP)": { name: "Speed sensor (MGP)", family: "sensors" },
  "FUEL DOOR MOTOR": { name: "Fuel door motor", family: "body", also: ["fuel lid motor"] },
  "GPS TRACKING": { name: "GPS tracker", family: "switches" },
  "OIL COOLER BODY": { name: "Oil cooler body", family: "cooling" },
  "ROOF MOTOR": { name: "Sunroof motor", family: "body", also: ["roof motor"] },
  "HEATER TIMER": { name: "Heater timer", family: "switches" },
  "OIL COOLER RING KIT": { name: "Oil cooler ring kit", family: "cooling", also: ["o ring"] },
  "FUSE BOX": { name: "Fuse box", family: "switches" },
  "IDEAL PULLY": { name: "Idler pulley", family: "engine", also: ["ideal pulley", "pulley"] },
  "ACCELERATOR PRDAL": { name: "Accelerator pedal", family: "engine", also: ["accelerator", "pedal sensor"] },
  "FUEL PUMP RELAY": { name: "Fuel pump relay", family: "switches" },
  "CENTER LOCK": { name: "Central locking", family: "body", also: ["center lock", "central lock"] },
  "UREA INJECTOR": { name: "Urea (AdBlue) injector", family: "engine", also: ["adblue"] },
};

function sentence(value: string): string {
  const s = squash(value).toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface PartTypeInfo {
  /** Readable, correctly spelt name. */
  name: string;
  slug: string;
  family: PartFamily;
  also: string[];
}

export function partTypeOf(raw: string): PartTypeInfo {
  const known = PART_TYPES[key(raw)];
  const name = known?.name ?? sentence(raw);
  return {
    name,
    slug: slugify(name),
    family: known?.family ?? "engine",
    also: [squash(raw).toLowerCase(), ...(known?.also ?? [])],
  };
}

/** Product names are typed in capitals; keep them as typed but tidy the spaces. */
export function cleanName(value?: string | null): string {
  return squash(value ?? "");
}

/** Something a person typed, as opposed to a test entry like "&&&" or "???". */
export function isRealName(value?: string | null): boolean {
  return /[a-z0-9]/i.test(value ?? "");
}
