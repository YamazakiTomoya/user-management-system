import React from "react";
import { Card, CardContent, Typography, CardActions } from "@mui/material";

interface CustomCardProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  actions,
}) => {
  

  return (
    <Card sx={{ minWidth: 275, mb: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" whiteSpace={"pre-line"}>
          {description}
        </Typography>
      </CardContent>
      {actions && (<CardActions>{actions}</CardActions>)}
    </Card>
  );
};

export default CustomCard;
