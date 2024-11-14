import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

type EditModalProps = {
  item: any;
  category: string;
  onClose: () => void;
  onSave: (updatedItem: any) => void;
};

export default function EditModal({ item, category, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState(item);

  const fields = {
    richestPeople: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'netWorth', label: 'Net Worth', type: 'text', required: true },
      { name: 'company', label: 'Company', type: 'text', required: true },
      { name: 'image', label: 'Image URL', type: 'text', required: true },
      { name: 'age', label: 'Age', type: 'number' },
      { name: 'nationality', label: 'Nationality', type: 'text' },
      { name: 'industry', label: 'Industry', type: 'text' },
      { name: 'yearlyChange', label: 'Yearly Change', type: 'text' }
    ],
    richestCountries: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'gdpPerCapita', label: 'GDP Per Capita', type: 'text', required: true },
      { name: 'flag', label: 'Flag Emoji', type: 'text', required: true },
      { name: 'population', label: 'Population', type: 'text' },
      { name: 'continent', label: 'Continent', type: 'text' },
      { name: 'yearlyGrowth', label: 'GDP Growth', type: 'text' },
      { name: 'mainIndustries', label: 'Main Industries', type: 'text' }
    ],
    mostFollowed: [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'followers', label: 'Followers', type: 'text', required: true },
      { name: 'platform', label: 'Platform', type: 'text', required: true },
      { name: 'image', label: 'Image URL', type: 'text', required: true },
      { name: 'occupation', label: 'Occupation', type: 'text' },
      { name: 'nationality', label: 'Nationality', type: 'text' },
      { name: 'yearlyGrowth', label: 'Follower Growth', type: 'text' },
      { name: 'engagementRate', label: 'Engagement Rate', type: 'text' }
    ]
  }[category];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Edit {category.replace(/([A-Z])/g, ' $1').trim()}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                value={formData[field.name] || ''}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required={field.required}
              />
            </div>
          ))}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}