import React, { useState } from "react";
import { Card, CardContent, Typography, CardActions, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// 追加: カード全体のホバー状態を管理するContext
const CardHoverContext = React.createContext<{
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}>({
  hoveredIndex: null,
  setHoveredIndex: () => {},
});

interface CustomCardProps {
  title: string;
  description: string;
  actions?: React.ReactNode;
  index?: number; // 追加: カードのインデックス
}

export const CustomCardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <CardHoverContext.Provider value={{ hoveredIndex, setHoveredIndex }}>
      {children}
    </CardHoverContext.Provider>
  );
};

const CustomCard: React.FC<CustomCardProps> = ({
  title,
  description,
  actions,
  index = 0, // デフォルト値
}) => {
  const [expanded, setExpanded] = useState(false);
  const { hoveredIndex, setHoveredIndex } = React.useContext(CardHoverContext);

  // 自分以外がホバーされている場合はぼかす
  const isBlur = hoveredIndex !== null && hoveredIndex !== index;

  return (
    <Card
      sx={{
        minWidth: 275,
        mb: 2,
        transition: "box-shadow 0.3s, transform 0.3s, filter 0.3s",
        boxShadow: 1,
        filter: isBlur ? "blur(3px)" : "none",
        opacity: isBlur ? 0.7 : 1,
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-4px) scale(1.03)',
        },
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
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

export { CustomCard };
export default CustomCard;
