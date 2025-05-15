import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  variantType?: 'primary' | 'secondary' | 'danger';
}

const CustomButton: React.FC<CustomButtonProps> = ({ variantType = 'primary', ...props }) => {
  let sxStyle = {};
  let hoverStyle = {};

  switch (variantType) {
    case 'secondary':
      sxStyle = { backgroundColor: 'purple', color: 'white' };
      hoverStyle = { backgroundColor: '#5e005e' };
      break;
    case 'danger':
      sxStyle = { backgroundColor: 'red', color: 'white' };
      hoverStyle = { backgroundColor: '#b20000' };
      break;
    default:
      sxStyle = { backgroundColor: 'blue', color: 'white' };
      hoverStyle = { backgroundColor: '#003399' };
  }

  return (
    <Button
      sx={{
        ...sxStyle,
        transition: 'transform 0.1s, background-color 0.2s',
        '&:hover': {
          ...hoverStyle,
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
      }}
      variant="contained"
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;