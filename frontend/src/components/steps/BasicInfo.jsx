import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';
import { User, ChevronLeft, ChevronRight } from 'lucide-react';

export const BasicInfo = ({ userData, updateUser, onNext, onBack }) => {
  const { theme } = useTheme();
  const isValid = userData.name && userData.age && userData.height && userData.weight;

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${theme.text} flex items-center gap-2`}>
        <User className="w-6 h-6" /> Basic Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          placeholder="Your Name"
          value={userData.name}
          onChange={(e) => updateUser('name', e.target.value)}
          className="sm:col-span-2"
        />
        
        <Input
          type="number"
          placeholder="Age"
          value={userData.age}
          onChange={(e) => updateUser('age', e.target.value)}
        />
        
        <Select
          value={userData.gender}
          onChange={(e) => updateUser('gender', e.target.value)}
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
            { value: 'other', label: 'Other' }
          ]}
        />
        
        <Input
          type="number"
          placeholder="Height (cm)"
          value={userData.height}
          onChange={(e) => updateUser('height', e.target.value)}
        />
        
        <Input
          type="number"
          placeholder="Weight (kg)"
          value={userData.weight}
          onChange={(e) => updateUser('weight', e.target.value)}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="secondary" onClick={onBack} icon={ChevronLeft}>
          Back
        </Button>
        <Button onClick={onNext} disabled={!isValid} icon={ChevronRight}>
          Next
        </Button>
      </div>
    </div>
  );
};