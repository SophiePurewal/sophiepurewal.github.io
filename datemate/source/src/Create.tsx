import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Link,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Button,
  PlanFacts,
  typeIcons,
  PrivacyNotice,
} from "./components";
import {
  newId,
  people,
  slot,
  type Person,
  type Plan,
} from "./model";
export default function Create({
  actor,
  recipient,
  expiry,
  onCreate,
  onCancel,
  copy,
  blocked = [],
}: {
  actor: Person;
  recipient?: Person;
  expiry: number;
  onCreate: (p: Plan) => void;
  onCancel: () => void;
  copy: (text: string) => void;
  blocked?: Person[];
}) {
  const [step, setStep] = useState(0),
    [kind, setKind] = useState("Coffee"),
    [to, setTo] = useState<Person>(
      recipient ||
        people.find((p) => p !== actor && !blocked.includes(p)) ||
        actor,
    ),
    [slots, setSlots] = useState([slot(3)]),
    [venue, setVenue] = useState(""),
    [area, setArea] = useState("Brighton"),
    [budget, setBudget] = useState("Mid"),
    [chooseForMe, setChooseForMe] = useState(false),
    [error, setError] = useState(""),
    [created, setCreated] = useState<Plan | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);
  const draft: Plan = {
    id: created?.id || "",
    a: actor,
    b: to,
    type: kind,
    slots,
    selected: slots[0],
    venue: venue.trim(),
    area,
    budget,
    pay: { [actor]: "50/50" },
    approved: [actor],
    status: "pending",
    turn: to,
    expires: Date.now() + expiry * 3600000,
    interest: {},
    repeat: !!recipient,
  };
  const check = () => {
    if (step === 0 && (actor === to || blocked.includes(to) || !kind))
      return "Choose a date type and a different fictional participant.";
    if (
      step === 1 &&
      (!slots.length ||
        slots.some((s) => !s || !(new Date(s).getTime() > Date.now())) ||
        new Set(slots).size !== slots.length)
    )
      return "Choose distinct dates and times in the future.";
    if (step === 2 && ((!chooseForMe && venue.trim().length < 3) || !area.trim()))
      return "Add a public venue or meeting point and a town or area.";
    return "";
  };
  const next = () => {
    const e = check();
    setError(e);
    if (!e) setStep(step + 1);
  };
  const generate = () => {
    if (slots.some((s) => !(new Date(s).getTime() > Date.now()))) {
      setError(
        "One of your proposed times is now in the past. Please update availability.",
      );
      setStep(1);
      return;
    }
    const p = { ...draft, id: newId() };
    onCreate(p);
    setCreated(p);
  };
  const url = created
    ? `${location.href.split("#")[0]}#/invite/${created.id}`
    : "";
  if (created)
    return (
      <div className="narrow">
        <div className="panel success-panel">
          <span className="success-icon">
            <Check size={34} />
          </span>
          <p className="eyebrow">A little less back-and-forth</p>
          <h2 className="success-title">Your invitation is ready.</h2>
          <p>A plan for you and {to}. There’s no rush to reply.</p>
          <PlanFacts plan={created} />
          <label htmlFor="invite-url">Simulated invitation link</label>
          <div className="link-field">
            <input id="invite-url" readOnly value={url} />
            <button
              className="icon-button"
              aria-label="Copy invitation link"
              onClick={() => copy(url)}
            >
              <Copy size={20} />
            </button>
          </div>
          <p className="hint">
            This link works with this browser’s fictional demo data only. It
            does not grant secure access or send an invitation.
          </p>
          <Button
            onClick={() => {
              location.hash = `/invite/${created.id}`;
            }}
          >
            View invitation <ArrowRight size={17} />
          </Button>
        </div>
      </div>
    );
  return (
    <div className="create-layout">
      <section className="panel create-panel minimal-create">
        <form
          key={step}
          onSubmit={(e) => {
            e.preventDefault();
            step === 3 ? generate() : next();
          }}
          noValidate
        >
          <p className="eyebrow">A little plan, together</p>
          <h2 ref={heading} tabIndex={-1}>
            {
              [
                "Would you like to make a plan?",
                "Find a little time for each other.",
                "Somewhere you’ll both feel comfortable.",
                "A lovely plan, all in one place.",
              ][step]
            }
          </h2>
          <p className="muted">
            {
              [
                "Start with a simple idea. You can change your mind later.",
                "Offer up to three times. Your date can choose what works.",
                "Choose a public venue or a recognisable public meeting point.",
                "Check the details before creating your simulated private link.",
              ][step]
            }
          </p>
          {step === 0 && (
            <>
              <label htmlFor="recipient">Fictional date’s alias</label>
              <select
                id="recipient"
                value={to}
                disabled={!!recipient}
                onChange={(e) => setTo(e.target.value as Person)}
              >
                {people
                  .filter((p) => p !== actor && !blocked.includes(p))
                  .map((p) => (
                    <option key={p}>{p}</option>
                  ))}
              </select>
              <fieldset>
                <legend>Date type</legend>
                <div className="type-grid">
                  {Object.entries(typeIcons).map(([name, Icon]) => (
                    <label
                      key={name}
                      className={`type-option ${kind === name ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={name}
                        checked={kind === name}
                        onChange={() => setKind(name)}
                      />
                      <Icon size={26} />
                      <strong>{name}</strong>
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}
          {step === 1 && (
            <>
              <fieldset>
                <legend>Proposed times · your local time</legend>
                {slots.map((s, i) => (
                  <div className="slot-input" key={i}>
                    <label htmlFor={`slot-${i}`}>
                      Option {i + 1}
                      <input
                        id={`slot-${i}`}
                        type="datetime-local"
                        value={s}
                        min={slot(0, "00:00")}
                        onInput={(e) =>
                          setSlots(
                            slots.map((x, j) =>
                              i === j ? e.currentTarget.value : x,
                            ),
                          )
                        }
                        aria-describedby={error ? "create-error" : undefined}
                      />
                    </label>
                    {slots.length > 1 && (
                      <button
                        type="button"
                        className="icon-button"
                        aria-label={`Remove option ${i + 1}`}
                        onClick={() =>
                          setSlots(slots.filter((_, j) => i !== j))
                        }
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </fieldset>
              {slots.length < 3 && (
                <Button
                  variant="secondary"
                  onClick={() => setSlots([...slots, slot(4 + slots.length)])}
                >
                  <Plus size={16} /> Add another time
                </Button>
              )}
            </>
          )}
          {step === 2 && (
            <>
              <label htmlFor="area">Town or area</label>
              <input
                id="area"
                maxLength={80}
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
              <fieldset className="venue-levels">
                <legend>What kind of place feels right?</legend>
                <div className="budget-options">
                  {["Low", "Mid", "High"].map((level) => (
                    <label className={`choice ${budget === level ? "selected" : ""}`} key={level}>
                      <input type="radio" name="level" checked={budget === level} onChange={() => setBudget(level)} />
                      {level}
                    </label>
                  ))}
                </div>
              </fieldset>
              <Button variant="secondary" onClick={() => {
                const ideas = budget === "Low"
                  ? ["The Flour Pot, Sydney Street", "Hove Lawns, café entrance", "Shelter Hall"]
                  : budget === "High"
                    ? ["Shelter Hall", "The Ivy in the Lanes", "The Flour Pot, Sydney Street"]
                    : ["Hove Lawns, café entrance", "The Flour Pot, Sydney Street", "Shelter Hall"];
                setVenue(ideas[Math.floor(Math.random() * ideas.length)]);
              }}>✳ Help me find a place</Button>
              <label htmlFor="venue">Public venue or meeting point</label>
              <input
                id="venue"
                maxLength={120}
                placeholder="e.g. The Flour Pot, Sydney Street"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                aria-describedby={error ? "create-error" : undefined}
              />
              <label className="leave-choice">
                <input type="checkbox" checked={chooseForMe} onChange={(e) => setChooseForMe(e.target.checked)} />
                I’ll let {to} choose the place
              </label>
              <div className="venue-suggestions">
                <span className="eyebrow">Brighton ideas</span>
                {[
                  "The Flour Pot, Sydney Street",
                  "Hove Lawns, café entrance",
                  "Shelter Hall",
                ].map((v) => (
                  <Button
                    key={v}
                    variant="small secondary"
                    onClick={() => {
                      setVenue(v);
                      setArea("Brighton");
                    }}
                  >
                    {v}
                  </Button>
                ))}
              </div>
              <PrivacyNotice>
                Use a public meeting place. Please don’t enter home addresses or
                live locations.
              </PrivacyNotice>
            </>
          )}
          {step === 3 && (
            <>
              <div className="review-heading">
                <span className="avatar">{to[0]}</span>
                <div>
                  <h3>
                    {kind} with {to}
                  </h3>
                  <p className="muted">
                    {recipient ? "A repeat date" : "A first date"}
                  </p>
                </div>
              </div>
              <PlanFacts plan={draft} />
              <p className="hint">
                Invitation expires after {expiry} hours. Both people must agree
                before the date is confirmed. You can revoke it at any time.
              </p>
              {slots.length > 1 && (
                <p className="hint">{slots.length} proposed times included.</p>
              )}
            </>
          )}
          {error && (
            <p className="error" id="create-error" role="alert">
              {error}
            </p>
          )}
          <div className="form-actions">
            <Button
              variant="text"
              onClick={() => (step ? setStep(step - 1) : onCancel())}
            >
              <ArrowLeft size={17} />
              {step ? "Back" : "Cancel"}
            </Button>
            <Button type="submit">
              {step === 3 ? (
                <>
                  <Link size={17} /> Generate invitation
                </>
              ) : (
                <>
                  Continue <ArrowRight size={17} />
                </>
              )}
            </Button>
          </div>
        </form>
      </section>
      <aside className="create-aside">
        <span className="mini-symbol">✳</span>
        <h3>
          Less planning.
          <br />
          More possibility.
        </h3>
        <p>
          A clear invitation gives you both room to choose, without the pressure
          of an open-ended conversation.
        </p>
        <div className="aside-line" />
        <p>
          <Check size={16} /> Only the details you need
        </p>
        <p>
          <Check size={16} /> No personal contact details
        </p>
        <p>
          <Check size={16} /> No pressure to reply
        </p>
      </aside>
    </div>
  );
}
