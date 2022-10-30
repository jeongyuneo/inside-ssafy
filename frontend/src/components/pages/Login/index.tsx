import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../atoms/Image';
import ButtonGroup from '../../molecules/ButtonGroup';
import CheckboxLabel from '../../molecules/CheckboxLabel';
import { StyledLogin, LoginPageWrapper, CheckboxLabelWrapper } from './styles';

/**
 * Login page 컴포넌트
 *
 * @author jojo
 */
const Login = () => {
  const navigate = useNavigate();

  const clickLogin = () => {
    console.log('login');
  };

  const clickJoin = () => {
    navigate('/join');
  };

  const buttonInfos = [
    {
      text: '로그인',
      clickHandler: clickLogin,
    },
    {
      text: '회원가입',
      clickHandler: clickJoin,
    },
  ];

  return (
    <StyledLogin>
      <LoginPageWrapper>
        <Image width={20} src="/images/iNSSA_logo.png" alt="logo" />
        <CheckboxLabelWrapper>
          <CheckboxLabel text="로그인 유지" id="keepLogin" />
        </CheckboxLabelWrapper>
        <ButtonGroup buttonInfos={buttonInfos} width={20} height={3} isColumn />
      </LoginPageWrapper>
    </StyledLogin>
  );
};

export default Login;
