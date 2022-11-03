import React, {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../atoms/Button';
import ButtonGroup from '../../molecules/ButtonGroup';
import InputLabel from '../../molecules/InputLabel';
import { requestEmailToken, validateEmailToken } from './requestEmail';
import {
  StyledInputLabel,
  StyledbuttonGroup,
  StyledEmailWrap,
  ButtonWrap,
} from './styles';
import { checkEmail, emailValidation, validateInput } from './validateInput';

/**
 * Join page 컴포넌트
 *
 * @author jun
 */

const Join = () => {
  const input_names = [
    'userName',
    'studentNum',
    'email',
    'validationToken',
    'userPw',
    'password_again',
  ];

  const [validated, setValidated] = useState(true);
  const [isClickEmail, setIsClickEmail] = useState(false);
  const [isCertificate, setIsCertificate] = useState(false);
  // const [second, setSecond] = useState(0);

  const [account, setAccount] = useState({
    userName: '',
    studentNum: '',
    email: '',
    validationToken: '',
    email_again: '',
    userPw: '',
    password_again: '',
  });

  //const navigate = useNavigate();

  // const time = useRef(300);
  // const timer = useRef(null);

  // const start = useCallback(() => {
  //   if (timer.current != null) {
  //     return;
  //   }
  //   timer.current = setInterval(() => {
  //     time.current -= 1;
  //     setSecond(time.current % 60);
  //   });
  // }, [time]);

  // onChange Event함수 : Input으로 입력받은 값을 적용한다.
  const changeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    console.log(account);
  };

  // 인증을 보낸다.
  const sendCertificate = async () => {
    if (!emailValidation(account)) {
      return;
    }
    const getToken = await requestEmailToken(account);

    if (getToken) {
      setIsClickEmail(true);
      setAccount(prev => {
        return {
          ...prev,
          email_again: prev.email,
        };
      });
    } else {
      alert('이메일 전송에 실패하였습니다');
    }
  };

  const getCertificate = () => {
    console.log(account.email);
    if (!isClickEmail) {
      alert(
        '<Error> :: 이메일 인증이 전송되지 않은채로 인증시도가 되었습니다.',
      );
      return;
    }
    if (!checkEmail(account)) {
      return;
    }
    const isValidated = validateEmailToken(account);
    if (!isValidated) {
      return;
    }
    setIsCertificate(true);
  };

  const clickJoin = () => {
    if (!validateInput(account)) {
      setValidated(false);
      return;
    }
    const joinAccount = {
      name: account.userName,
      password: account.userPw,
      email: account.email,
      studentId: account.studentNum,
    };
    /*
     * api연결
     */
  };

  const backToTheLogin = () => {
    //navigate(-1);
  };

  const LABEL_FONT = 1;
  const textTypes = ['text', 'text', 'text', 'text', 'password', 'password'];
  const placeholder = [
    '이름을 입력하세요',
    '학번을 입력하세요',
    'user@gmail.com',
    '',
    '8자 이상 20자 이하로 입력하세요',
    '',
  ];

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
          readonly={isClickEmail}
          labelFontSize={LABEL_FONT}
          changeHandler={changeInfo}
        />
        <ButtonWrap>
          <Button clickHandler={sendCertificate} width={6} height={3}>
            인증보내기
          </Button>
        </ButtonWrap>
      </StyledEmailWrap>
      <StyledEmailWrap>
        <InputLabel
          id={input_names[3]}
          name={input_names[3]}
          labelValue={'이메일 확인'}
          inputs={account}
          width={11}
          height={3}
          type={textTypes[3]}
          placeholder={placeholder[3]}
          disabled={isCertificate}
          labelFontSize={LABEL_FONT}
          changeHandler={changeInfo}
        />
        <ButtonWrap>
          {isClickEmail ? (
            <Button clickHandler={getCertificate} width={8} height={3}>
              인증
            </Button>
          ) : null}
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
      <StyledbuttonGroup>
        <ButtonGroup buttonInfos={buttonInfos} width={20} height={3} isColumn />
      </StyledbuttonGroup>
    </StyledInputLabel>
  );
};

export default Join;
