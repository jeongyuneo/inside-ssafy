import React from 'react';
import Button from '../../atoms/Button';
import { StyledButtonGroup } from './styles';
import { PropTypes } from './types';

/**
 * buttonText들의 배열을 받아 Button 들의 list를 만든다.
 * isColumn을 받으면 버튼들이 세로로 나열된다.
 *
 * @author jojo
 */
const ButtonGroup = ({ buttonInfos, isColumn, ...rest }: PropTypes) => {
  return (
    <StyledButtonGroup isColumn={isColumn}>
      {buttonInfos?.map(({ text, clickHandler }, idx) => {
        return (
          <Button key={text + idx} clickHandler={clickHandler} {...rest}>
            {text}
          </Button>
        );
      })}
    </StyledButtonGroup>
  );
};

export default ButtonGroup;
