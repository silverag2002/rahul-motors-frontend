// The shop writes the important fit details into each part's name in its own
// shorthand: LH/RH, FR/RR, PTL/DSL, O/M and N/M, "4 PIN", "T-2". This reads
// those bits and says them in plain words, so a buyer can check them before ordering.

export type FitKind = "side" | "position" | "fuel" | "model" | "plug" | "version" | "feature";

export interface FitNote {
  kind: FitKind;
  /** Short badge text, e.g. "Right side". */
  label: string;
  /** One plain sentence for the "Check before you order" box. */
  check: string;
}

const has = (s: string, re: RegExp) => re.test(s);

export function fitNotes(name: string, type?: string): FitNote[] {
  // Upper-case, and space out brackets and dashes so "(F/RH)" and "FR-LH" read like "F/RH" and "FR LH".
  const s = ` ${name.toUpperCase().replace(/[()[\],]/g, " ").replace(/(\b[A-Z]{1,2})-(LH|RH)\b/g, "$1 $2")} `;
  const notes: FitNote[] = [];
  const isWindowSwitch = /window switch/i.test(type ?? "");

  // Position: front or rear.
  const front = has(s, /\b(FR|FRT|FRONT)\b|\bF\/(LH|RH)\b/);
  const rear = has(s, /\b(RR|REAR|RL)\b|\bR\/(LH|RH)\b/);
  if (front && !rear) notes.push({ kind: "position", label: "Front", check: "For a front door or front wheel." });
  if (rear && !front) notes.push({ kind: "position", label: "Rear", check: "For a rear door or rear wheel." });
  if (front && rear) notes.push({ kind: "position", label: "Front and rear", check: "Fits a front and a rear position (see the name)." });

  // Side: left or right, seen from the driver's seat.
  const left = has(s, /\b(LH|L\/H|LEFT|RL)\b|\/LH\b/);
  const right = has(s, /\b(RH|R\/H|RIGHT)\b|\/RH\b/);
  if (left && !right)
    notes.push({ kind: "side", label: "Left side", check: "Left side, the passenger side in an Indian car." });
  if (right && !left)
    notes.push({
      kind: "side",
      label: "Right side",
      check: isWindowSwitch ? "Right side: the driver's door. This is usually the main switch with all the buttons." : "Right side, the driver's side in an Indian car.",
    });

  // Fuel.
  const petrol = has(s, /\b(PTL|PETROL)\b/);
  const diesel = has(s, /\b(DSL|DIESEL|CRD|CRDI|CRDE|TDI|DICOR|MHAWK|M-HAWK)\b/);
  if (petrol && !diesel) notes.push({ kind: "fuel", label: "Petrol", check: "For the petrol model only." });
  if (diesel && !petrol) notes.push({ kind: "fuel", label: "Diesel", check: "For the diesel model only." });

  // Old or new model of the same car.
  if (has(s, /\b(O\/M|OM)\b|\bOLD\b/)) notes.push({ kind: "model", label: "Old model", check: "For the older shape of this car. Tell us the year if you are not sure." });
  else if (has(s, /\b(N\/M|NM)\b|\bNEW\b/)) notes.push({ kind: "model", label: "New model", check: "For the newer shape of this car. Tell us the year if you are not sure." });

  // Plug pins.
  const pin = s.match(/\b(\d{1,2})\s?PIN\b/);
  if (pin) notes.push({ kind: "plug", label: `${pin[1]}-pin plug`, check: `The plug has ${pin[1]} pins. Count the pins on your old part's plug.` });

  // Shop's own version code (T-2, TY 3).
  const ver = s.match(/\bT(?:Y)?[-\s]?(\d)\b/);
  if (ver) notes.push({ kind: "version", label: `Type ${ver[1]}`, check: `Type ${ver[1]} is one version of this part for the car. A photo of your old part lets us confirm it.` });

  if (has(s, /\bBS-?6\b|\bBS ?VI\b/)) notes.push({ kind: "feature", label: "BS6", check: "For the BS6 engine (cars from about April 2020)." });

  if (isWindowSwitch) {
    if (has(s, /\b(W\/O|W\/OUT|WITHOUT|W-OUT)\s?\/?\s?AUTO\b/)) notes.push({ kind: "feature", label: "No auto button", check: "Without the one-touch AUTO button." });
    else if (has(s, /\b(WITH|W\/)\s?AUTO\b/)) notes.push({ kind: "feature", label: "With auto button", check: "With the one-touch AUTO button." });
  }
  if (has(s, /\b(W\/O|WITHOUT)\s?\/?\s?FOG\b/)) notes.push({ kind: "feature", label: "No fog lamp", check: "For cars without fog lamps." });

  return notes;
}
