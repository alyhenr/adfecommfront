import { useTranslation } from 'react-i18next';
import brFlag from '../../assets/flags/br.svg';
import cnFlag from '../../assets/flags/cn.svg';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    {
      code: 'pt-BR',
      name: 'Português',
      bgColor: 'bg-green-700',
      flag: brFlag,
    },
    {
      code: 'zh-CN',
      name: '中文',
      bgColor: 'bg-red-700',
      flag: cnFlag,
    },
  ];

  const changeLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-2">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-md transition-colors ${
              i18n.language === language.code
                ? language.bgColor + ' text-white'  
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <img
              src={language.flag}
              alt={language.name}
              className="w-5 h-5 rounded-sm object-cover"
            />
            <span className="hidden lg:block text-sm font-medium">{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher; 