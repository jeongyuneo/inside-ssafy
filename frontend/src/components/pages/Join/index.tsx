import React, { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/Button';
import Text from '../../atoms/Text';
import ButtonGroup from '../../molecules/ButtonGroup';
import InputLabel from '../../molecules/InputLabel';
import {
  joinRequest,
  requestEmailToken,
  validateEmailToken,
} from './requestEmail';
import {
  StyledInputLabel,
  StyledbuttonGroup,
  StyledEmailWrap,
  ButtonWrap,
  TextWrap,
  JoinPageWrapper,
  InputLabelWrapper,
  BlankDiv,
} from './styles';
import { checkEmail, emailValidation, validateInput } from './validateInput';

/**
 * Join page 컴포넌트
 *
 * @author jun
 */

const Join = () => {
  const LABEL_FONT = 1;
  const TOKEN_TIMER = 60 * 5; // 초 * 분
  const textTypes = ['text', 'text', 'text', 'text', 'password', 'password'];
  const placeholder = [
    '이름을 입력하세요',
    '학번을 입력하세요',
    'user@gmail.com',
    '',
    '8자 이상 20자 이하로 입력하세요',
    '',
  ];
  const input_names = [
    'name',
    'studentNumber',
    'email',
    'validationToken',
    'password',
    'password_again',
  ];

  const [validated, setValidated] = useState(true);
  const [isInterval, setIsInterval] = useState(false);
  const [isButtonSleep, setisButtonSleep] = useState(true);
  const [isCertificate, setIsCertificate] = useState(false);
  const [timerName, setTimerName] = useState('');
  const [buttonName, setButtonName] = useState('인증 보내기');
  const [account, setAccount] = useState({
    name: '',
    studentNumber: '',
    email: '',
    validationToken: '',
    email_again: '',
    password: '',
    password_again: '',
  });

  //const navigate = useNavigate();

  const time = useRef(0);
  const timer = useRef(
    setInterval(() => {
      setIsInterval(false);
      clearInterval(timer.current);
      return;
    }, 1000 * 60 * 24),
  );
  // onChange Event함수 : Input으로 입력받은 값을 적용한다.
  const changeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const returnToken = () => {
    if (Math.floor((Date.now() - time.current) / 1000) > TOKEN_TIMER) {
      alert('인증이 만료되었습니다.');
      initToken();
      time.current = 0;
      setIsInterval(false);
      clearInterval(timer.current);
      return;
    }
    const timesub =
      TOKEN_TIMER - Math.floor((Date.now() - time.current) / 1000);
    setTimerName(Math.floor(timesub / 60) + ':' + (timesub % 60));
  };

  const initToken = () => {
    if (isCertificate) {
      return;
    }
    setTimerName('');
    setisButtonSleep(true); // 이메일 클릭 초기화
    setButtonName('인증 보내기');
  };

  // 인증을 보낸다.
  const sendCertificate = async () => {
    if (!emailValidation(account)) {
      return;
    }
    const getToken = await requestEmailToken(account);

    if (getToken) {
      setisButtonSleep(false);
      setIsCertificate(false);
      setButtonName('인증 재전송');
      setAccount(prev => {
        return {
          ...prev,
          validationToken: '',
        };
      });
      setAccount(prev => {
        return {
          ...prev,
          email_again: prev.email,
        };
      });
      time.current = Date.now();
      const timesub =
        TOKEN_TIMER + Math.floor((Date.now() - time.current) / 1000);
      if (!isInterval) {
        timer.current = setInterval(returnToken, 1000);
        setIsInterval(true);
      }
      setTimerName(Math.floor(timesub / 60) + ':' + (timesub % 60));
    } else {
      alert('이메일 전송에 실패하였습니다');
    }
  };

  const getCertificate = async () => {
    if (isButtonSleep) {
      alert(
        '<Error> :: 이메일 인증이 전송되지 않은채로 인증시도가 되었습니다.',
      );
      initToken();
      return;
    }
    if (!checkEmail(account)) {
      return;
    }
    const isValidated = await validateEmailToken(account);
    if (!isValidated) {
      alert('인증 실패');
      return;
    }
    alert('인증 성공하였습니다.');
    setIsInterval(false);
    clearInterval(timer.current);
    setIsCertificate(true);
    initToken();
  };

  const clickJoin = async () => {
    if (!validateInput(account)) {
      setValidated(false);
      return;
    }

    const isJoin = await joinRequest(account);
    if (!isJoin) {
      alert('회원가입에 문제가 생겼습니다.');
      return;
    }
    alert('회원가입 성공!');
    //navigate(-1);
  };

  const backToTheLogin = () => {
    //navigate(-1);
  };

  const buttonInfos = [
    {
      text: '회원가입',
      clickHandler: clickJoin,
    },
    {
      text: '나가기',
      clickHandler: backToTheLogin,
    },
  ];

  return (
    <StyledInputLabel>
      <JoinPageWrapper>
        <InputLabelWrapper>
          <InputLabel
            id={input_names[0]}
            name={input_names[0]}
            labelValue={'이름'}
            inputs={account}
            width={20}
            height={3}
            type={textTypes[0]}
            placeholder={placeholder[0]}
            labelFontSize={LABEL_FONT}
            changeHandler={changeInfo}
          />
          <InputLabel
            id={input_names[1]}
            name={input_names[1]}
            labelValue={'학번'}
            inputs={account}
            width={20}
            height={3}
            type={textTypes[1]}
            placeholder={placeholder[1]}
            labelFontSize={LABEL_FONT}
            changeHandler={changeInfo}
          />
          <StyledEmailWrap>
            <InputLabel
              id={input_names[2]}
              name={input_names[2]}
              labelValue={'이메일'}
              inputs={account}
              width={13}
              height={3}
              type={textTypes[2]}
              placeholder={placeholder[2]}
              readonly={!isButtonSleep}
              labelFontSize={LABEL_FONT}
              changeHandler={changeInfo}
            />
            <ButtonWrap>
              <Button clickHandler={sendCertificate} width={6} height={3}>
                {buttonName}
              </Button>
            </ButtonWrap>
          </StyledEmailWrap>
          <StyledEmailWrap>
            <InputLabel
              id={input_names[3]}
              name={input_names[3]}
              labelValue={'이메일 인증'}
              inputs={account}
              width={13}
              height={3}
              type={textTypes[3]}
              placeholder={placeholder[3]}
              disabled={isCertificate}
              labelFontSize={LABEL_FONT}
              changeHandler={changeInfo}
            />
            <TextWrap>
              <Text size={1} color={'blue'}>
                {timerName}
              </Text>
            </TextWrap>
            <ButtonWrap>
              <Button
                clickHandler={getCertificate}
                disabled={isButtonSleep}
                width={6}
                height={3}
              >
                인증하기
              </Button>
              {/* {isButtonSleep ? (
            <Button clickHandler={getCertificate} width={8} height={3}>
              인증
            </Button>
          ) : null} */}
            </ButtonWrap>
          </StyledEmailWrap>
          <InputLabel
            id={input_names[4]}
            name={input_names[4]}
            labelValue={'패스워드'}
            inputs={account}
            width={20}
            height={3}
            placeholder={placeholder[4]}
            type={textTypes[4]}
            labelFontSize={LABEL_FONT}
            changeHandler={changeInfo}
          />
          <InputLabel
            id={input_names[5]}
            name={input_names[5]}
            labelValue={'패스워드 확인'}
            inputs={account}
            width={20}
            height={3}
            placeholder={placeholder[5]}
            type={textTypes[5]}
            labelFontSize={LABEL_FONT}
            changeHandler={changeInfo}
          />
        </InputLabelWrapper>
        <StyledbuttonGroup>
          <ButtonGroup
            buttonInfos={buttonInfos}
            width={20}
            height={3}
            isColumn
          />
        </StyledbuttonGroup>
        <BlankDiv></BlankDiv>
      </JoinPageWrapper>
    </StyledInputLabel>
  );
};

export default Join;
