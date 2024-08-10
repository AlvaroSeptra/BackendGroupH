import React from 'react';

const CartItem: React.FC<{ item: any }> = ({ item }) => {
  return (
    <div className="border p-4 rounded shadow mb-4">
      <h2 className="text-xl font-bold">{item.products.name}</h2>
      <p>Quantity: {item.quantity}</p>
      <p>Price: {item.products.price} IDR</p>
    </div>
  );
};

export default CartItem;
