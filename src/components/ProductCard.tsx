import React from 'react';

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: {product.price} IDR</p>
      <p>Quantity: {product.quantity}</p>
      <p>Category: {product.category}</p>
      <button className="bg-green-500 text-white p-2 mt-4">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
