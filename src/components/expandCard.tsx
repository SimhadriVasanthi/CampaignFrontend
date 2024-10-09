import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Container,
  Collapse,
  Box,
  ListItemIcon,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { expandCardStyles } from "./styles/customStyles";
// import { expandCardStyles } from "./styles/customStyles";
// import { expandCardStyles } from "../components/styles/customStyles";

interface expandCardProps {
  title: string;
  children: React.ReactNode;
  imageUrl: string;
}

export default function ExpandCard({
  title,
  children,
  imageUrl,
}: expandCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        sx={[
          expandCardStyles.cardCollapse,
          {
            boxShadow: open ? "4px 4px 50px rgb(14 4 4 / 8%)" : 0,
          },
        ]}
      >
        <CardHeader
          onClick={() => setOpen(!open)}
          sx={{
            ...expandCardStyles.cardTitle,
            color: "#000",
          }}
          title={title}
          avatar={
            <Box
              sx={{
                ...expandCardStyles.cardImg,
              }}
            >
              <ListItemIcon
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#3b3f76",
                  fontWeight: 500,
                }}
              >
                {imageUrl}
              </ListItemIcon>
            </Box>
          }
          action={
            <IconButton
              onClick={() => setOpen(!open)}
              sx={{
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s",
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          }
        />
        <div>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            sx={expandCardStyles.cardContent}
          >
            <CardContent>
              <Container>{children}</Container>
            </CardContent>
          </Collapse>
        </div>
      </Card>
    </>
  );
}
