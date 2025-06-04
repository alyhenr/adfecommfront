import { FaShop, FaHandshake, FaUserShield } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: React.ElementType, 
  title: string, 
  description: string 
}) => (
  <div className="flex flex-col items-center p-6 bg-white rounded-sm border border-gray-100 hover:border-red-100 transition-all">
    <div className="w-12 h-12 flex items-center justify-center bg-red-50 rounded-sm mb-4">
      <Icon className="w-6 h-6 text-red-600" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: FaShop,
      title: t('about.features.selected.title'),
      description: t('about.features.selected.description'),
    },
    {
      icon: FaHandshake,
      title: t('about.features.commitment.title'),
      description: t('about.features.commitment.description'),
    },
    {
      icon: FaUserShield,
      title: t('about.features.trust.title'),
      description: t('about.features.trust.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-red-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-6">
              {t('about.hero.title')}
            </h1>
            <p className="text-lg text-red-50">
              {t('about.hero.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              {t('about.history.title')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('about.description')}
            </p>
            <p className="text-lg text-gray-600">
              {t('about.historyText')}
            </p>
            <p className="text-lg text-gray-600">
              {t('about.today')}
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-red-50 rounded-sm transform rotate-3"></div>
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
              alt={t('about.history.imageAlt')} 
              className="relative rounded-sm w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">2K+</div>
              <div className="text-red-100">{t('about.stats.customers')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-red-100">{t('about.stats.products')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-red-100">{t('about.stats.satisfaction')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-red-100">{t('about.stats.support')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;