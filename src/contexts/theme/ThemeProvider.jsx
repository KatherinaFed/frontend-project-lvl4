import React, { useState } from 'react';

import ThemeContext from './ThemeContext.js';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(false);

  if (theme) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }

  const switchTheme = () => {
    setTheme((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
