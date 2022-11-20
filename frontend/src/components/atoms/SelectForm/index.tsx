import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { PropTypes } from './types';

/**
 * string 배열을 받아 선택하는 selectForm
 * labelName을 이용해 어떤것을 넣을지 표시 가능 (value에 적용되지는 않음)
 * width 나 height 등의 속성을 통해 css를 지정 가능하다
 *
 * @author jun
 */

const SelectForm = ({
  inputs,
  id,
  value,
  width,
  height,
  labelName,
  backgroundColor,
  changeHandler,
}: PropTypes) => {
  return (
    <Box
      sx={{
        minWidth: `${width || 6}rem`,
      }}
    >
      <FormControl fullWidth>
        <InputLabel id={id}>{labelName}</InputLabel>
        <Select
          sx={{
            borderRadius: '1rem',
            height: `${height || 3}rem`,
            backgroundColor: `${backgroundColor}`,
          }}
          autoWidth
          id={id}
          name={id}
          labelId={id}
          label={labelName}
          value={value?.[id]}
          onChange={e => changeHandler?.(e)}
        >
          {inputs.map(input => (
            <MenuItem value={input} key={input}>
              {input}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectForm;
