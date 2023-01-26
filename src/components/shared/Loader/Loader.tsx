import styles from './Loader.module.css';

export default function Loader() {
  // TODO: make it adaptive
  return (
    <div className={styles['lds-ring']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
