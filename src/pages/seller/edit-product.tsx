import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { supabase } from '../../utils/supabaseClient';

const EditProduct: React.FC = () => {
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
      if (error) console.error(error);
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || '',
      quantity: product?.quantity || '',
      category: product?.category || '',
    },
    onSubmit: async (values) => {
      try {
        const { data, error } = await supabase.from('products').update({
          name: values.name,
          description: values.description,
          price: parseFloat(values.price),
          quantity: parseInt(values.quantity, 10),
          category: values.category,
        }).eq('id', id);
        if (error) throw error;
        // Handle successful product update
      } catch (error) {
        console.error(error);
      }
    },
  });

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Edit Product</h1>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Product Name"
          className="w-full p-2 border mb-4"
        />
        <textarea
          name="description"
          onChange={formik.handleChange}
          value={formik.values.description}
          placeholder="Product Description"
          className="w-full p-2 border mb-4"
        />
        <input
          type="text"
          name="price"
          onChange={formik.handleChange}
          value={formik.values.price}
          placeholder="Product Price"
          className="w-full p-2 border mb-4"
        />
        <input
          type="text"
          name="quantity"
          onChange={formik.handleChange}
          value={formik.values.quantity}
          placeholder="Quantity"
          className="w-full p-2 border mb-4"
        />
        <select
          name="category"
          onChange={formik.handleChange}
          value={formik.values.category}
          className="w-full p-2 border mb-4"
        >
          <option value="">Select Category</option>
          <option value="ecofriendly">Ecofriendly</option>
          <option value="organic">Organic</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
