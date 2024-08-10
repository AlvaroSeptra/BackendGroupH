import React from 'react';
import { useFormik } from 'formik';
import { supabase } from '../../utils/supabaseClient';

const EditProfile: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      location: '',
      userId: '', // Add userId to formik values
    },
    onSubmit: async (values) => {
      try {
        const { data, error } = await supabase.from('users').update({
          username: values.username,
          email: values.email,
          location: values.location,
        }).eq('id', formik.values.userId as string); // Change 'id' to 'userId'
        if (error) throw error;
        // Handle successful profile update
        console.log('Profile updated successfully:', data);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    },
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      const user = userData.user;
      formik.setValues({
        username: user?.user_metadata.username || '',
        email: user?.email || '',
        location: user?.user_metadata.location || '',
        userId: user?.id || '', // Add userId to formik values
      });
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Edit Profile</h1>
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
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;