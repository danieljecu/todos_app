import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const DIALOG_STYLE_ID = "app-dialog-styles";

const DIALOG_CSS = `
.app-dialog-overlay {
  background: hsla(0, 0%, 0%, 0.33);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 1300;
}
.app-dialog-content {
  width: 50vw;
  margin: 10vh auto;
  background: white;
  padding: 2rem;
  outline: none;
}
`;

export type DialogProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean;
  onDismiss?: () => void;
};

function ensureDialogStyles() {
  if (document.getElementById(DIALOG_STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = DIALOG_STYLE_ID;
  style.textContent = DIALOG_CSS;
  document.head.appendChild(style);
}

export function Dialog({
  isOpen = false,
  onDismiss,
  children,
  className,
  ...rest
}: DialogProps) {
  useEffect(() => {
    if (!isOpen) return;
    ensureDialogStyles();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onDismiss?.();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onDismiss]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="app-dialog-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onDismiss?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className={["app-dialog-content", className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
