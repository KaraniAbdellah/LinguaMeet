
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import LanguageTag from './LanguageTag';

const LanguageFilters = ({ allLanguages, selectedLanguages, setSelectedLanguages, expanded, setExpanded }) => {
  const toggleLanguage = (language) => {
    setSelectedLanguages(prev => {
      if (prev.includes(language)) {
        return prev.filter(l => l !== language);
      } else {
        return [...prev, language];
      }
    });
  };

  const popularLanguages = ["English", "Spanish", "French", "Chinese", "German", "Japanese", "Arabic", "Hindi", "Russian"];
  const displayedLanguages = expanded ? allLanguages : popularLanguages;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium">Filter by Language</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setExpanded(!expanded)}
          className="text-xs flex items-center"
        >
          {expanded ? (
            <>Show Less <ChevronUp className="ml-1 h-4 w-4" /></>
          ) : (
            <>Show More <ChevronDown className="ml-1 h-4 w-4" /></>
          )}
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {displayedLanguages.map(language => (
          <div 
            key={language} 
            className="cursor-pointer" 
            onClick={() => toggleLanguage(language)}
          >
            <LanguageTag language={language} isActive={selectedLanguages.includes(language)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageFilters;
