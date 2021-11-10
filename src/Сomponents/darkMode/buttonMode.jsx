import React from 'react';
import { Button } from 'react-bootstrap';

import { useTheme } from '../../contexts/hooks/index.js';
import darkMode from './themes.js';

const SwitchButton = () => {
  const { theme, switchTheme } = useTheme();
  const {
    dark,
    light,
    darkButton,
    lightButton,
  } = darkMode;

  return (
    <Button
      className={`btn-${theme ? dark : light} ms-2 btn-outline-primary`}
      onClick={switchTheme}
    >
      <span>{theme ? darkButton : lightButton}</span>
    </Button>
  );
};

export default SwitchButton;
