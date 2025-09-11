import React, { useMemo, useRef } from "react";
import styles from "./AddFavoriteButton.module.css";

/** Compact pill button with HOVER confetti */
export default function AddFavoriteButton({ text = "New Favorite", onClick }) {
  const btnRef = useRef(null);

  const sparks = useMemo(() => {
    return Array.from({ length: 14 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const r = 40 + Math.random() * 60;
      const dx = Math.cos(angle) * r;
      const dy = Math.sin(angle) * r;
      const size = 5 + Math.random() * 6;
      const hue = 200 + Math.floor(Math.random() * 160);
      const delay = (Math.random() * 0.15).toFixed(2) + "s";
      return { dx, dy, size, hue, delay };
    });
  }, []);

  return (
    <button
      ref={btnRef}
      type="button"
      className={styles.addBtn}
      aria-label={text}
      data-text={text}
      onClick={onClick}
    >
      <span className={styles.addBtnInner}>
        <span className={styles.plus} aria-hidden>+</span>
        <span className={styles.addText}>{text}</span>
      </span>

      <span className={styles.sparks} aria-hidden>
        {sparks.map((s, i) => (
          <span
            key={i}
            className={styles.spark}
            style={{
              "--tx": `${s.dx}px`,
              "--ty": `${s.dy}px`,
              "--size": `${s.size}px`,
              "--hue": s.hue,
              "--delay": s.delay,
            }}
          />
        ))}
      </span>
    </button>
  );
}
