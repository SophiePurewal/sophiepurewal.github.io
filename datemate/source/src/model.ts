export const newId = () =>
  typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : Array.from(crypto.getRandomValues(new Uint32Array(4)), (n) =>
        n.toString(16).padStart(8, "0"),
      ).join("");
export type Payment = "Treat me" | "My treat" | "50/50" | "Let my date choose";
export const payments: Payment[] = ["Treat me", "My treat", "50/50", "Let my date choose"];
export const paymentCopy: Record<Payment, string> = {
  "Treat me": "I’d prefer my date to pay.",
  "My treat": "I’m happy to pay for both of us.",
  "50/50": "Let’s split the bill.",
  "Let my date choose": "They can choose what feels comfortable.",
};
export type Status =
  | "pending"
  | "agreement"
  | "confirmed"
  | "completed"
  | "expired"
  | "declined"
  | "revoked"
  | "cancelled";
export type Person =
  | "Emma"
  | "Alex"
  | "Priya"
  | "Daniel"
  | "James"
  | "Sophie"
  | "Rowan"
  | "Taylor";
export const people: Person[] = [
  "Emma",
  "Alex",
  "Priya",
  "Daniel",
  "James",
  "Sophie",
  "Rowan",
  "Taylor",
];
export interface Plan {
  id: string;
  a: Person;
  b: Person;
  type: string;
  slots: string[];
  selected: string;
  venue: string;
  area: string;
  budget: string;
  pay: Partial<Record<Person, Payment>>;
  approved: Person[];
  status: Status;
  turn: Person;
  expires: number;
  interest: Partial<Record<Person, "yes" | "no">>;
  late?: string;
  repeat?: boolean;
}
export interface Connection {
  id: string;
  a: Person;
  b: Person;
  ended: boolean;
  blockedBy?: Person;
  contact: Person[];
}
export interface Settings {
  alias: string;
  notifications: boolean;
  expiry: number;
}
export interface State {
  version: 1;
  onboarded: boolean;
  actor: Person;
  plans: Plan[];
  connections: Connection[];
  settings: Partial<Record<Person, Settings>>;
  reports: { by: Person; person: Person; reason: string }[];
}
export const compatible = (a?: Payment, b?: Payment) => {
  if (!a || !b) return false;
  if (a === "Let my date choose" || b === "Let my date choose") return a !== b;
  return (
    (a === "50/50" && b === "50/50") ||
    (a === "Treat me" && b === "My treat") ||
    (a === "My treat" && b === "Treat me")
  );
};
export const other = (p: { a: Person; b: Person }, actor: Person) =>
  p.a === actor ? p.b : p.a;
export const belongs = (p: { a: Person; b: Person }, actor: Person) =>
  p.a === actor || p.b === actor;
export const closed = (p: Plan) =>
  ["expired", "declined", "revoked", "cancelled"].includes(p.status);
