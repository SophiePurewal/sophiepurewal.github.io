import { test } from "node:test";
import assert from "node:assert/strict";
import {
  agree,
  compatible,
  endConnection,
  expire,
  initialState,
  payments,
  reflect,
  type Payment,
  type Plan,
} from "./model";
const seed = () => initialState();
test("all nine payment combinations follow the three allowed pairings", () => {
  for (const a of payments)
    for (const b of payments) {
      const expected =
        (a === "Treat me" && b === "My treat") ||
        (a === "My treat" && b === "Treat me") ||
        (a === "50/50" && b === "50/50");
      assert.equal(compatible(a, b), expected, `${a} + ${b}`);
    }
  assert.equal(compatible(undefined, "My treat"), false);
});
test("independent payment agreement confirms and mismatch can be resolved", () => {
  let p = seed().plans.find((p) => p.id === "walk-manchester")!;
  p = agree(p, "Sophie", "50/50");
  assert.equal(p.status, "agreement");
  p = agree(p, "James", "50/50");
  assert.equal(p.status, "confirmed");
});
test("an alternative time needs fresh approval from both people", () => {
  let p = seed().plans[0];
  p = {
    ...p,
    status: "agreement",
    slots: ["2030-01-01T14:00"],
    selected: "2030-01-01T14:00",
    approved: ["Emma"],
  };
  p = agree(p, "Emma", "Treat me");
  assert.equal(p.status, "agreement");
  p = agree(p, "Alex", "My treat");
  assert.equal(p.status, "confirmed");
});
test("recipient selecting a different time invalidates sender approval", () => {
  let p = seed().plans.find((p) => p.id === "pending-coffee")!;
  p = { ...p, slots: [p.selected, "2030-01-01T14:00"] };
  p = agree(p, "Emma", "50/50", "2030-01-01T14:00");
  assert.equal(p.status, "agreement");
  assert.deepEqual(p.approved, ["Emma"]);
  p = agree(p, "Rowan", "50/50");
  assert.equal(p.status, "confirmed");
});
test("expiry only archives open invitations, preserving confirmed and completed plans", () => {
  const s = seed();
  const x = expire(s, Date.now() + 100 * 3600000);
  assert.equal(x.plans[0].status, "confirmed");
  assert.equal(x.plans[1].status, "completed");
  assert.equal(x.plans[2].status, "expired");
  assert.equal(x.plans[3].status, "expired");
});
test("expired, cancelled, declined and revoked invitations cannot confirm", () => {
  for (const status of [
    "expired",
    "cancelled",
    "declined",
    "revoked",
  ] as const) {
    const p = { ...seed().plans[0], status };
    assert.deepEqual(agree(p, "Alex", "My treat"), p);
  }
  const p = {
    ...seed().plans[0],
    status: "pending" as const,
    expires: Date.now() - 1,
  };
  assert.deepEqual(agree(p, "Alex", "My treat"), p);
});
test("an unrelated participant cannot accept a plan", () => {
  const p = seed().plans[0];
  assert.deepEqual(agree(p, "Priya", "My treat"), p);
});
test("a full first date creates one ongoing connection only after independent yes responses", () => {
  let s = seed();
  const id = "coffee-brighton";
  let p = s.plans[0];
  p = agree(
    { ...p, status: "pending", pay: { Emma: "50/50" }, approved: ["Emma"] },
    "Alex",
    "50/50",
  );
  assert.equal(p.status, "confirmed");
  s.plans[0] = { ...p, status: "completed" };
  const n = s.connections.length;
  s = reflect(s, id, "Emma", "yes");
  assert.equal(s.connections.length, n);
  assert.equal(s.plans[0].interest.Alex, undefined);
  s = reflect(s, id, "Alex", "yes");
  assert.equal(s.connections.length, n + 1);
  s = reflect(s, id, "Alex", "yes");
  assert.equal(s.connections.length, n + 1);
});
test("non-mutual interest never creates a connection", () => {
  let s = seed();
  s = reflect(s, "completed-coffee", "Emma", "yes");
  s = reflect(s, "completed-coffee", "Taylor", "no");
  assert.equal(
    s.connections.filter(
      (c) =>
        !c.ended &&
        ((c.a === "Emma" && c.b === "Taylor") ||
          (c.a === "Taylor" && c.b === "Emma")),
    ).length,
    0,
  );
});
test("reflection cannot be submitted before completion or overwritten", () => {
  let s = seed();
  assert.deepEqual(reflect(s, "coffee-brighton", "Emma", "yes"), s);
  s = reflect(s, "completed-coffee", "Emma", "no");
  const n = reflect(s, "completed-coffee", "Emma", "yes");
  assert.equal(
    n.plans.find((p) => p.id === "completed-coffee")!.interest.Emma,
    "no",
  );
});
test("ending a connection cancels pending repeat dates but preserves history", () => {
  const s = endConnection(seed(), "priya-daniel", "Priya");
  assert.equal(s.connections.find((c) => c.id === "priya-daniel")!.ended, true);
  assert.equal(
    s.plans.find((p) => p.id === "repeat-dinner")!.status,
    "cancelled",
  );
  assert.equal(
    s.plans.find((p) => p.id === "drinks-london")!.status,
    "completed",
  );
});
test("blocking is recorded and prevents mutual reflection recreating a connection", () => {
  let s = seed();
  s = endConnection(s, "priya-daniel", "Priya", true);
  assert.equal(s.connections[0].blockedBy, "Priya");
  s.plans.push({ ...s.plans[1], id: "another-date", interest: {} });
  s = reflect(s, "another-date", "Priya", "yes");
  s = reflect(s, "another-date", "Daniel", "yes");
  assert.equal(
    s.connections.filter((c) => c.a === "Priya" && c.b === "Daniel" && !c.ended)
      .length,
    0,
  );
});
test("a past proposed time cannot be confirmed even before link expiry", () => {
  const p = {
    ...seed().plans[0],
    selected: "2020-01-01T14:00",
    slots: ["2020-01-01T14:00"],
  };
  assert.deepEqual(agree(p, "Alex", "My treat"), p);
});
test("non-mutual interest on a repeat date closes the existing connection and open plans", () => {
  let s = seed();
  s.plans.push({ ...s.plans[1], id: "repeat-completed", interest: {} });
  s = reflect(s, "repeat-completed", "Priya", "yes");
  s = reflect(s, "repeat-completed", "Daniel", "no");
  assert.equal(s.connections[0].ended, true);
  assert.equal(
    s.plans.find((p) => p.id === "repeat-dinner")!.status,
    "cancelled",
  );
});
