import React from 'react';
import { Edit2, Trash2, ChevronDown } from 'lucide-react';
import { useState } from 'react';

type ListItemProps = {
  item: any;
  category: string;
  isAdmin: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ListItem({ item, category, isAdmin, onEdit, onDelete }: ListItemProps) {
  const [showDetails, setShowDetails] = useState(false);

  const renderOptionalInfo = () => {
    const optionalFields = {
      richestPeople: {
        age: 'Age',
        nationality: 'Nationality',
        industry: 'Industry',
        yearlyChange: 'Yearly Change'
      },
      richestCountries: {
        population: 'Population',
        continent: 'Continent',
        yearlyGrowth: 'GDP Growth',
        mainIndustries: 'Main Industries'
      },
      mostFollowed: {
        occupation: 'Occupation',
        nationality: 'Nationality',
        yearlyGrowth: 'Follower Growth',
        engagementRate: 'Engagement Rate'
      }
    }[category] || {};

    const hasOptionalInfo = Object.keys(optionalFields).some(field => item[field]);

    if (!hasOptionalInfo) return null;

    return (
      <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-2">
        {Object.entries(optionalFields).map(([field, label]) => (
          item[field] && (
            <div key={field}>
              <span className="font-medium">{label}:</span> {item[field]}
            </div>
          )
        ))}
      </div>
    );
  };

  const renderMainContent = () => {
    switch (category) {
      case 'richestPeople':
        return (
          <>
            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="ml-3 flex-grow">
              <div className="flex items-center">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                  ${item.netWorth}
                </span>
              </div>
              <p className="text-sm text-gray-600">{item.company}</p>
              {showDetails && renderOptionalInfo()}
            </div>
          </>
        );
      case 'richestCountries':
        return (
          <>
            <span className="text-2xl w-10 text-center">{item.flag}</span>
            <div className="ml-3 flex-grow">
              <div className="flex items-center">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                  GDP: ${item.gdpPerCapita}
                </span>
              </div>
              {showDetails && renderOptionalInfo()}
            </div>
          </>
        );
      case 'mostFollowed':
        return (
          <>
            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="ml-3 flex-grow">
              <div className="flex items-center">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  {item.followers}
                </span>
              </div>
              <p className="text-sm text-gray-600">{item.platform}</p>
              {showDetails && renderOptionalInfo()}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center py-3 px-4 hover:bg-gray-50 border-b border-gray-200 group">
      {renderMainContent()}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="p-1 text-gray-400 hover:text-gray-600"
        >
          <ChevronDown className={`w-4 h-4 transform transition-transform ${showDetails ? 'rotate-180' : ''}`} />
        </button>
        {isAdmin && (
          <div className="opacity-0 group-hover:opacity-100 flex gap-2">
            <button
              onClick={() => onEdit(item.id)}
              className="p-1 text-gray-500 hover:text-blue-600"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="p-1 text-gray-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}