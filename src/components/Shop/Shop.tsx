import { useOutletContext } from 'react-router-dom';
import ShopItem from '../ShopItem/ShopItem';
import styles from './Shop.module.css';
import Announcer from '../Announcer/Announcer';
import { useState } from 'react';
import { OutletContextTypes } from '@/App.js';
import { ShopItemType } from '@/App.js';

export type AnnouncerType = {
  title: string;
  text: string;
  type: string;
};

function Shop() {
  const { shopItems, loadingShop, shopError, addToCart } =
    useOutletContext<OutletContextTypes>();
  const [announcer, setAnnouncer] = useState<AnnouncerType | null>(null);

  return (
    <>
      <h1 className={styles.h1}>Shop</h1>
      {loadingShop && <p className={styles.loading}>Loading...</p>}
      {shopError && <p className={styles.error}>{shopError}</p>}
      <div className={styles['shop-list']}>
        {shopItems.map((item: ShopItemType) => {
          return (
            <ShopItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              imageSrc={item.imageSrc}
              addToCart={addToCart}
              setAnnouncer={setAnnouncer}
            />
          );
        })}
      </div>
      {announcer && (
        <Announcer
          title={announcer.title}
          text={announcer.text}
          type={announcer.type}
          onFinish={() => setAnnouncer(null)}
        />
      )}
    </>
  );
}

export default Shop;
