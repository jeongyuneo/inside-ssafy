import { Dispatch, SetStateAction } from 'react';

interface PropTypes {
  direction: string;
  allBusNums?: number[];
  busIdx: number;
  setBusIdx: Dispatch<SetStateAction<number>>;
}

const clickBusNumHandler = ({
  direction,
  allBusNums = [1, 2, 3, 4, 5, 6],
  busIdx,
  setBusIdx,
}: PropTypes) => {
  const firstIdx = 0;
  const lastIdx = allBusNums.length - 1;

  if (
    (busIdx === firstIdx && direction === 'left') ||
    (busIdx === lastIdx && direction === 'right')
  ) {
    return;
  }

  direction === 'left'
    ? setBusIdx(prev => prev - 1)
    : setBusIdx(prev => prev + 1);
};

export default clickBusNumHandler;
