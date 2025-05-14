import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  variantType?: 'primary' | 'secondary' | 'danger';
}

const CustomButton: React.FC<CustomButtonProps> = ({ variantType = 'primary', ...props }) => {
  let sxStyle = {};

  switch (variantType) {
    case 'secondary':
      sxStyle = { backgroundColor: 'purple', color: 'white'};
      break;
    case 'danger':
      sxStyle = { backgroundColor: 'red', color: 'white'};
      break;
    default:
      sxStyle = { backgroundColor: 'blue', color: 'white'};
  }

  return (
    <Button sx={sxStyle} variant="contained" {...props}>
      {props.children}
    </Button>
  );
};

export default CustomButton;