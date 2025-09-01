import React from "react";
import styles from "./expenses-chart.module.css";

function BarChart({ data }) {
  const P = 24, width = 640, height = 220;
  const max = Math.max(...data.map(d => d.value)) || 1;
  const barW = (width - P * 2) / data.length;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%">
      <line x1={P} y1={height - P} x2={width - P} y2={height - P} stroke="#d0d5dd" strokeWidth="1" />
      {data.map((d, i) => {
        const h = (d.value / max) * (height - P * 2);
        const x = P + i * barW + barW * 0.15;
        const y = height - P - h;
        const w = barW * 0.7;
        return (
          <g key={d.label}>
            <rect x={x} y={y} width={w} height={h} rx="6" fill="#2e87b2" />
            <text x={x + w / 2} y={height - P + 16} textAnchor="middle" fontSize="11" fill="#64748b">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function ExpensesChart({ data, title = "Expenses", subtitle = "Last 4 weeks" }) {
  return (
    <div className={styles.chartCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.sub}>{subtitle}</p>
      </div>
      <div className={styles.wrap}><BarChart data={data} /></div>
      <div className={styles.legend}><span className={styles.dot} />Weekly spend (₪)</div>
    </div>
  );
}
