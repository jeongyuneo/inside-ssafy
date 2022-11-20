import React from 'react';
import { StyledBusLine } from './styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { PropTypes } from './types';

/**
 * 해당 호차의 전체 정류장 정보와 최근 도착 정류장을 받아 렌더링
 *
 * @author jojo
 */
const BusLine = ({ currentStop, busStops }: PropTypes) => {
  return (
    <StyledBusLine>
      <Stepper activeStep={currentStop} orientation="vertical">
        {busStops?.map((busStop, idx) => (
          <Step key={busStop + idx}>
            <StepLabel>{busStop}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </StyledBusLine>
  );
};

export default BusLine;
