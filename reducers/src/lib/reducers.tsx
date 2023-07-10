import styles from "./reducers.module.scss";

/* eslint-disable-next-line */
export interface ReducersProps {}

export function Reducers(props: ReducersProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Reducers!</h1>
    </div>
  );
}

export default Reducers;
