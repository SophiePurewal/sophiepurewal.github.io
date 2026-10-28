import { useEffect, useRef, type ReactNode } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  ShieldCheck,
  ChevronRight,
  Coffee,
  Wine,
  Utensils,
  Footprints,
  Sparkles,
  X,
  Check,
} from "lucide-react";
import {
  formatDate,
  other,
  paymentCopy,
  payments,
  type Person,
  type Plan,
  type Payment,
} from "./model";
export const typeIcons: Record<string, typeof Coffee> = {
  Coffee,
  Drinks: Wine,
  Dinner: Utensils,
  Walk: Footprints,
  Activity: Sparkles,
};
export function Logo() {
  return (
    <span className="logo">
      <svg width="31" height="31" viewBox="0 0 32 32" aria-hidden="true">
        <rect
          x="3"
          y="6"
          width="17"
          height="21"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <rect
          x="12"
          y="3"
          width="17"
          height="21"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
      datemate<span className="logo-dot">.</span>
    </span>
  );
}
export function Button({
  children,
  onClick,
  variant = "",
  disabled = false,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn ${variant} ${className}`}
    >
      {children}
    </button>
  );
}
export function Badge({ status }: { status: string }) {
  const names: Record<string, string> = {
    pending: "Awaiting response",
    agreement: "Needs agreement",
    confirmed: "Confirmed",
    completed: "Completed",
    expired: "Expired",
    declined: "Closed",
    revoked: "Revoked",
    cancelled: "Cancelled",
  };
  return (
    <span className={`badge ${status}`}>
      <span aria-hidden="true">
        {status === "confirmed" ? "✓" : status === "agreement" ? "↔" : "·"}
      </span>{" "}
      {names[status] || status}
    </span>
  );
}
export function PrivacyNotice({ children }: { children?: ReactNode }) {
  return (
    <div className="privacy-note">
      <ShieldCheck size={19} aria-hidden="true" />
      <p>
        {children ||
          "No phone numbers. No read receipts. Just a plan that works for you both."}
      </p>
    </div>
  );
}
export function Empty({
  title,
  children,
  action,
}: {
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="empty">
      <span className="empty-icon">
        <CalendarDays size={28} />
      </span>
      <h3>{title}</h3>
      <p>{children}</p>
      {action}
    </div>
  );
}
export function PaymentCards({
  value,
  onChange,
  legend = "How would you like to pay?",
}: {
  value?: Payment;
  onChange: (p: Payment) => void;
  legend?: string;
}) {
  return (
    <fieldset className="payment-field">
      <legend>{legend}</legend>
      <div className="payment-options">
        {payments.map((p) => (
          <label
            key={p}
            className={`payment-card ${value === p ? "selected" : ""}`}
          >
            <input
              type="radio"
              name={legend}
              value={p}
              checked={value === p}
              onChange={() => onChange(p)}
            />
            <span className="radio-dot" />
            <strong>{p}</strong>
            <small>{paymentCopy[p]}</small>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
export function PlanFacts({ plan }: { plan: Plan }) {
  return (
    <dl className="facts">
      <div>
        <dt>
          <CalendarDays size={19} /> When
        </dt>
        <dd>{formatDate(plan.selected)}</dd>
      </div>
      <div>
        <dt>
          <MapPin size={19} /> Where
        </dt>
        <dd>
          {plan.venue}
          <small>{plan.area} · Public meeting place</small>
        </dd>
      </div>
      <div>
        <dt>£ Approximate budget</dt>
        <dd>{plan.budget} per person</dd>
      </div>
    </dl>
  );
}
export function DateCard({
  plan,
  actor,
  onOpen,
}: {
  plan: Plan;
  actor: Person;
  onOpen: () => void;
}) {
  const Icon = typeIcons[plan.type] || Coffee;
  return (
    <article className="date-card">
      <div className={`date-art ${plan.type.toLowerCase()}`}>
        <Icon size={30} strokeWidth={1.4} />
        <span className="art-circle" />
      </div>
      <div className="date-card-body">
        <div className="card-top">
          <span className="eyebrow">
            {plan.repeat ? "Another lovely plan" : plan.type}
          </span>
          <Badge status={plan.status} />
        </div>
        <h3>
          {plan.type} with {other(plan, actor)}
        </h3>
        <p className="card-fact">
          <CalendarDays size={15} />
          {formatDate(plan.selected)}
        </p>
        <p className="card-fact">
          <MapPin size={15} />
          {plan.area}
        </p>
        <button className="card-link" onClick={onOpen}>
          {plan.status === "completed"
            ? "Reflect on your date"
            : plan.status === "confirmed"
              ? "View date details"
              : plan.status === "agreement"
                ? "Review arrangement"
                : plan.status === "pending" && plan.turn === actor
                  ? "Review invitation"
                  : "View invitation"}
          <ArrowUpRight size={19} />
        </button>
      </div>
    </article>
  );
}
export function PageHeading({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 tabIndex={-1}>{title}</h1>
        {children && <p className="subtitle">{children}</p>}
      </div>
      {action}
    </div>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.showModal();
    return () => {
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      aria-labelledby="modal-title"
    >
      <div className="modal-heading">
        <h2 id="modal-title">{title}</h2>
        <button
          className="icon-button"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Stepper({
  step,
  labels,
  onStep,
}: {
  step: number;
  labels: string[];
  onStep: (n: number) => void;
}) {
  return (
    <ol className="stepper" aria-label="Invitation progress">
      {labels.map((l, i) => (
        <li key={l} className={i === step ? "current" : i < step ? "done" : ""}>
          <button
            aria-current={i === step ? "step" : undefined}
            disabled={i > step}
            onClick={() => onStep(i)}
          >
            <span>{i < step ? <Check size={15} /> : i + 1}</span>
            <small>{l}</small>
          </button>
        </li>
      ))}
    </ol>
  );
}
export function RowButton({
  title,
  detail,
  onClick,
}: {
  title: string;
  detail?: string;
  onClick: () => void;
}) {
  return (
    <button className="row-button" onClick={onClick}>
      <span>
        <strong>{title}</strong>
        {detail && <small>{detail}</small>}
      </span>
      <ChevronRight size={19} />
    </button>
  );
}
