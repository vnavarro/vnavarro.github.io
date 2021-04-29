import React from 'react';
import logo from '../../images/avatar.png';

import * as S from './styled';

const Logo = () => {
  return (<S.AvatarImage src={logo} alt="avatar" />);
};

export default Logo;
