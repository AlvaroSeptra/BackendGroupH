import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CartItem from '../../components/CartItem';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);
  const [voucher, setVoucher] = useState('');
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      const user = await supabase.auth.getUser();
      if (!user || !user.data || !user.data.user) {
        console.error('User not authenticated');
        return;
      }
      const { data, error } = await supabase.from('cart').select('*, products(*)').eq('customer_id', user.data.user.id);
      if (error) console.error(error);
      else {
        setCartItems(data as never[]);
        calculateTotal(data);
      }
    };
    fetchCartItems();
  }, []);

  const calculateTotal = (items: any[]) => {
    let totalAmount = 0;
    items.forEach((item) => {
      totalAmount += item.products.price * item.quantity;
    });
    setTotal(totalAmount);
  };

  const applyVoucher = async () => {
    try {
      const { data, error } = await supabase.from('vouchers').select('*').eq('code', voucher).single();
      if (error) {
        console.error(error);
        return;
      }
      const discount = total * (data.discount / 100);
      setTotal(total - discount);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckout = async () => {
    try {
      const user = await supabase.auth.getUser();
      await supabase.from('cart').delete().eq('customer_id', user.data.user?.id);
      // Proceed to checkout
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cartItems.map((item: any) => (
          <CartItem key={item.id} item={item} />
        ))}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Voucher Code"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
            className="p-2 border w-full"
          />
          <button onClick={applyVoucher} className="bg-blue-500 text-white p-2 mt-2 w-full">Apply Voucher</button>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold">Total: {total} IDR</h2>
          <button onClick={handleCheckout} className="bg-green-500 text-white p-2 mt-2 w-full">Checkout</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;