import React from 'react';
import logo from '../../images/avatar.jpeg';

import * as S from './styled';

const Logo = () => {
  return (<S.AvatarImage src={logo} alt="avatar" />);
};

export default Logo;
