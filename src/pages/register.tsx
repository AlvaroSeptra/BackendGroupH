import React from 'react';
import { useFormik } from 'formik';
import { signUpWithEmail } from '../utils/auth';

const RegisterPage: React.FC = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '', username: '', location: '', role: '' },
    onSubmit: async (values) => {
      try {
        await signUpWithEmail(values.email, values.password, values.username, values.location, values.role);
        // Redirect to dashboard based on role
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Register</h1>
        <input
          type="text"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          placeholder="Username"
          className="w-full p-2 border mb-4"
        />
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Email"
          className="w-full p-2 border mb-4"
        />
        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
          className="w-full p-2 border mb-4"
        />
        <select
          name="location"
          onChange={formik.handleChange}
          value={formik.values.location}
          className="w-full p-2 border mb-4"
        >
          <option value="">Select Location</option>
          <option value="Jakarta Barat">Jakarta Barat</option>
          <option value="Jakarta Timur">Jakarta Timur</option>
          <option value="Jakarta Selatan">Jakarta Selatan</option>
          <option value="Jakarta Utara">Jakarta Utara</option>
          <option value="Jakarta Pusat">Jakarta Pusat</option>
        </select>
        <select
          name="role"
          onChange={formik.handleChange}
          value={formik.values.role}
          className="w-full p-2 border mb-4"
        >
          <option value="">Select Role</option>
          <option value="seller">Seller</option>
          <option value="customer">Customer</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
