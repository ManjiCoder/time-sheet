import styles from '@/styles/loader.module.css';
export default function Loader() {
  return (
    <div
      className={`${styles.loader} fixed min-h-screen w-full grid place-items-center`}
    ></div>
  );
}
