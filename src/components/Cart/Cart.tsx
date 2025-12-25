import { useOutletContext } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import styles from './Cart.module.css';
import { OutletContextTypes, CartItemType } from '@/App';

function Cart() {
  const { cart, setCart, removeFromCart } =
    useOutletContext<OutletContextTypes>();

  function handleAmountChange(type: string, id: number) {
    const item: CartItemType | undefined = cart.find((item) => item.id === id);
    let newCart;

    if (!item) return;

    if (type === 'increment') {
      newCart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount + 1 };
        }

        return item;
      });
    } else {
      if (item.amount > 1) {
        newCart = cart.map((item) => {
          if (item.id === id) {
            return { ...item, amount: item.amount - 1 };
          }

          return item;
        });
      } else {
        return;
      }
    }

    setCart(newCart);
  }

  return (
    <>
      <h1 className={styles.h1}>Your Cart</h1>
      <div className={styles['cart-list']}>
        {cart.length > 0 ? (
          cart.map((item: CartItemType) => {
            return (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.title}
                imageSrc={item.imageSrc}
                price={item.price}
                amount={item.amount}
                onClick={() => removeFromCart(item.id)}
                handleAmountChange={handleAmountChange}
              />
            );
          })
        ) : (
          <p className={styles['empty-cart-text']}>
            You have no items in the cart.
          </p>
        )}
      </div>
      {cart.length > 0 && (
        <div className={styles.checkout}>
          <span className={styles['total-price']}>
            TOTAL: $
            {cart
              .reduce((current, item) => {
                return item.price * item.amount + current;
              }, 0)
              .toFixed(1)}
          </span>
          <button type="button" className={styles['buy-btn']}>
            Buy
          </button>
        </div>
      )}
    </>
  );
}

export default Cart;
