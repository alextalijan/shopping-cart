import styles from './ShopItem.module.css';
import { useState } from 'react';
import { AnnouncerType } from '../Shop/Shop';

type PropTypes = {
  id: number;
  title: string;
  price: number;
  imageSrc: string;
  addToCart(
    id: number,
    title: string,
    imageSrc: string,
    price: number,
    amount: number,
  ): void;
  setAnnouncer: React.Dispatch<React.SetStateAction<AnnouncerType | null>>;
};

function ShopItem({
  id,
  title,
  price,
  imageSrc,
  addToCart,
  setAnnouncer,
}: PropTypes) {
  const [amount, setAmount] = useState(0);

  return (
    <div className={styles.card} data-testid="shop-item">
      <span className={styles.title}>{title}</span>
      <img src={imageSrc} alt="" className={styles.image} />
      <span className={styles.price}>
        <span className={styles['price-label']}>Price:</span> ${price}
      </span>
      <div className={styles['amount-section']}>
        <input
          className={styles['amount-input']}
          type="number"
          value={amount}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const input: number = parseInt(event.target.value);

            if (!Number.isNaN(input)) {
              setAmount(input);
            }
          }}
          min={0}
          data-testid="amount-input"
        />
        <button
          type="button"
          className={styles['increment-btn']}
          aria-label="Increment amount"
          onClick={() => setAmount((prev) => prev + 1)}
        >
          +
        </button>
        <button
          type="button"
          className={styles['decrement-btn']}
          aria-label="Decrement amount"
          onClick={() => {
            if (amount !== 0) {
              setAmount((prev) => prev - 1);
            }
          }}
        >
          -
        </button>
      </div>
      <button
        className={styles['add-to-cart-btn']}
        type="button"
        onClick={() => {
          if (amount > 0) {
            addToCart(id, title, imageSrc, price, amount);
            setAnnouncer({
              title: 'Success',
              text: "You've added this item to your cart.",
              type: 'good',
            });
          }
        }}
      >
        Add To Cart
      </button>
    </div>
  );
}

export default ShopItem;
