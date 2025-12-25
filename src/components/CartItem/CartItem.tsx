import styles from './CartItem.module.css';

type PropTypes = {
  id: number;
  title: string;
  imageSrc: string;
  price: number;
  amount: number;
  onClick(): void;
  handleAmountChange(action: string, id: number): void;
};

function CartItem({
  id,
  title,
  imageSrc,
  price,
  amount,
  onClick,
  handleAmountChange,
}: PropTypes) {
  return (
    <div className={styles.card} data-testid="cart-item">
      <span className={styles.title}>{title}</span>
      <button
        className={styles['remove-btn']}
        onClick={onClick}
        aria-label="Remove from cart"
      >
        x
      </button>
      <img className={styles.image} src={imageSrc} alt="" />
      <span className={styles.price}>Price: ${price * amount}</span>
      <div className={styles['amount-section']}>
        <span className={styles.amount}>Amount: {amount}</span>
        <button
          className={styles['increase-amount-btn']}
          aria-label="Increase amount"
          type="button"
          onClick={() => handleAmountChange('increment', id)}
        >
          +
        </button>
        <button
          className={styles['decrease-amount-btn']}
          aria-label="Decrease amount"
          type="button"
          onClick={() => handleAmountChange('decrement', id)}
        >
          -
        </button>
      </div>
    </div>
  );
}

export default CartItem;
