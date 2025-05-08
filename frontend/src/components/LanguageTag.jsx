
import React from 'react';
import { Badge } from '@/components/ui/badge';

const LanguageTag = ({ language, level, isActive = false }) => {
  const languageColors = {
    English: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Spanish: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    French: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    German: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200", 
    Italian: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Japanese: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    Korean: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    Chinese: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    Russian: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    Arabic: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    Hindi: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200",
    Bengali: "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
    Urdu: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200",
    Tamil: "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200",
    Telugu: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
    Vietnamese: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900 dark:text-fuchsia-200",
    Turkish: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    Indonesian: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    Nepali: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  };

  const variantClass = isActive ? "language-gradient text-white" : languageColors[language] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";

  return (
    <Badge className={`font-medium ${variantClass}`} variant="outline">
      {language}
      {level && <span className="ml-1 opacity-75">({level})</span>}
    </Badge>
  );
};

export default LanguageTag;
