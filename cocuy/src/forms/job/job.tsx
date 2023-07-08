import styles from './job.module.scss';

/* eslint-disable-next-line */
export interface JobProps {}

export function Job(props: JobProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Job!</h1>
    </div>
  );
}

export default Job;
