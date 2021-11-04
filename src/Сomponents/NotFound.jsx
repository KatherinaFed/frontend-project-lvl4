import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h3>{t('errors.error404.head')}</h3>
      <p>{t('errors.error404.message')}</p>
    </div>
  );
};

export default NotFound;
