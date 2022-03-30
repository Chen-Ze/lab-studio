import {
  SubroutineItemRenderer,
  SubroutineItemRendererProps,
} from '@lab-studio/front/feature/experiment-tab/routine-renderer';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SwipeVerticalOutlinedIcon from '@mui/icons-material/SwipeVerticalOutlined';
import { Card, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { injectable } from 'inversify';
import { WithDragHandle } from '../detailed-subroutines-renderer/detailed-subroutines-renderer';

@injectable()
export class DetailedSubroutineItemRenderer
  implements SubroutineItemRenderer<WithDragHandle>
{
  render(props: SubroutineItemRendererProps<WithDragHandle>) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div {...props.additional.dragHandleProps}>
              <SwipeVerticalOutlinedIcon fontSize="small" color="disabled" />
            </div>
            <IconButton onClick={props.onRemove}>
              <DeleteForeverOutlinedIcon color="error" fontSize="small" />
            </IconButton>
          </Box>
          {props.children}
        </CardContent>
      </Card>
    );
  }
}
