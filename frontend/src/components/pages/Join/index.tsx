import React, { ChangeEvent, useState } from 'react';
import Button from '../../atoms/Button';
import InputLabel from '../../molecules/InputLabel';
import { StyledInputLabel, StyledbuttonGroup } from './styles';
import { PropTypes } from './types';

const Join = ({ id }: PropTypes) => {
  const input_names = ['userId', 'userPw', 'email', 'address', 'studentNum'];
  const [account, setAccount] = useState({
    userId: '',
    userPw: '',
    email: '',
    address: '',
    studentNum: '',
  });

  const changeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setAccount(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const [btnInfo, setBtnInfo] = useState([
    {
      text: '가입',
      clickHandler: () => {
        console.log('가입 버튼을 클릭');
      },
    },
    {
      text: '취소',
      clickHandler: () => {
        console.log('취소 버튼을 클릭');
      },
    },
  ]);

  const labelfont = 0.3;
  return (
    <StyledInputLabel>
      <InputLabel
        id={input_names[0]}
        name={input_names[0]}
        inputs={account}
        labelValue={'아이디'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={input_names[1]}
        name={input_names[1]}
        inputs={account}
        changeHandler={changeInfo}
        type={'password'}
        labelValue={'패스워드'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={input_names[2]}
        name={input_names[2]}
        inputs={account}
        changeHandler={changeInfo}
        labelValue={'이메일'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={input_names[3]}
        name={input_names[3]}
        inputs={account}
        changeHandler={changeInfo}
        labelValue={'주소'}
        labelFontSize={labelfont}
      />
      <InputLabel
        id={input_names[4]}
        name={input_names[4]}
        inputs={account}
        changeHandler={changeInfo}
        labelValue={'학번'}
        labelFontSize={labelfont}
      />
      <StyledbuttonGroup>
        {btnInfo.map((info, index) => {
          return <Button key={info.text + index}>{info.text}</Button>;
        })}
      </StyledbuttonGroup>
    </StyledInputLabel>
  );
};

export default Join;
