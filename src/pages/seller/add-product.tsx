import React from 'react';
import { useFormik } from 'formik';
import { supabase } from '../../utils/supabaseClient';

const AddProduct: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: '',
    },
    onSubmit: async (values) => {
      const { data: userData, error: userError } = await supabase.auth.getUser(); // Updated method to get user
      if (userError) throw userError;
      const user = userData.user;
      try {
        const { data, error } = await supabase.from('products').insert([
          {
            name: values.name,
            description: values.description,
            price: parseFloat(values.price),
            quantity: parseInt(values.quantity, 10),
            category: values.category,
            seller_id: user?.id, // Access user id correctly
          },
        ]);
        if (error) throw error;
        // Handle successful product addition
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Add Product</h1>
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;