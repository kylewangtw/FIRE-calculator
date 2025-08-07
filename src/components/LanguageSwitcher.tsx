import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitcher: React.FC = () => {
  const { language, t, setLanguage } = useLanguage();

  return (
    <div className="flex items-center justify-center space-x-2 text-sm">
      <span className="text-gray-600">{t.language}:</span>
      <button
        onClick={() => setLanguage('zh-TW')}
        className={`px-3 py-1 rounded-md transition-colors ${
          language === 'zh-TW'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        中文
      </button>
      <button
        onClick={() => setLanguage('en-US')}
        className={`px-3 py-1 rounded-md transition-colors ${
          language === 'en-US'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher; 