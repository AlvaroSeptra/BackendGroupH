import React, { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';

const SellerDashboard: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]); // Perubahan di sini

  useEffect(() => {
    const fetchSellerProducts = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser(); // Perubahan di sini
      if (userError) {
        console.error(userError);
        return;
      }
      const userId = user?.user?.id; // Perubahan di sini
      const { data, error } = await supabase.from('products').select('*').eq('seller_id', userId);
      if (error) console.error(error);
      else setProducts(data as any[]); // Perubahan di sini
    };
    fetchSellerProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerDashboard;