// "What's wrong with the car?": most people know the problem, not the part's
// name. Each problem lists the part types that commonly cause it. These are
// common causes, never a diagnosis; the page says so.

export interface Symptom {
  id: string;
  title: string;
  body: string;
  img: string;
  alt: string;
  /** Part type slugs, most likely first. Types the shop does not list are skipped. */
  types: string[];
}

export const SYMPTOMS: Symptom[] = [
  {
    id: "window",
    title: "Window won’t go up or down",
    body: "Usually the window switch. If you hear the motor but the glass does not move, the regulator inside the door is often the cause.",
    img: "/img/sym/window.webp",
    alt: "A hand pressing the window switch on a car door, with the glass stuck half way",
    types: ["power-window-switch", "power-window-motor", "window-regulator-glass-machine"],
  },
  {
    id: "overheat",
    title: "Engine running hot",
    body: "Check the radiator fan first: it should spin when the engine is hot. A worn water pump or a faulty thermo switch can do it too.",
    img: "/img/sym/overheat.webp",
    alt: "A car at the roadside with the bonnet open and a little steam rising from the engine",
    types: ["radiator-fan-assembly", "fan-motor", "thermo-switch", "water-pump"],
  },
  {
    id: "nostart",
    title: "Won’t start, or cuts off",
    body: "If the engine turns but does not catch, the fuel pump and the crank sensor are common causes.",
    img: "/img/sym/nostart.webp",
    alt: "A hand turning the key in a car's ignition",
    types: ["fuel-pump-assembly", "fuel-pump-motor", "crank-sensor", "relay"],
  },
  {
    id: "engine-light",
    title: "Engine shakes, or the engine light is on",
    body: "A shaking engine often points to an ignition coil. A bad oxygen or air mass sensor can turn on the light and raise fuel use.",
    img: "/img/sym/engine-light.webp",
    alt: "The amber engine warning light glowing on a car's dashboard",
    types: ["ignition-coil", "oxygen-sensor", "air-mass-sensor", "plug-wire-set"],
  },
  {
    id: "ac",
    title: "AC fan weak, or works only on full",
    body: "If the fan runs only at top speed, the blower resistor has usually gone. No air at all can mean the blower motor.",
    img: "/img/sym/ac.webp",
    alt: "A hand held in front of a car's AC vent, feeling for air",
    types: ["blower-resistor", "blower-motor", "condenser-fan-assembly"],
  },
  {
    id: "wiper",
    title: "Wipers stop or move slowly",
    body: "The wiper motor, or the linkage that moves both arms together. Old blades that only smear the glass are a quick swap.",
    img: "/img/sym/wiper.webp",
    alt: "A wiper stopped in the middle of a rainy windscreen",
    types: ["wiper-motor", "wiper-linkage", "front-wiper-set", "wiper-switch"],
  },
  {
    id: "horn-airbag",
    title: "Horn stopped, or airbag light is on",
    body: "Both often come from the clock spring (ribbon) behind the steering wheel, more so after steering work.",
    img: "/img/sym/horn-airbag.webp",
    alt: "A thumb pressing the horn on a steering wheel, with a red warning light on the dashboard",
    types: ["clock-spring-ribbon", "combination-switch"],
  },
  {
    id: "lock",
    title: "A door won’t lock with the remote",
    body: "If one door stays open while the others lock, that door’s lock motor is the usual cause.",
    img: "/img/sym/lock.webp",
    alt: "A hand pressing the button on a car remote key, pointed at the car door",
    types: ["door-lock", "lock-set", "boot-dicky-lock"],
  },
];
