import React, { useEffect, useRef } from 'react';
import { StyledTextarea } from './styles';
import { PropTypes } from './types';

/**
 * onChange 함수를 통해 이벤트 등록이 가능하다.
 * width, height 등 css 속성을 받아서 적용이 가능하다.
 *
 * @author jini
 */
const Textarea = ({ id, name, changeHandler, ...rest }: PropTypes) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  }, []);

  return (
    <StyledTextarea
      id={id}
      name={name}
      ref={ref}
      onChange={e => changeHandler?.(e)}
      {...rest}
    />
  );
};

export default Textarea;
