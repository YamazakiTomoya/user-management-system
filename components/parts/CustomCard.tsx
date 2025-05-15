import React, { useState } from "react";
import { Card, CardContent, Typography, CardActions, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

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
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        minWidth: 275,
        mb: 2,
        transition: "box-shadow 0.3s, transform 0.3s",
        boxShadow: 1,
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px) scale(1.03)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" whiteSpace={"pre-line"}>
          {description}
        </Typography>
      </CardContent>
      {actions && (
        <>
          <CardActions disableSpacing>
            <IconButton
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-label={expanded ? "アクションを折りたたむ" : "アクションを展開"}
              size="small"
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardActions>{actions}</CardActions>
          </Collapse>
        </>
      )}
    </Card>
  );
};

export default CustomCard;
