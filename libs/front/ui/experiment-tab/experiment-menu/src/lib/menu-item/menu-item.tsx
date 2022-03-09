import {
  Box,
  ButtonBase,
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Typography,
} from '@mui/material';
import styled from 'styled-components';

export interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

export function ExperimentMenuItem(props: MenuItemProps) {
  return (
    <Card elevation={0} sx={{ width: 120, height: 120 }}>
      <CardActionArea
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
        }}
        onClick={props.onClick}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            height: '100%',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {props.icon}
          </Box>
          <Typography variant="body2" color="ButtonText" textAlign="center">
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ExperimentMenuItem;