export const slot = (days: number, time = "14:00") => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T${time}`;
};
export function initialState(): State {
  const plan = (
    id: string,
    a: Person,
    b: Person,
    type: string,
    days: number,
    venue: string,
    area: string,
    budget: string,
    pay: Plan["pay"],
    status: Status,
    turn: Person,
    time = "14:00",
  ): Plan => ({
    id,
    a,
    b,
    type,
    slots: [slot(days, time)],
    selected: slot(days, time),
    venue,
    area,
    budget,
    pay,
    status,
    turn,
    approved: status === "confirmed" || status === "completed" ? [a, b] : [a],
    expires: Date.now() + 48 * 3600000,
    interest: {},
  });
  const plans = [
    plan(
      "coffee-brighton",
      "Emma",
      "Alex",
      "Coffee",
      3,
      "The Flour Pot, Sydney Street",
      "Brighton",
      "£10–£20",
      { Emma: "Treat me", Alex: "My treat" },
      "confirmed",
      "Alex",
    ),
    plan(
      "drinks-london",
      "Priya",
      "Daniel",
      "Drinks",
      -6,
      "Southbank Centre café",
      "London",
      "£20–£40",
      { Priya: "50/50", Daniel: "50/50" },
      "completed",
      "Daniel",
      "19:00",
    ),
    plan(
      "walk-manchester",
      "James",
      "Sophie",
      "Walk",
      4,
      "Heaton Park café entrance",
      "Manchester",
      "Under £10",
      { James: "My treat", Sophie: "50/50" },
      "agreement",
      "Sophie",
      "11:00",
    ),
    plan(
      "pending-coffee",
      "Rowan",
      "Emma",
      "Coffee",
      6,
      "Trading Post, Ship Street",
      "Brighton",
      "£10–£20",
      { Rowan: "50/50" },
      "pending",
      "Emma",
      "10:30",
    ),
    plan(
      "awaiting-walk",
      "Emma",
      "Taylor",
      "Walk",
      7,
      "Hove Lawns, café entrance",
      "Hove",
      "Under £10",
      { Emma: "50/50" },
      "pending",
      "Taylor",
      "11:00",
    ),
    plan(
      "expired-drinks",
      "Emma",
      "Rowan",
      "Drinks",
      -3,
      "Shelter Hall",
      "Brighton",
      "£20–£40",
      { Emma: "50/50" },
      "expired",
      "Rowan",
      "18:30",
    ),
    plan(
      "completed-coffee",
      "Emma",
      "Taylor",
      "Coffee",
      -2,
      "Small Batch, Seven Dials",
      "Brighton",
      "£10–£20",
      { Emma: "50/50", Taylor: "50/50" },
      "completed",
      "Taylor",
    ),
    plan(
      "repeat-dinner",
      "Daniel",
      "Priya",
      "Dinner",
      5,
      "Wahaca, Southbank",
      "London",
      "£20–£40",
      { Daniel: "50/50" },
      "pending",
      "Priya",
      "19:00",
    ),
  ];
  plans[1].interest = { Priya: "yes", Daniel: "yes" };
  plans[5].expires = Date.now() - 3600000;
  plans[7].repeat = true;
  return {
    version: 1,
    onboarded: false,
    actor: "Emma",
    plans,
    connections: [
      {
        id: "priya-daniel",
        a: "Priya",
        b: "Daniel",
        ended: false,
        contact: [],
      },
      { id: "emma-rowan", a: "Emma", b: "Rowan", ended: true, contact: [] },
    ],
    settings: {},
    reports: [],
  };
}
export function expire(s: State, now = Date.now()): State {
  return {
    ...s,
    plans: s.plans.map((p) =>
      (p.status === "pending" || p.status === "agreement") && p.expires <= now
        ? { ...p, status: "expired" }
        : p,
    ),
  };
}
export function agree(
  p: Plan,
  actor: Person,
  payment: Payment,
  selected = p.selected,
): Plan {
  if (
    !(new Date(selected).getTime() > Date.now()) ||
    p.expires <= Date.now() ||
    closed(p) ||
    p.status === "completed" ||
    !belongs(p, actor) ||
    !p.slots.includes(selected)
  )
    return p;
  const changed = p.pay[actor] !== payment || p.selected !== selected;
  const approved =
    changed && p.selected !== selected
      ? [actor]
      : Array.from(new Set([...p.approved, actor]));
  const pay = { ...p.pay, [actor]: payment };
  const ok = compatible(pay[p.a], pay[p.b]);
  return {
    ...p,
    pay,
    selected,
    approved,
    status:
      ok && approved.includes(p.a) && approved.includes(p.b)
        ? "confirmed"
        : "agreement",
    turn: other(p, actor),
  };
}
export function reflect(
  s: State,
  id: string,
  actor: Person,
  value: "yes" | "no",
): State {
  const p = s.plans.find((p) => p.id === id);
  if (!p || p.status !== "completed" || !belongs(p, actor) || p.interest[actor])
    return s;
  const next = { ...p, interest: { ...p.interest, [actor]: value } };
  const mutual = next.interest[p.a] === "yes" && next.interest[p.b] === "yes";
  const nonmutual = !!next.interest[p.a] && !!next.interest[p.b] && !mutual;
  const found = s.connections.find(
    (c) =>
      ((c.a === p.a && c.b === p.b) || (c.a === p.b && c.b === p.a)) &&
      !c.ended,
  );
  return {
    ...s,
    plans: s.plans.map((x) =>
      x.id === id
        ? next
        : nonmutual &&
            belongs(x, p.a) &&
            belongs(x, p.b) &&
            ["pending", "agreement", "confirmed"].includes(x.status)
          ? { ...x, status: "cancelled" }
          : x,
    ),
    connections:
      mutual &&
      !found &&
      !s.connections.some(
        (c) => c.blockedBy && belongs(c, p.a) && belongs(c, p.b),
      )
        ? [
            ...s.connections,
            { id: newId(), a: p.a, b: p.b, ended: false, contact: [] },
          ]
        : nonmutual
          ? s.connections.map((c) =>
              belongs(c, p.a) && belongs(c, p.b) ? { ...c, ended: true } : c,
            )
          : s.connections,
  };
}
export function endConnection(
  s: State,
  id: string,
  actor: Person,
  block = false,
): State {
  const c = s.connections.find((c) => c.id === id && belongs(c, actor));
  if (!c) return s;
  return {
    ...s,
    connections: s.connections.map((x) =>
      x.id === id
        ? { ...x, ended: true, ...(block ? { blockedBy: actor } : {}) }
        : x,
    ),
    plans: s.plans.map((p) =>
      belongs(p, c.a) &&
      belongs(p, c.b) &&
      ["pending", "agreement", "confirmed"].includes(p.status)
        ? { ...p, status: "cancelled" }
        : p,
    ),
  };
}
export const formatDate = (value: string) =>
  new Date(value).toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
export const storageKey = "datemate-demo-v1";
export function readState(): { state: State; warning: string } {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return { state: initialState(), warning: "" };
    const v = JSON.parse(raw);
    if (
      v.version !== 1 ||
      !Array.isArray(v.plans) ||
      !Array.isArray(v.connections) ||
      v.connections.some(
        (c: Connection) =>
          !c ||
          !c.id ||
          !people.includes(c.a) ||
          !people.includes(c.b) ||
          typeof c.ended !== "boolean" ||
          !Array.isArray(c.contact),
      ) ||
      !people.includes(v.actor) ||
      !v.settings ||
      !Array.isArray(v.reports) ||
      v.plans.some(
        (p: Plan) =>
          typeof p.id !== "string" ||
          !p.id ||
          typeof p.selected !== "string" ||
          !Number.isFinite(new Date(p.selected).getTime()) ||
          typeof p.venue !== "string" ||
          typeof p.area !== "string" ||
          typeof p.budget !== "string" ||
          typeof p.expires !== "number" ||
          !people.includes(p.a) ||
          !people.includes(p.b) ||
          !Array.isArray(p.slots) ||
          !p.interest ||
          !p.pay ||
          !Array.isArray(p.approved),
      )
    )
      throw Error();
    return { state: expire(v), warning: "" };
  } catch {
    return {
      state: initialState(),
      warning:
        "Saved demo data could not be loaded. A fresh fictional demo is ready.",
    };
  }
}
