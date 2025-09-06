import React, { useCallback } from "react";
import styles from "./AnimatedSearchBar.module.css";

/**
 * AnimatedSearchBar
 * Props:
 *  - value: string (controlled)
 *  - onChange: (value: string, event?: ChangeEvent) => void
 *  - onSubmit?: (value: string) => void  (fires on Enter)
 *  - placeholder?: string
 *  - accentColor?: string (CSS color; defaults to #1976d2)
 *  - className?: string (optional wrapper class)
 */
export default function AnimatedSearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search…",
  accentColor = "#1976d2",
  className = "",
}) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && onSubmit) onSubmit(value);
    },
    [onSubmit, value]
  );

  const handleChange = useCallback(
    (e) => {
      if (onChange) onChange(e.target.value, e);
    },
    [onChange]
  );

  return (
    <div
      className={`${styles.root} ${className}`}
      role="search"
      style={{ ["--search-accent"]: accentColor }}
    >
      <svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
        <rect className={styles.bar} />

        <g className={styles.magnifier}>
          <circle className={styles.glass} />
          <line className={styles.handle} x1="32" y1="32" x2="44" y2="44" />
        </g>

        <g className={styles.sparks}>
          <circle className={styles.spark} />
          <circle className={styles.spark} />
          <circle className={styles.spark} />
        </g>

        <g className={`${styles.burst} ${styles.patternOne}`}>
          <circle className={`${styles.particle} ${styles.circle}`} />
          <path className={`${styles.particle} ${styles.triangle}`} />
          <circle className={`${styles.particle} ${styles.circle}`} />
          <path className={`${styles.particle} ${styles.plus}`} />
          <rect className={`${styles.particle} ${styles.rect}`} />
          <path className={`${styles.particle} ${styles.triangle}`} />
        </g>
        <g className={`${styles.burst} ${styles.patternTwo}`}>
          <path className={`${styles.particle} ${styles.plus}`} />
          <circle className={`${styles.particle} ${styles.circle}`} />
          <path className={`${styles.particle} ${styles.triangle}`} />
          <rect className={`${styles.particle} ${styles.rect}`} />
          <circle className={`${styles.particle} ${styles.circle}`} />
          <path className={`${styles.particle} ${styles.plus}`} />
        </g>
        <g className={`${styles.burst} ${styles.patternThree}`}>
          <circle className={`${styles.particle} ${styles.circle}`} />
          <rect className={`${styles.particle} ${styles.rect}`} />
          <path className={`${styles.particle} ${styles.plus}`} />
          <path className={`${styles.particle} ${styles.triangle}`} />
          <rect className={`${styles.particle} ${styles.rect}`} />
          <path className={`${styles.particle} ${styles.plus}`} />
        </g>
      </svg>

      <input
        type="search"
        name="q"
        aria-label="Search products"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
