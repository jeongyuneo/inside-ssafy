import { Dispatch, SetStateAction } from 'react';

interface PropTypes {
  direction: string;
  busNum: number;
  setBusNum: Dispatch<SetStateAction<number>>;
}

const clickBusNumHandler = ({ direction, busNum, setBusNum }: PropTypes) => {
  if (
    (busNum === 1 && direction === 'left') ||
    (busNum === 6 && direction === 'right')
  ) {
    return;
  }

  direction === 'left'
    ? setBusNum(prev => prev - 1)
    : setBusNum(prev => prev + 1);
};

export default clickBusNumHandler;
