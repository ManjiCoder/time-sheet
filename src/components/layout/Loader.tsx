import styles from '@/styles/loader.module.css';
export default function Loader() {
  return (
    <div className={`${styles.loader} fixed top-[-50%] left-[-50%]`}></div>
  );
}
