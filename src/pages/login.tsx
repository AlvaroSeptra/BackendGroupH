import React from 'react';
import { useFormik } from 'formik';
import { signInWithEmail } from '../utils/auth';

const LoginPage: React.FC = () => {
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (values) => {
      try {
        await signInWithEmail(values.email, values.password);
        // Redirect to dashboard based on role
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Login</h1>
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
