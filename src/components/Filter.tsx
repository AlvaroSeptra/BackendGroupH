import React from 'react';

interface FilterProps {
  onFilter: (location: string, category: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const location = (document.getElementById('location-filter') as HTMLSelectElement).value;
    const category = (document.getElementById('category-filter') as HTMLSelectElement).value;
    onFilter(location, category);
  };

  return (
    <div className="flex space-x-4 mb-4">
      <select id="location-filter" onChange={handleFilter} className="p-2 border rounded">
        <option value="">Select Location</option>
        <option value="Jakarta Barat">Jakarta Barat</option>
        <option value="Jakarta Timur">Jakarta Timur</option>
        <option value="Jakarta Selatan">Jakarta Selatan</option>
        <option value="Jakarta Utara">Jakarta Utara</option>
        <option value="Jakarta Pusat">Jakarta Pusat</option>
      </select>

      <select id="category-filter" onChange={handleFilter} className="p-2 border rounded">
        <option value="">Select Category</option>
        <option value="ecofriendly">Ecofriendly</option>
        <option value="organic">Organic</option>
      </select>
    </div>
  );
};

export default Filter;
