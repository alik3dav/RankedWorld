import React, { useState } from 'react';
import { Crown, Users, Landmark, Lock, PlusCircle } from 'lucide-react';
import data from './data/data.json';
import ListItem from './components/ListItem';
import EditModal from './components/EditModal';
import { updateItem, deleteItem, addItem } from './utils/database';

type Category = 'richestPeople' | 'richestCountries' | 'mostFollowed';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('richestPeople');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [localData, setLocalData] = useState(data);

  const handleLogin = () => {
    if (password === data.adminPassword) {
      setIsAdmin(true);
      setPassword('');
    }
  };

  const handleEdit = (id: number) => {
    const item = localData[activeCategory].find((item: any) => item.id === id);
    setEditingItem(item);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (deleteItem(activeCategory, id)) {
        setLocalData((prev: any) => ({
          ...prev,
          [activeCategory]: prev[activeCategory].filter((item: any) => item.id !== id)
        }));
      }
    }
  };

  const handleSave = (updatedItem: any) => {
    if (isAddingNew) {
      if (addItem(activeCategory, updatedItem)) {
        setLocalData((prev: any) => ({
          ...prev,
          [activeCategory]: [...prev[activeCategory], { ...updatedItem, id: Math.max(...prev[activeCategory].map((i: any) => i.id)) + 1 }]
        }));
      }
    } else {
      if (updateItem(activeCategory, updatedItem.id, updatedItem)) {
        setLocalData((prev: any) => ({
          ...prev,
          [activeCategory]: prev[activeCategory].map((item: any) =>
            item.id === updatedItem.id ? updatedItem : item
          )
        }));
      }
    }
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 'richestPeople':
        return <Crown className="w-4 h-4" />;
      case 'richestCountries':
        return <Landmark className="w-4 h-4" />;
      case 'mostFollowed':
        return <Users className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Top Lists Dashboard</h1>
            {!isAdmin ? (
              <div className="flex gap-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                  className="px-3 py-1.5 text-sm border rounded-md"
                />
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-700 text-sm font-medium"
                >
                  <Lock className="w-4 h-4" />
                  Sign in
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAdmin(false)}
                className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex gap-1 mb-6">
          {(['richestPeople', 'richestCountries', 'mostFollowed'] as Category[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium ${
                activeCategory === category
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {getCategoryIcon(category)}
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </button>
          ))}
        </nav>

        <div className="bg-white border border-gray-200 rounded-md shadow-sm">
          <div className="py-2 px-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h2 className="text-sm font-medium text-gray-700 flex items-center gap-2">
              {getCategoryIcon(activeCategory)}
              {activeCategory.replace(/([A-Z])/g, ' $1').trim()}
            </h2>
            {isAdmin && (
              <button
                onClick={() => {
                  setIsAddingNew(true);
                  setEditingItem({});
                }}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
              >
                <PlusCircle className="w-4 h-4" />
                Add new
              </button>
            )}
          </div>
          <div className="divide-y divide-gray-200">
            {localData[activeCategory].map((item: any) => (
              <ListItem
                key={item.id}
                item={item}
                category={activeCategory}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </main>

      {(editingItem || isAddingNew) && (
        <EditModal
          item={editingItem}
          category={activeCategory}
          onClose={() => {
            setEditingItem(null);
            setIsAddingNew(false);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default App;