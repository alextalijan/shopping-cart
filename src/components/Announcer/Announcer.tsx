import styles from './Announcer.module.css';

type PropTypes = {
  title: string;
  text: string;
  type: string;
  onFinish(): void;
};

function Announcer({ title, text, type, onFinish }: PropTypes) {
  return (
    <div
      className={`${styles.announcer} ${styles[type]}`}
      onAnimationEnd={onFinish}
    >
      <span className={styles.title}>{title}</span>
      <p className={styles.text}>{text}</p>
    </div>
  );
}

export default Announcer;
