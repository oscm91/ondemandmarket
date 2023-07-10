import styles from "./cocuy.module.scss";

/* eslint-disable-next-line */
export interface CocuyProps {}

export function Cocuy(props: CocuyProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Cocuy!</h1>
    </div>
  );
}

export default Cocuy;
