import styles from "./actions.module.css";
export default function Actions() {
  return (
    <div className={styles.actions}>
      <button className="btn btn-primary txt-main text-main--label">
        Show presets
      </button>
      <button className="btn btn-primary txt-main text-main--label">
        Get code
      </button>
    </div>
  );
}
