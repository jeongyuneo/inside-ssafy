interface PropTypes {
  ALL_BUS_NUMS: number[];
  busNum?: number;
}

const calculateInitialBusIdx = ({ ALL_BUS_NUMS, busNum }: PropTypes) => {
  if (!busNum) {
    return 0;
  }
  return ALL_BUS_NUMS.findIndex(currBusNum => currBusNum === busNum);
};

export default calculateInitialBusIdx;
