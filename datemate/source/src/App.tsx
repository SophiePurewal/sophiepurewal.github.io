import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Coffee,
  Copy,
  Download,
  ExternalLink,
  Flag,
  Flower2,
  HelpCircle,
  Link,
  MapPin,
  Plus,
  Settings2,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
  Users,
  Wind,
  X,
} from "lucide-react";
import {
  Badge,
  Button,
  DateCard,
  Empty,
  Logo,
  Modal,
  PageHeading,
  PaymentCards,
  PlanFacts,
  PrivacyNotice,
  RowButton,
} from "./components";
import Create from "./Create";
import {
  newId,
  agree,
  belongs,
  closed,
  compatible,
  endConnection,
  expire,
  formatDate,
  initialState,
  other,
  people,
  readState,
  reflect,
  slot,
  storageKey,
  type Connection,
  type Payment,
  type Person,
  type Plan,
  type Settings,
  type State,
} from "./model";
const statusTabs = [
  "Upcoming",
  "Needs you",
  "Awaiting response",
  "Completed",
  "Archived",
] as const;
const navs = [
  { path: "/dates", label: "My Dates", Icon: CalendarDays },
  { path: "/connections", label: "Connections", Icon: Users },
  { path: "/create", label: "Create", Icon: Plus },
  { path: "/profile", label: "Profile", Icon: UserRound },
];
function useRoute() {
  const [route, setRoute] = useState(
    () => location.hash.slice(1) || "/welcome",
  );
  useEffect(() => {
    const f = () => setRoute(location.hash.slice(1) || "/welcome");
    window.addEventListener("hashchange", f);
    return () => window.removeEventListener("hashchange", f);
  }, []);
  return route;
}
const go = (path: string) => {
  location.hash = path;
};
const linkFor = (p: Plan) => `${location.href.split("#")[0]}#/invite/${p.id}`;
export default function App() {
  const [loaded] = useState(readState),
    [state, setState] = useState<State>(loaded.state),
    [warning, setWarning] = useState(loaded.warning),
    [toast, setToast] = useState(""),
    [modal, setModal] = useState<{ title: string; body: ReactNode } | null>(
      null,
    ),
    [tab, setTab] = useState<string>("Upcoming"),
    [recipient, setRecipient] = useState<Person | undefined>(),
    [clock, setClock] = useState(Date.now());
  const route = useRoute();
  const actor = state.actor;
  const settings = state.settings[actor] || {
    alias: actor,
    notifications: false,
    expiry: 48,
  };
  const alias = settings.alias || actor;
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      setWarning(
        "Browser storage is unavailable or full. Changes will last only for this session.",
      );
    }
  }, [state]);
  useEffect(() => {
    const sync = (e: StorageEvent) => {
      if (e.key === storageKey) setState(readState().state);
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    const timer = window.setInterval(() => {
      setClock(Date.now());
      setState((s) => {
        const changed = s.plans.some(
          (p) =>
            ["pending", "agreement"].includes(p.status) &&
            p.expires <= Date.now(),
        );
        return changed ? expire(s) : s;
      });
    }, 15000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    mainRef.current?.querySelector<HTMLElement>("h1")?.focus();
    window.scrollTo({ top: 0, behavior: "instant" });
    setModal(null);
  }, [route]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4500);
    return () => clearTimeout(timer);
  }, [toast]);
  const notify = (s: string) => setToast(s);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      notify("Copied. Share only with someone you trust.");
    } catch {
      setModal({
        title: "Copy this demo link",
        body: (
          <>
            <p>
              Your browser couldn’t copy automatically. Select and copy the text
              below.
            </p>
            <textarea aria-label="Text to copy" readOnly value={text} />
            <Button onClick={() => setModal(null)}>Done</Button>
          </>
        ),
      });
    }
  };
  const changePlan = (id: string, fn: (p: Plan) => Plan) =>
    setState((s) => ({
      ...s,
      plans: s.plans.map((p) => (p.id === id ? fn(p) : p)),
    }));
  const confirm = (
    title: string,
    description: string,
    label: string,
    action: () => void,
    danger = true,
  ) =>
    setModal({
      title,
      body: (
        <>
          <p>{description}</p>
          <div className="modal-actions">
            <Button variant="secondary" onClick={() => setModal(null)}>
              Keep as is
            </Button>
            <Button
              variant={danger ? "danger" : ""}
              onClick={() => {
                action();
                setModal(null);
              }}
            >
              {label}
            </Button>
          </div>
        </>
      ),
    });
  const openPlan = (p: Plan) =>
    go(
      `/${p.status === "confirmed" ? "date" : p.status === "completed" ? "reflect" : "invite"}/${p.id}`,
    );
  const repeat = (person: Person) => {
    setRecipient(person);
    go("/create");
  };
  const blockPair = (person: Person) =>
    setState((s) => ({
      ...s,
      connections: [
        ...s.connections.map((c) =>
          belongs(c, actor) && belongs(c, person)
            ? { ...c, ended: true, blockedBy: actor }
            : c,
        ),
        ...(!s.connections.some((c) => belongs(c, actor) && belongs(c, person))
          ? [
              {
                id: newId(),
                a: actor,
                b: person,
                ended: true,
                blockedBy: actor,
                contact: [],
              },
            ]
          : []),
      ],
      plans: s.plans.map((p) =>
        belongs(p, actor) &&
        belongs(p, person) &&
        ["pending", "agreement", "confirmed"].includes(p.status)
          ? { ...p, status: "cancelled" }
          : p,
      ),
    }));
  const isBlocked = (p: { a: Person; b: Person }) =>
    state.connections.some(
      (c) => c.blockedBy && belongs(c, p.a) && belongs(c, p.b),
    );
  const report = (person: Person) =>
    setModal({
      title: `Report a concern about ${person}`,
      body: (
        <Report
          person={person}
          onSave={(reason, reported) => {
            setState((s) => ({
              ...s,
              reports: [...s.reports, { by: actor, person: reported, reason }],
            }));
            setModal(null);
            notify(
              "Demo report recorded locally. Nothing has been sent to a moderation team.",
            );
          }}
        />
      ),
    });
  const safety = (person: Person) =>
    setModal({
      title: "Your comfort comes first",
      body: (
        <>
          <p>
            You can leave a plan or connection without giving a reason. In this
            demo, blocking and reporting affect fictional local data only.
          </p>
          <RowButton
            title={`Report ${person}`}
            detail="Record a demo concern locally"
            onClick={() => report(person)}
          />
          <RowButton
            title={`Block ${person}`}
            detail="End the connection and cancel open plans in this demo"
            onClick={() =>
              confirm(
                `Block ${person}?`,
                "This closes your demo plans together and removes the connection. No notification is sent.",
                "Block",
                () => {
                  blockPair(person);
                  go("/dates");
                  notify("Connection blocked in this demo.");
                },
              )
            }
          />
        </>
      ),
    });
  const own = state.plans.filter((p) => belongs(p, actor));
  const activeConnections = state.connections.filter(
    (c) => belongs(c, actor) && !c.ended,
  );
  const testControl = (
    <div className="demo-bar">
      <span>
        <span className="demo-dot" /> Fictional prototype{" "}
        <span className="desktop-only">· All changes stay in this browser</span>
      </span>
      <label>
        Testing as{" "}
        <select
          aria-label="Prototype participant"
          value={actor}
          onChange={(e) => {
            const next = e.target.value as Person;
            setState((s) => ({ ...s, actor: next }));
            setRecipient(undefined);
            notify(`Now viewing as ${next}.`);
            if (route === "/create") go("/dates");
          }}
        >
          {people.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
    </div>
  );
  const tutorial = () =>
    setModal({
      title: "A plan, without the pressure",
      body: (
        <div className="how-it-works">
          {[
            [
              "01",
              "Make a clear invitation",
              "Choose a public place, a few times and a comfortable budget.",
            ],
            [
              "02",
              "Agree together",
              "Your date chooses independently. Nothing is confirmed until arrangements work for you both.",
            ],
            [
              "03",
              "Keep the connection",
              "After meeting, privately choose whether to meet again. Only mutual interest is revealed.",
            ],
          ].map(([n, t, d]) => (
            <div key={n}>
              <span>{n}</span>
              <section>
                <h3>{t}</h3>
                <p>{d}</p>
              </section>
            </div>
          ))}
          <PrivacyNotice>
            This is a local demo. Links are simulated, there is no identity
            verification, and web screenshots cannot be blocked.
          </PrivacyNotice>
          <Button onClick={() => setModal(null)}>
            Sounds good <Check size={17} />
          </Button>
        </div>
      ),
    });
  let content: ReactNode;
  if (route === "/welcome")
    content = (
      <div className="welcome">
        <div className="welcome-copy">
          <p className="eyebrow">Less anxiety. More dating.</p>
          <h1 tabIndex={-1}>
            Dating,
            <br />
            without
            <br />
            the <em>drama.</em>
          </h1>
          <p className="welcome-lead">
            Make plans, protect your privacy and keep dating without the
            pressure of endless messaging.
          </p>
          <div className="welcome-actions">
            <Button
              onClick={() => {
                setState((s) => ({ ...s, onboarded: true }));
                go("/dates");
              }}
            >
              Get started <ArrowRight size={18} />
            </Button>
            <Button variant="text" onClick={tutorial}>
              How it works <ArrowUpRight size={17} />
            </Button>
          </div>
          <ul className="benefit-list">
            <li>
              <Check />
              Keep your number private.
            </li>
            <li>
              <Check />
              Make plans without endless chat.
            </li>
            <li>
              <Check />
              Date at your own pace.
            </li>
          </ul>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <span className="art-flower">
            <Flower2 size={75} strokeWidth={1} />
          </span>
          <div className="illustration-card">
            <span className="eyebrow">Something to look forward to</span>
            <div className="coffee-scene">
              <div className="cup cup-one" />
              <div className="cup cup-two" />
              <span className="coffee-star">✳</span>
            </div>
            <div className="illustration-card-bottom">
              <span className="avatar">A</span>
              <div>
                <strong>Coffee with Alex</strong>
                <p>Saturday, 2:00 pm · Brighton</p>
              </div>
              <span className="circle-check">
                <Check size={18} />
              </span>
            </div>
          </div>
          <div className="floating-note">
            <ShieldCheck size={19} /> Just a plan. No pressure.
          </div>
          <span className="art-caption">
            A little clarity.
            <br />A little more possibility.
          </span>
        </div>
      </div>
    );
  else if (route === "/dates") {
    const counts: Record<string, Plan[]> = {
      Upcoming: own.filter((p) => p.status === "confirmed"),
      "Needs you": own.filter(
        (p) => ["pending", "agreement"].includes(p.status) && p.turn === actor,
      ),
      "Awaiting response": own.filter(
        (p) => ["pending", "agreement"].includes(p.status) && p.turn !== actor,
      ),
      Completed: own.filter((p) => p.status === "completed"),
      Archived: own.filter(closed),
    };
    content = (
      <>
        <PageHeading
          eyebrow="A little something to look forward to"
          title={`Your plans, ${alias}.`}
          action={
            <Button
              onClick={() => {
                setRecipient(undefined);
                go("/create");
              }}
            >
              <Plus size={18} /> Create invitation
            </Button>
          }
        >
          Real connections. Clear plans. All at your own pace.
        </PageHeading>
        <div className="dashboard-banner">
          <div className="banner-symbol">
            <Coffee size={38} strokeWidth={1.25} />
          </div>
          <div>
            <p className="eyebrow">Less scrolling, more living</p>
            <h2>A date starts with a simple plan.</h2>
            <p>No phone numbers or endless messages needed.</p>
          </div>
          <Flower2 className="banner-flower" size={100} strokeWidth={0.7} />
        </div>
        <div className="section-head">
          <h2>
            My dates <span className="count-label">{own.length}</span>
          </h2>
          <button className="text-link" onClick={() => go("/connections")}>
            Your connections <ArrowUpRight size={16} />
          </button>
        </div>
        <div className="tabs" role="tablist" aria-label="Date status">
          {statusTabs.map((t) => (
            <button
              key={t}
              role="tab"
              id={`tab-${t.replaceAll(" ", "-")}`}
              aria-selected={tab === t}
              aria-controls="date-panel"
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  e.preventDefault();
                  const i = statusTabs.indexOf(t),
                    next =
                      statusTabs[(i + (e.key === "ArrowRight" ? 1 : 4)) % 5];
                  setTab(next);
                  document
                    .getElementById(`tab-${next.replaceAll(" ", "-")}`)
                    ?.focus();
                }
              }}
            >
              {t}
              <span>{counts[t].length}</span>
            </button>
          ))}
        </div>
        <section
          id="date-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab.replaceAll(" ", "-")}`}
        >
          <div className="cards-grid">
            {counts[tab].map((p) => (
              <DateCard
                key={p.id}
                plan={p}
                actor={actor}
                onOpen={() => openPlan(p)}
              />
            ))}
          </div>
          {!counts[tab].length && (
            <Empty
              title={
                tab === "Upcoming"
                  ? "A little space for your next plan."
                  : `No ${tab.toLowerCase()} dates right now.`
              }
              action={
                <Button
                  variant="secondary"
                  onClick={() => {
                    setRecipient(undefined);
                    go("/create");
                  }}
                >
                  Create an invitation
                </Button>
              }
            >
              There’s no rush. Make a plan when it feels right.
            </Empty>
          )}
        </section>
        <div className="bottom-reassurance">
          <ShieldCheck size={20} />
          <div>
            <strong>Your pace. Your boundaries.</strong>
            <p>No online status, read receipts or pressure to keep checking.</p>
          </div>
          <button className="text-link" onClick={() => go("/profile")}>
            Privacy settings <ChevronRight size={17} />
          </button>
        </div>
      </>
    );
  } else if (route === "/create")
    content = (
      <>
        <PageHeading
          eyebrow="Something good starts here"
          title={
            recipient
              ? `Another date with ${recipient}.`
              : "Make a little plan."
          }
        >
          A few details. A clear invitation. Room for you both to choose.
        </PageHeading>
        <Create
          key={`${actor}-${recipient}`}
          actor={actor}
          recipient={recipient}
          blocked={people.filter((person) =>
            isBlocked({ a: actor, b: person }),
          )}
          expiry={settings.expiry}
          onCreate={(p) => setState((s) => ({ ...s, plans: [...s.plans, p] }))}
          onCancel={() => go("/dates")}
          copy={copy}
        />
      </>
    );
  else if (
    route.startsWith("/invite/") ||
    route.startsWith("/date/") ||
    route.startsWith("/reflect/")
  ) {
    const p = state.plans.find((p) => p.id === route.split("/")[2]);
    if (!p)
      content = (
        <Empty
          title="This invitation isn’t available here."
          action={<Button onClick={() => go("/dates")}>Go to My Dates</Button>}
        >
          Demo links need the fictional data from the browser where they were
          created. This prototype has no invitation server.
        </Empty>
      );
    else if (!belongs(p, actor))
      content = (
        <Empty
          title="This isn’t your invitation."
          action={
            <Button
              onClick={() => {
                setState((s) => ({ ...s, actor: p.b }));
                notify(`Testing as ${p.b}.`);
              }}
            >
              Test as {p.b}
            </Button>
          }
        >
          Use the prototype participant control to view one side of this
          fictional plan. This is a demonstration, not secure access control.
        </Empty>
      );
    else if (p.status === "completed")
      content = (
        <Reflection
          plan={p}
          actor={actor}
          state={state}
          onReflect={(v) => setState((s) => reflect(s, p.id, actor, v))}
          onConnection={(c) => go(`/connection/${c.id}`)}
          onRepeat={() => repeat(other(p, actor))}
          onSafety={() => safety(other(p, actor))}
        />
      );
    else if (p.status === "confirmed")
      content = (
        <>
          <Back />
          <PageHeading
            eyebrow="A plan you both agreed on"
            title={`${p.type} with ${other(p, actor)}.`}
          >
            <Badge status="confirmed" />
          </PageHeading>
          <div className="detail-layout">
            <section className="panel">
              <div className="detail-hero">
                <Coffee size={44} strokeWidth={1.2} />
                <span>See you there.</span>
                <Flower2 size={48} strokeWidth={1} />
              </div>
              <PlanFacts plan={p} />
              <div className="summary-line">
                <span>Agreed payment arrangement</span>
                <strong>{paymentSummary(p, actor)}</strong>
              </div>
              {p.late && <div className="notice">{p.late}</div>}
              <div className="action-grid">
                <Button
                  variant="secondary"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.venue + " " + p.area)}`,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  <MapPin size={17} /> Directions
                </Button>
                <Button variant="secondary" onClick={() => downloadCalendar(p)}>
                  <CalendarDays size={17} /> Add to calendar
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setModal({
                      title: "Share with someone you trust",
                      body: (
                        <>
                          <p>
                            Review these details before sharing them outside
                            Datemate.
                          </p>
                          <div className="share-preview">
                            <strong>
                              {p.type} with {other(p, actor)}
                            </strong>
                            <p>{formatDate(p.selected)}</p>
                            <p>
                              {p.venue}, {p.area}
                            </p>
                          </div>
                          <p className="hint">
                            This copies the plan text. It does not notify anyone
                            or share your live location.
                          </p>
                          <Button
                            onClick={() =>
                              copy(
                                `${p.type} with ${other(p, actor)} · ${formatDate(p.selected)} · ${p.venue}, ${p.area}`,
                              )
                            }
                          >
                            <Copy size={17} /> Copy date details
                          </Button>
                        </>
                      ),
                    })
                  }
                >
                  <Shield size={17} /> Share date details
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    setModal({
                      title: "A little update, without the back-and-forth",
                      body: (
                        <>
                          <p>Choose an update for your fictional date.</p>
                          {["5 minutes", "10 minutes", "15 minutes"].map(
                            (t) => (
                              <RowButton
                                key={t}
                                title={`I’m running ${t} late`}
                                onClick={() => {
                                  changePlan(p.id, (x) => ({
                                    ...x,
                                    late: `${actor}: I’m running ${t} late.`,
                                  }));
                                  setModal(null);
                                  notify(
                                    "Update added to your shared demo plan.",
                                  );
                                }}
                              />
                            ),
                          )}
                        </>
                      ),
                    })
                  }
                >
                  <Wind size={17} /> Running late
                </Button>
              </div>
              <div className="separated-actions">
                <Button
                  variant="text"
                  onClick={() =>
                    setModal({
                      title: "Suggest a new arrangement",
                      body: (
                        <Counter
                          plan={p}
                          onSave={(changes) => {
                            changePlan(p.id, (x) => ({
                              ...x,
                              ...changes,
                              status: "agreement",
                              approved: [actor],
                              turn: other(p, actor),
                              expires: Date.now() + settings.expiry * 3600000,
                              late: undefined,
                            }));
                            setModal(null);
                            go(`/invite/${p.id}`);
                            notify(
                              "New arrangement proposed. Both people need to agree again.",
                            );
                          }}
                        />
                      ),
                    })
                  }
                >
                  Reschedule
                </Button>
                <Button
                  variant="text danger-text"
                  onClick={() =>
                    confirm(
                      "Cancel this date?",
                      "You don’t need to give a reason. The fictional plan will be marked cancelled for both participants.",
                      "Cancel date",
                      () => {
                        changePlan(p.id, (x) => ({
                          ...x,
                          status: "cancelled",
                        }));
                        notify("Date cancelled. No explanation needed.");
                      },
                    )
                  }
                >
                  Cancel date
                </Button>
              </div>
            </section>
            <aside>
              <div className="panel aside-card">
                <ShieldCheck size={25} />
                <h3>A comfortable place to start.</h3>
                <p>
                  Meet in public, make your own travel arrangements and let
                  someone you trust know your plan.
                </p>
                <Button variant="text" onClick={() => safety(other(p, actor))}>
                  Safety & boundaries <ArrowUpRight size={16} />
                </Button>
              </div>
              <div className="testing-card">
                <p className="eyebrow">Prototype testing</p>
                <p>After your fictional date, explore what happens next.</p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    changePlan(p.id, (x) => ({ ...x, status: "completed" }));
                    go(`/reflect/${p.id}`);
                  }}
                >
                  Simulate date completed <Check size={16} />
                </Button>
              </div>
            </aside>
          </div>
        </>
      );
    else
      content = (
        <Invitation
          key={`${p.id}-${actor}-${p.status}-${p.selected}`}
          plan={p}
          actor={actor}
          clock={clock}
          settings={settings}
          onAgree={(pay, selected) => {
            const next = agree(p, actor, pay, selected);
            changePlan(p.id, () => next);
            if (next.status === "confirmed") go(`/date/${p.id}`);
            notify(
              next.status === "confirmed"
                ? "Your date is confirmed in this demo."
                : "Your response is saved in this demo.",
            );
          }}
          onCounter={() =>
            setModal({
              title: "Find an arrangement that works",
              body: (
                <Counter
                  plan={p}
                  onSave={(changes) => {
                    changePlan(p.id, (x) => ({
                      ...x,
                      ...changes,
                      status: "agreement",
                      approved: [actor],
                      turn: other(p, actor),
                      expires: Date.now() + settings.expiry * 3600000,
                    }));
                    setModal(null);
                    notify(
                      "Alternative proposed. Switch participants to review it.",
                    );
                  }}
                />
              ),
            })
          }
          onClose={(status) =>
            confirm(
              status === "revoked"
                ? "Revoke this invitation?"
                : "Decline this invitation?",
              status === "revoked"
                ? "The demo invitation will no longer be open."
                : "No explanation is needed. The invitation will close neutrally for both people.",
              status === "revoked" ? "Revoke invitation" : "Politely decline",
              () => changePlan(p.id, (x) => ({ ...x, status })),
            )
          }
          onExpire={() => {
            changePlan(p.id, (x) => ({
              ...x,
              expires: Date.now() - 1,
              status: "expired",
            }));
            notify("Invitation expired in this demo.");
          }}
          copy={() => copy(linkFor(p))}
          onSafety={() => safety(other(p, actor))}
        />
      );
  } else if (route === "/connections")
    content = (
      <>
        <PageHeading
          eyebrow="Keep the good thing going"
          title="Your connections."
        >
          More dates, on your terms. No need to exchange numbers.
        </PageHeading>
        <div className="section-head">
          <h2>
            Ongoing connections{" "}
            <span className="count-label">{activeConnections.length}</span>
          </h2>
          <span className="quiet-label">
            <ShieldCheck size={15} /> Mutual by choice
          </span>
        </div>
        {!activeConnections.length ? (
          <Empty
            title="A good connection takes two."
            action={
              state.connections.some((c) => !c.ended && belongs(c, "Priya")) ? (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setState((s) => ({ ...s, actor: "Priya" }));
                    notify("Viewing Priya’s fictional ongoing connection.");
                  }}
                >
                  Explore Priya’s sample connection
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => go("/dates")}>
                  Back to your plans
                </Button>
              )
            }
          >
            When you both want to meet again, your connection will appear here.
          </Empty>
        ) : (
          <div className="connections-grid">
            {activeConnections.map((c) => {
              const dates = own.filter((p) => belongs(p, other(c, actor))),
                last = dates
                  .filter((p) => p.status === "completed")
                  .sort((a, b) => b.selected.localeCompare(a.selected))[0],
                next = dates.find((p) => p.status === "confirmed"),
                pending = dates.find((p) =>
                  ["pending", "agreement"].includes(p.status),
                );
              return (
                <article className="panel connection-card" key={c.id}>
                  <div className="connection-top">
                    <span className="avatar large">{other(c, actor)[0]}</span>
                    <span className="badge confirmed">✓ Mutual connection</span>
                  </div>
                  <h2>{other(c, actor)}</h2>
                  <p className="muted">
                    {last
                      ? `Last date · ${formatDate(last.selected)}`
                      : "Your next chapter starts here."}
                  </p>
                  <div className="connection-plan">
                    <CalendarDays size={19} />
                    <p>
                      {next
                        ? `${next.type} · ${formatDate(next.selected)}`
                        : pending
                          ? "A new invitation is waiting."
                          : "A little space for your next plan."}
                    </p>
                  </div>
                  <div className="connection-actions">
                    <Button onClick={() => repeat(other(c, actor))}>
                      <Plus size={16} /> Suggest another date
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => go(`/connection/${c.id}`)}
                    >
                      View connection <ArrowRight size={16} />
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        <PrivacyNotice>
          Connections don’t share personal contact details. You can keep
          arranging dates here for as long as you both choose.
        </PrivacyNotice>
        {state.connections.some((c) => belongs(c, actor) && c.ended) && (
          <details className="archived-connections">
            <summary>Ended connections</summary>
            <p className="hint">
              These connections have closed. No private decisions are shown.
            </p>
            {state.connections
              .filter((c) => belongs(c, actor) && c.ended && !c.blockedBy)
              .map((c) => (
                <div className="summary-line" key={c.id}>
                  <span>{other(c, actor)}</span>
                  <span>Connection closed</span>
                </div>
              ))}
          </details>
        )}
      </>
    );
  else if (route.startsWith("/connection/")) {
    const c = state.connections.find(
      (c) => c.id === route.split("/")[2] && belongs(c, actor),
    );
    if (!c || c.ended)
      content = (
        <Empty
          title="This connection is closed or unavailable."
          action={
            <Button onClick={() => go("/connections")}>Your connections</Button>
          }
        >
          You’re in control of what comes next. No further action is needed.
        </Empty>
      );
    else {
      const person = other(c, actor),
        dates = own.filter((p) => belongs(p, person));
      content = (
        <>
          <Back to="/connections" label="Connections" />
          <PageHeading
            eyebrow="A connection, at your own pace"
            title={`You and ${person}.`}
            action={
              <Button onClick={() => repeat(person)}>
                <Plus size={18} /> Suggest another date
              </Button>
            }
          >
            Keep making plans here. Your number can stay yours.
          </PageHeading>
          <div className="detail-layout">
            <div>
              <section className="panel connection-intro">
                <span className="avatar large">{person[0]}</span>
                <div>
                  <h2>{person}</h2>
                  <span className="badge confirmed">
                    ✓ You both chose to keep dating
                  </span>
                </div>
              </section>
              <h2 className="spaced-heading">Upcoming & pending</h2>
              {dates
                .filter((p) =>
                  ["confirmed", "pending", "agreement"].includes(p.status),
                )
                .map((p) => (
                  <div key={p.id} className="compact-plan">
                    <div>
                      <Badge status={p.status} />
                      <h3>
                        {p.type} · {formatDate(p.selected)}
                      </h3>
                      <p>{p.venue}</p>
                    </div>
                    <Button variant="secondary" onClick={() => openPlan(p)}>
                      Review <ArrowRight size={16} />
                    </Button>
                  </div>
                ))}
              {!dates.some((p) =>
                ["confirmed", "pending", "agreement"].includes(p.status),
              ) && (
                <Empty title="Your next plan is up to you both.">
                  Suggest another date when you feel ready.
                </Empty>
              )}
              <h2 className="spaced-heading">Previous dates</h2>
              {dates
                .filter((p) => p.status === "completed")
                .map((p) => (
                  <div key={p.id} className="history-item">
                    <span className="history-dot" />
                    <div>
                      <strong>
                        {p.type} at {p.venue}
                      </strong>
                      <p>{formatDate(p.selected)}</p>
                      <Badge status="completed" />
                    </div>
                  </div>
                ))}
            </div>
            <aside className="panel aside-card">
              <ShieldCheck size={25} />
              <h3>Privacy, at your pace.</h3>
              <p>
                No contact details are shared automatically. You can arrange
                every date here.
              </p>
              <RowButton
                title="Contact exchange preferences"
                detail="Optional · requires mutual consent"
                onClick={() =>
                  setModal({
                    title: "Only if you both want to",
                    body: (
                      <>
                        <p>
                          This prototype never collects or displays real contact
                          details. You can simulate consent to a future contact
                          exchange.
                        </p>
                        <p>
                          {c.contact.includes(actor)
                            ? "You have opted in."
                            : "You haven’t opted in."}{" "}
                          {c.contact.includes(actor) &&
                          c.contact.includes(person)
                            ? "You have both opted in. No information has been shared."
                            : "Nothing is shared without mutual consent."}
                        </p>
                        <Button
                          onClick={() => {
                            setState((s) => ({
                              ...s,
                              connections: s.connections.map((x) =>
                                x.id === c.id
                                  ? {
                                      ...x,
                                      contact: x.contact.includes(actor)
                                        ? x.contact.filter((p) => p !== actor)
                                        : [...x.contact, actor],
                                    }
                                  : x,
                              ),
                            }));
                            setModal(null);
                            notify(
                              "Demo contact preference updated. No details collected or shared.",
                            );
                          }}
                        >
                          {c.contact.includes(actor)
                            ? "Withdraw my consent"
                            : "Simulate my consent"}
                        </Button>
                      </>
                    ),
                  })
                }
              />
              <RowButton
                title="Safety & reporting"
                onClick={() => safety(person)}
              />
              <button
                className="danger-link"
                onClick={() =>
                  confirm(
                    "End this connection?",
                    "Your open demo plans together will also close. You don’t need to give a reason. No private interest decision will be shown.",
                    "End connection",
                    () => {
                      setState((s) => endConnection(s, c.id, actor));
                      go("/connections");
                      notify("Connection closed. No further action is needed.");
                    },
                  )
                }
              >
                End connection
              </button>
            </aside>
          </div>
        </>
      );
    }
  } else if (route === "/profile")
    content = (
      <>
        <PageHeading
          eyebrow="Your pace. Your boundaries."
          title="Make yourself comfortable."
        >
          Simple preferences. Clear choices. You stay in control.
        </PageHeading>
        <Profile
          actor={actor}
          settings={settings}
          state={state}
          onSettings={(value) =>
            setState((s) => ({
              ...s,
              settings: { ...s.settings, [actor]: value },
            }))
          }
          notify={notify}
          onReport={() =>
            setModal({
              title: "Report a concern",
              body: (
                <Report
                  choosePerson
                  actor={actor}
                  person={other(
                    { a: actor, b: actor === "Alex" ? "Emma" : "Alex" },
                    actor,
                  )}
                  onSave={(reason, reported) => {
                    setState((s) => ({
                      ...s,
                      reports: [
                        ...s.reports,
                        { by: actor, person: reported, reason },
                      ],
                    }));
                    setModal(null);
                    notify("Demo report stored locally only.");
                  }}
                />
              ),
            })
          }
          onUnblock={(id) =>
            setState((s) => ({
              ...s,
              connections: s.connections.map((c) =>
                c.id === id ? { ...c, blockedBy: undefined } : c,
              ),
            }))
          }
          onExport={() =>
            download(
              "datemate-fictional-data.json",
              JSON.stringify(
                { ...state, exportNote: "Fictional local prototype data only" },
                null,
                2,
              ),
              "application/json",
            )
          }
          onDelete={() =>
            confirm(
              "Delete local demo data?",
              "This clears all plans, connections, reports and saved preferences from this browser and returns to the welcome screen. Datemate has no server account to delete.",
              "Delete demo data",
              () => {
                try {
                  localStorage.removeItem(storageKey);
                } catch {
                  /* Session state still clears if storage is unavailable. */
                }
                const fresh = initialState();
                fresh.plans = [];
                fresh.connections = [];
                setState(fresh);
                go("/welcome");
                notify("All local demo data cleared.");
              },
            )
          }
          onReset={() =>
            confirm(
              "Restore fictional examples?",
              "This replaces your current demo progress with the original sample dates and connections.",
              "Restore samples",
              () => {
                setState({ ...initialState(), onboarded: true, actor });
                notify("Fictional examples restored.");
              },
              false,
            )
          }
        />
      </>
    );
  else
    content = (
      <Empty
        title="This page isn’t here."
        action={<Button onClick={() => go("/dates")}>Go to My Dates</Button>}
      >
        Your plans are just a moment away.
      </Empty>
    );
  return (
    <>
      {testControl}
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Skip to content
      </a>
      <div
        className={
          route === "/welcome" ? "app-shell welcome-shell" : "app-shell"
        }
      >
        <aside className="sidebar">
          <button
            className="logo-button"
            aria-label="Datemate welcome"
            onClick={() => go("/welcome")}
          >
            <Logo />
          </button>
          {route !== "/welcome" && (
            <>
              <nav aria-label="Main navigation">
                {navs.map(({ path, label, Icon }) => (
                  <button
                    key={path}
                    className={
                      route === path ||
                      (path === "/dates" &&
                        /^\/(invite|date|reflect)\//.test(route)) ||
                      (path === "/connections" &&
                        route.startsWith("/connection/"))
                        ? "nav-item active"
                        : "nav-item"
                    }
                    aria-current={route === path ? "page" : undefined}
                    onClick={() => {
                      if (path === "/create") setRecipient(undefined);
                      go(path);
                    }}
                  >
                    <Icon size={20} />
                    {label}
                  </button>
                ))}
              </nav>
              <div className="sidebar-bottom">
                <div className="sidebar-quote">
                  <Flower2 size={32} strokeWidth={1} />
                  <p>
                    A little less pressure.
                    <br />A little more possibility.
                  </p>
                </div>
                <button className="help-link" onClick={tutorial}>
                  <HelpCircle size={18} /> How it works
                </button>
                <button
                  className="account-button"
                  onClick={() => go("/profile")}
                >
                  <span className="avatar small">{alias[0]}</span>
                  <span>
                    <strong>{alias}</strong>
                    <small>Fictional account</small>
                  </span>
                  <Settings2 size={16} />
                </button>
              </div>
            </>
          )}
        </aside>
        <div className="main-wrapper">
          <header className="mobile-header">
            <button
              className="logo-button"
              onClick={() => go("/welcome")}
              aria-label="Datemate welcome"
            >
              <Logo />
            </button>
            <span className="avatar small">{alias[0]}</span>
          </header>
          {warning && (
            <div role="alert" className="storage-warning">
              {warning}
              <button
                aria-label="Dismiss storage notice"
                onClick={() => setWarning("")}
              >
                <X size={17} />
              </button>
            </div>
          )}
          <main id="main-content" ref={mainRef} tabIndex={-1}>
            {content}
          </main>
          <footer>
            <span>Datemate · Dating, without the drama.</span>
            <span>
              Fictional demo. No real invitations or messages are sent.
            </span>
          </footer>
        </div>
      </div>
      {route !== "/welcome" && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navs.map(({ path, label, Icon }) => (
            <button
              key={path}
              className={route === path ? "active" : ""}
              onClick={() => {
                if (path === "/create") setRecipient(undefined);
                go(path);
              }}
            >
              <Icon size={21} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      )}
      {modal && (
        <Modal title={modal.title} onClose={() => setModal(null)}>
          {modal.body}
        </Modal>
      )}
      <div
        className={`toast ${toast ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast && (
          <>
            <Check size={18} />
            {toast}
          </>
        )}
      </div>
    </>
  );
}
function Back({
  to = "/dates",
  label = "My dates",
}: {
  to?: string;
  label?: string;
}) {
  return (
    <button className="back-link" onClick={() => go(to)}>
      <ArrowLeft size={16} /> {label}
    </button>
  );
}
function paymentSummary(p: Plan, actor: Person) {
  return p.pay[actor] === "50/50"
    ? "50/50 · Split the bill"
    : p.pay[actor] === "My treat"
      ? `${actor}’s treat`
      : `${other(p, actor)}’s treat`;
}
function Invitation({
  plan: p,
  actor,
  clock,
  onAgree,
  onCounter,
  onClose,
  onExpire,
  copy,
  onSafety,
}: {
  plan: Plan;
  actor: Person;
  clock: number;
  settings: Settings;
  onAgree: (pay: Payment, selected: string) => void;
  onCounter: () => void;
  onClose: (s: "revoked" | "declined") => void;
  onExpire: () => void;
  copy: () => void;
  onSafety: () => void;
}) {
  const [pay, setPay] = useState<Payment | undefined>(p.pay[actor]),
    [selected, setSelected] = useState(p.selected),
    [error, setError] = useState("");
  const terminal = closed(p) || p.expires <= clock;
  const mismatch =
    !!p.pay[p.a] && !!p.pay[p.b] && !compatible(p.pay[p.a], p.pay[p.b]);
  return (
    <>
      <Back />
      <PageHeading
        eyebrow={
          p.repeat
            ? "Keep a good connection going"
            : "An invitation, at your pace"
        }
        title={
          terminal
            ? "A little clarity. No loose ends."
            : `${p.type} with ${other(p, actor)}.`
        }
      >
        <Badge status={p.status} />
      </PageHeading>
      {terminal ? (
        <div className="narrow panel closed-panel">
          <span className="empty-icon">
            <Wind size={32} />
          </span>
          <h2>
            {p.status === "expired"
              ? "This invitation has expired."
              : p.status === "revoked"
                ? "This invitation was revoked."
                : p.status === "cancelled"
                  ? "This date has been cancelled."
                  : "This invitation is now closed."}
          </h2>
          <p>No further action is needed.</p>
          <Button variant="secondary" onClick={() => go("/dates")}>
            Back to your plans <ArrowRight size={17} />
          </Button>
        </div>
      ) : (
        <div className="detail-layout">
          <section className="panel invitation-panel">
            <div className="invitation-from">
              <span className="avatar">{p.a[0]}</span>
              <div>
                <span className="eyebrow">A simple invitation from {p.a}</span>
                <h2>{p.type}. Good company. No pressure.</h2>
              </div>
            </div>
            <PlanFacts plan={{ ...p, selected }} />
            {p.slots.length > 1 && (
              <fieldset className="time-options">
                <legend>Choose a proposed time</legend>
                {p.slots.map((s) => (
                  <label
                    className={`choice ${s === selected ? "selected" : ""}`}
                    key={s}
                  >
                    <input
                      type="radio"
                      name="selected-time"
                      checked={s === selected}
                      onChange={() => setSelected(s)}
                    />
                    {formatDate(s)}
                  </label>
                ))}
              </fieldset>
            )}
            <div className="summary-line">
              <span>{other(p, actor)}’s payment preference</span>
              <strong>{p.pay[other(p, actor)] || "Not selected yet"}</strong>
            </div>
            {mismatch && (
              <div className="notice">
                <strong>Let’s find what works for you both.</strong>
                <p>
                  You’ve selected different payment preferences. Would you like
                  to find an arrangement that works for you both?
                </p>
              </div>
            )}
            <PaymentCards
              value={pay}
              onChange={setPay}
              legend="Your payment preference"
            />
            <p className="hint">
              Both people choose independently. A plan is confirmed only when
              you agree on the details and compatible payment preferences.
            </p>
            {p.turn !== actor && (
              <div className="notice">
                Your proposal is saved. {other(p, actor)} can review it in their
                own time. You can revise your payment preference below.
              </div>
            )}
            {error && (
              <p role="alert" className="error">
                {error}
              </p>
            )}
            <div className="form-actions">
              <Button variant="secondary" onClick={onCounter}>
                Suggest alternative
              </Button>
              <Button
                onClick={() => {
                  if (!pay) {
                    setError(
                      "Choose your payment preference before responding.",
                    );
                    return;
                  }
                  if (!(new Date(selected).getTime() > Date.now())) {
                    setError(
                      "This proposed time has passed. Suggest another time before confirming.",
                    );
                    return;
                  }
                  setError("");
                  onAgree(pay, selected);
                }}
              >
                {p.turn === actor ? "Accept arrangement" : "Save preference"}{" "}
                <Check size={17} />
              </Button>
            </div>
            <div className="separated-actions">
              <Button
                variant="text"
                onClick={() => onClose(p.a === actor ? "revoked" : "declined")}
              >
                {p.a === actor ? "Revoke invitation" : "Politely decline"}
              </Button>
              <Button variant="text" onClick={copy}>
                <Link size={16} /> Copy demo link
              </Button>
            </div>
          </section>
          <aside>
            <section className="panel aside-card">
              <ShieldCheck size={26} />
              <h3>Room to choose.</h3>
              <p>
                There’s no pressure to respond. This invitation closes
                automatically after its expiry.
              </p>
              <p className="hint">
                Expires {formatDate(new Date(p.expires).toISOString())}. No read
                receipts are shown.
              </p>
              <Button variant="text" onClick={onSafety}>
                Safety & boundaries <ArrowUpRight size={16} />
              </Button>
            </section>
            <div className="testing-card">
              <p className="eyebrow">Prototype testing</p>
              <p>
                Switch participants in the top bar to respond as{" "}
                {other(p, actor)}.
              </p>
              <Button variant="secondary" onClick={onExpire}>
                Simulate invitation expiry
              </Button>
            </div>
          </aside>
        </div>
      )}
      <PrivacyNotice>
        This is a local prototype. Invitation links and access restrictions are
        simulated, not production security.
      </PrivacyNotice>
    </>
  );
}
function Counter({
  plan,
  onSave,
}: {
  plan: Plan;
  onSave: (changes: Partial<Plan>) => void;
}) {
  const [kind, setKind] = useState("time"),
    [time, setTime] = useState(slot(4, "18:00")),
    [venue, setVenue] = useState(plan.venue),
    [area, setArea] = useState(plan.area),
    [budget, setBudget] = useState(plan.budget),
    [type, setType] = useState(plan.type),
    [error, setError] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (
          kind === "time" &&
          (!time || new Date(time).getTime() <= Date.now())
        ) {
          setError("Choose a date and time in the future.");
          return;
        }
        if (kind === "location" && (venue.trim().length < 3 || !area.trim())) {
          setError("Add a public venue and town or area.");
          return;
        }
        onSave(
          kind === "time"
            ? { slots: [time], selected: time }
            : kind === "location"
              ? { venue: venue.trim(), area: area.trim() }
              : { budget, type },
        );
      }}
    >
      <p>
        No chat needed. Propose one clear change for the other person to review.
      </p>
      <label htmlFor="alternative">What would you like to change?</label>
      <select
        id="alternative"
        value={kind}
        onChange={(e) => setKind(e.target.value)}
      >
        <option value="time">Suggest another time</option>
        <option value="location">Suggest another location</option>
        <option value="arrangement">Suggest another arrangement</option>
      </select>
      {kind === "time" ? (
        <>
          <label htmlFor="new-time">
            Proposed date & time · your local time
          </label>
          <input
            id="new-time"
            type="datetime-local"
            value={time}
            onInput={(e) => setTime(e.currentTarget.value)}
          />
        </>
      ) : kind === "location" ? (
        <>
          <label htmlFor="new-venue">Public venue or meeting point</label>
          <input
            id="new-venue"
            maxLength={120}
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
          <label htmlFor="new-area">Town or area</label>
          <input
            id="new-area"
            maxLength={80}
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </>
      ) : (
        <>
          <label htmlFor="new-type">Date type</label>
          <select
            id="new-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {["Coffee", "Drinks", "Dinner", "Walk", "Activity"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <label htmlFor="new-budget">Budget per person</label>
          <select
            id="new-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            {["Under £10", "£10–£20", "£20–£40", "£40–£60", "£60+"].map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </>
      )}
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <div className="modal-actions">
        <Button type="submit">
          Propose alternative <ArrowRight size={16} />
        </Button>
      </div>
    </form>
  );
}
function Reflection({
  plan: p,
  actor,
  state,
  onReflect,
  onConnection,
  onRepeat,
  onSafety,
}: {
  plan: Plan;
  actor: Person;
  state: State;
  onReflect: (v: "yes" | "no") => void;
  onConnection: (c: Connection) => void;
  onRepeat: () => void;
  onSafety: () => void;
}) {
  const decision = p.interest[actor],
    both = !!p.interest[p.a] && !!p.interest[p.b],
    mutual = p.interest[p.a] === "yes" && p.interest[p.b] === "yes",
    connection = state.connections.find(
      (c) => belongs(c, p.a) && belongs(c, p.b) && !c.ended,
    ),
    person = other(p, actor);
  return (
    <>
      <Back />
      <div className="reflection panel">
        <span className="reflection-flower">
          <Flower2 size={62} strokeWidth={1} />
        </span>
        <p className="eyebrow">A moment for you</p>
        <h1 tabIndex={-1}>
          {!decision
            ? "Would you like to see them again?"
            : mutual && connection
              ? "It’s mutual!"
              : decision === "no" || both
                ? "This chapter is closed."
                : "Your choice is saved."}
        </h1>
        <p>
          {!decision
            ? `How did ${p.type.toLowerCase()} with ${person} feel? There’s no right answer, just yours.`
            : mutual && connection
              ? "You’d both like to meet again. Keep making plans, without needing to exchange numbers."
              : decision === "no" || both
                ? "Thank you for taking a moment. No further action is needed. Your individual decisions aren’t shared."
                : "We’ll only reveal interest if you both choose yes. You don’t need to keep checking."}
        </p>
        {!decision ? (
          <div className="reflection-actions">
            <Button onClick={() => onReflect("yes")}>
              Yes, I’d like to <ArrowRight size={17} />
            </Button>
            <Button variant="secondary" onClick={() => onReflect("no")}>
              Not this time
            </Button>
          </div>
        ) : mutual && connection ? (
          <div className="reflection-actions">
            <Button onClick={onRepeat}>
              <Plus size={17} /> Suggest another date
            </Button>
            <Button
              variant="secondary"
              onClick={() => onConnection(connection)}
            >
              View connection
            </Button>
          </div>
        ) : (
          <Button variant="secondary" onClick={() => go("/dates")}>
            Back to your plans
          </Button>
        )}
        <PrivacyNotice>
          Your answer stays private. A connection appears only when you both
          choose to meet again.
        </PrivacyNotice>
        <button className="text-link" onClick={onSafety}>
          Safety & boundaries <ArrowUpRight size={15} />
        </button>
      </div>
      <div className="testing-card narrow">
        <p className="eyebrow">Prototype testing</p>
        <p>
          Switch to {person} in the top bar to record their independent
          response. Try two yes responses, or a non-mutual outcome. Individual
          answers are never shown on the other participant’s screen.
        </p>
      </div>
    </>
  );
}
function Profile({
  actor,
  settings,
  state,
  onSettings,
  notify,
  onUnblock,
  onReport,
  onExport,
  onDelete,
  onReset,
}: {
  actor: Person;
  settings: Settings;
  state: State;
  onSettings: (s: Settings) => void;
  notify: (s: string) => void;
  onUnblock: (id: string) => void;
  onReport: () => void;
  onExport: () => void;
  onDelete: () => void;
  onReset: () => void;
}) {
  const [alias, setAlias] = useState(settings.alias),
    [error, setError] = useState("");
  useEffect(() => setAlias(settings.alias), [actor, settings.alias]);
  return (
    <div className="profile-layout">
      <div>
        <section className="panel settings-panel">
          <div className="section-icon">
            <UserRound size={22} />
            <h2>Your fictional profile</h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (alias.trim().length < 2 || alias.trim().length > 24) {
                setError("Use an alias between 2 and 24 characters.");
                return;
              }
              setError("");
              onSettings({ ...settings, alias: alias.trim() });
              notify("Display alias saved locally.");
            }}
          >
            <label htmlFor="alias">Display alias</label>
            <input
              id="alias"
              value={alias}
              maxLength={24}
              onChange={(e) => setAlias(e.target.value)}
            />
            <p className="hint">
              Use a fictional alias. Don’t enter your real name or contact
              details. Test participant IDs stay fixed so sample journeys remain
              easy to follow.
            </p>
            {error && (
              <p className="error" role="alert">
                {error}
              </p>
            )}
            <Button variant="secondary" type="submit">
              Save alias
            </Button>
          </form>
        </section>
        <section className="panel settings-panel">
          <div className="section-icon">
            <SlidersHorizontal size={22} />
            <h2>Your preferences</h2>
          </div>
          <label className="toggle-row">
            <span>
              <strong>Gentle plan updates</strong>
              <small>Demo preference only. No notifications are sent.</small>
            </span>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) =>
                onSettings({ ...settings, notifications: e.target.checked })
              }
            />
          </label>
          <label htmlFor="expiry">New invitation expiry</label>
          <select
            id="expiry"
            value={settings.expiry}
            onChange={(e) =>
              onSettings({ ...settings, expiry: Number(e.target.value) })
            }
          >
            <option value={24}>24 hours</option>
            <option value={48}>48 hours · recommended</option>
            <option value={72}>72 hours</option>
          </select>
          <p className="hint">
            Applies to new invitations. Unanswered plans close neutrally, with
            no chasing or read indicators.
          </p>
        </section>
        <section className="panel settings-panel">
          <div className="section-icon">
            <Shield size={22} />
            <h2>Boundaries & safety</h2>
          </div>
          <RowButton
            title="Report a concern"
            detail="Demo reports are local, not sent to a moderation team"
            onClick={onReport}
          />
          <h3 className="spaced-heading">Blocked connections</h3>
          {state.connections
            .filter((c) => c.blockedBy === actor)
            .map((c) => (
              <div className="summary-line" key={c.id}>
                <span>{other(c, actor)}</span>
                <Button
                  variant="small secondary"
                  onClick={() => {
                    onUnblock(c.id);
                    notify("Unblocked locally. The connection stays closed.");
                  }}
                >
                  Unblock
                </Button>
              </div>
            ))}
          {!state.connections.some((c) => c.blockedBy === actor) && (
            <p className="muted">No blocked connections.</p>
          )}
          <p className="hint">
            Blocking closes current demo plans. Unblocking does not restore an
            ended connection.
          </p>
        </section>
        <section className="panel settings-panel">
          <h2>Your demo data</h2>
          <RowButton
            title="Download fictional data"
            detail="Exports the complete local demo, including test participants"
            onClick={onExport}
          />
          <RowButton
            title="Restore sample journeys"
            detail="Replace demo progress with the original fictional examples"
            onClick={onReset}
          />
          <button className="danger-link" onClick={onDelete}>
            Delete account / clear local demo data
          </button>
        </section>
      </div>
      <aside>
        <section className="panel aside-card">
          <ShieldCheck size={26} />
          <h2>Privacy, explained honestly.</h2>
          <p>
            This demo stores fictional data in this browser’s local storage. All
            test participants share that storage. It has no sign-in, secure
            invitation access, real accounts or moderation service.
          </p>
          <p>
            Invitation expiry and revocation update local demo state only. Links
            don’t transfer data between devices.
          </p>
          <h3>Screenshots & recording</h3>
          <p>
            Web browsers cannot reliably prevent screenshots, recordings or
            external photography. No screenshot protection is active here.
          </p>
          <details>
            <summary>Future native privacy requirements</summary>
            <p>
              Android could use FLAG_SECURE on supported sensitive screens. iOS
              could detect active recording or screen sharing and obscure
              content where supported. Ordinary iOS screenshots cannot be
              reliably blocked.
            </p>
            <p>
              Future native privacy overlay: “Datemate limits access to your
              personal information and supports screen capture protection where
              available. No app can prevent every form of recording.”
            </p>
            <p>
              This is a design requirement for a future native app, not an
              implemented web feature.
            </p>
          </details>
          <div className="notice">
            <strong>No real dating information, please.</strong>
            <p>
              Explore with the fictional participants. No identities are
              verified.
            </p>
          </div>
        </section>
      </aside>
    </div>
  );
}
function Report({
  person,
  onSave,
  choosePerson = false,
  actor,
}: {
  person: Person;
  onSave: (r: string, p: Person) => void;
  choosePerson?: boolean;
  actor?: Person;
}) {
  const [reported, setReported] = useState(person),
    [reason, setReason] = useState("Uncomfortable behaviour");
  return (
    <>
      <p>
        Record a fictional concern about {reported}. No report will be sent, and
        no real moderation or emergency support is provided by this prototype.
      </p>
      {choosePerson && (
        <>
          <label htmlFor="report-person">Fictional participant</label>
          <select
            id="report-person"
            value={reported}
            onChange={(e) => setReported(e.target.value as Person)}
          >
            {people
              .filter((p) => p !== actor)
              .map((p) => (
                <option key={p}>{p}</option>
              ))}
          </select>
        </>
      )}
      <label htmlFor="report-reason">Concern</label>
      <select
        id="report-reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      >
        {[
          "Uncomfortable behaviour",
          "Privacy concern",
          "Inappropriate invitation",
          "Other safety concern",
        ].map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>
      <div className="modal-actions">
        <Button onClick={() => onSave(reason, reported)}>
          <Flag size={17} /> Save demo report
        </Button>
      </div>
    </>
  );
}
function download(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function downloadCalendar(p: Plan) {
  const date = new Date(p.selected),
    end = new Date(date.getTime() + 3600000),
    stamp = (d: Date) =>
      d
        .toISOString()
        .replace(/[-:]/g, "")
        .replace(/\.\d{3}/, "");
  const esc = (s: string) =>
    s
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  download(
    "datemate-date.ics",
    [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Datemate//Fictional demo//EN",
      "BEGIN:VEVENT",
      `UID:${p.id}@datemate.demo`,
      `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(date)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:${esc("Fictional demo: " + p.type + " date")}`,
      `LOCATION:${esc(p.venue + ", " + p.area)}`,
      "DESCRIPTION:Fictional Datemate prototype plan.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n"),
    "text/calendar",
  );
}
