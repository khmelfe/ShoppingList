import React from "react";
import { Box } from "@mui/material";
import styles from "./HeaderHero.module.css";

/** Animated RTL header (Hebrew text unchanged) */
export default function HeaderHero() {
  return (
    <Box className={styles.heroHeader} dir="rtl">
      <div className={styles.hbox}>
        <div className={styles.hTitle}>
          <span className={styles.hTitleBlock} aria-hidden />
          <h1 className={styles.h1}>
            מועדפים
            <span className={styles.hDot} aria-hidden />
          </h1>
        </div>

        <div className={styles.hRole}>
          <span className={styles.hRoleBlock} aria-hidden />
          <p className={styles.hSub}>
            תלחץ על כרטיס כדי לטעון את העגלה השמורה בחנות
          </p>
        </div>
      </div>
    </Box>
  );
}
