import React from 'react';
import { useFormik } from 'formik';
import { supabase } from '../../utils/supabaseClient';

const AddVoucher: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      code: '',
      discount: '',
    },
    onSubmit: async (values) => {
      const { data: user } = await supabase.auth.getUser();
      try {
        const { data, error } = await supabase.from('vouchers').insert([
          {
            code: values.code,
            discount: parseFloat(values.discount),
            seller_id: user?.user?.id,
          },
        ]);
        if (error) throw error;
        // Handle successful voucher addition
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Add Voucher</h1>
        <input
          type="text"
          name="code"
          onChange={formik.handleChange}
          value={formik.values.code}
          placeholder="Voucher Code"
          className="w-full p-2 border mb-4"
        />
        <input
          type="text"
          name="discount"
          onChange={formik.handleChange}
          value={formik.values.discount}
          placeholder="Discount Percentage"
          className="w-full p-2 border mb-4"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Voucher</button>
      </form>
    </div>
  );
};

export default AddVoucher;