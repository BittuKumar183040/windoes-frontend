import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ToolTipNavbarProps = {
  anchorRef?: React.RefObject<HTMLElement | null>;
  children?: React.ReactNode;
  visible?: boolean;
  offset?: { x?: number; y?: number };
  className?: string;
  placement?: "top" | "bottom" | "left" | "right";
  openDelayMs?: number;
};

export default function ToolTipNavbar({
  anchorRef,
  children,
  visible = false,
  offset={ x:0, y: 16 },
  className = " bg-[#e6e4e4] text-black py-2.5 px-4",
  placement = "top",
  openDelayMs = 800,
}: ToolTipNavbarProps) {
  
  const elRef = useRef<HTMLDivElement | null>(null);
  const [delayedVisible, setDelayedVisible] = useState(false);

  const [style, setStyle] = useState<React.CSSProperties>({
    position: "absolute",
    top: 0,
    left: 0,
    visibility: "hidden",
  });

  const computePosition = () => {
    const anchor = anchorRef?.current;
    const el = elRef.current;
    if (!anchor || !el) {
      setStyle((s) => ({ ...s, visibility: "hidden" }));
      return;
    }

    const a = anchor.getBoundingClientRect();
    const e = el.getBoundingClientRect();

    let top = 0;
    let left = 0;

    switch (placement) {
      case "bottom":
        top = a.bottom + (offset.y ?? 0);
        left = a.left + (a.width - e.width) / 2 + (offset.x ?? 0);
        break;
      case "left":
        top = a.top + (a.height - e.height) / 2 + (offset.y ?? 0);
        left = a.left - e.width - (offset.x ?? 0);
        break;
      case "right":
        top = a.top + (a.height - e.height) / 2 + (offset.y ?? 0);
        left = a.right + (offset.x ?? 0);
        break;
      case "top":
      default:
        top = a.top - e.height - (offset.y ?? 0);
        left = a.left + (a.width - e.width) / 2 + (offset.x ?? 0);
        break;
    }

    const vw = document.documentElement.clientWidth;
    const vh = document.documentElement.clientHeight;

    left = Math.max(4, Math.min(left, vw - e.width - 0));
    top = Math.max(4, Math.min(top, vh - e.height - 0));

    setStyle({
      position: "absolute",
      top: Math.round(top + window.scrollY),
      left: Math.round(left + window.scrollX),
      visibility: delayedVisible ? "visible" : "hidden",
      zIndex: 9999,
    });
  };

  useEffect(() => {
    let timer: number | undefined;

    if (openDelayMs === 0) {
      setDelayedVisible(visible);
      return;
    }

    if (visible) {
      timer = window.setTimeout(() => {
        setDelayedVisible(true);
      }, openDelayMs);
    } else {
      setDelayedVisible(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [visible, openDelayMs]);

  useEffect(() => {
    if (!visible) {
      setStyle((s) => ({ ...s, visibility: "hidden" }));
      return;
    }
    computePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, placement, offset.x, offset.y, delayedVisible]);

  useEffect(() => {
    if (!visible) return;
    const onChange = () => computePosition();
    window.addEventListener("resize", onChange);
    window.addEventListener("scroll", onChange, { passive: true });
    return () => {
      window.removeEventListener("resize", onChange);
      window.removeEventListener("scroll", onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, placement, offset.x, offset.y]);

  if (typeof document === "undefined" || !document.body) return null;

  const tooltip = (
    <div
      ref={elRef}
      role="tooltip"
      aria-hidden={!delayedVisible}
      className={`flex flex-col rounded-lg text-lg shadow-md ${className}`}
      style={{
        ...style,
        opacity: delayedVisible ? 1 : 0,
        transition: "opacity 200ms ease",
        pointerEvents: delayedVisible ? "auto" : "none",
      }}
    >
      {children}
    </div>
  );

  return createPortal(tooltip, document.body);
}
