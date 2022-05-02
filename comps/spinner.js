import React from "react";
import styles from "../styles/Spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.loading_spinner}></div>
    </div>
  );
}
