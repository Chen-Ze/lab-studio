import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Divider, Fade, IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
};

interface FrontUiExperimentTabExperimentMenuProps {
  childrenConstructors: Array<(props: { onClick: () => void }) => JSX.Element>;
}

function FrontUiExperimentTabExperimentMenu(
  props: FrontUiExperimentTabExperimentMenuProps
) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <AddCircleOutlined color="primary" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby="add experiment menu"
        aria-describedby="add experiment menu"
      >
        <Fade in={open}>
          <Paper sx={style}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '80vh',
              }}
            >
              <Box
                sx={{
                  marginLeft: '10px',
                  height: 40,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexGrow: 0,
                }}
              >
                <Typography>Add Experiment</Typography>
                <IconButton aria-label="close" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  justifyItems: 'center',
                  overflowY: 'auto',
                }}
              >
                {props.childrenConstructors.map((childConstructor) =>
                  childConstructor({
                    onClick: () => {
                      handleClose();
                    },
                  })
                )}
              </Box>
              <Divider />
              <Box
                sx={{
                  height: 40,
                  flexGrow: 0,
                }}
              ></Box>
            </Box>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
}

export default FrontUiExperimentTabExperimentMenu;
export { FrontUiExperimentTabExperimentMenu as ExperimentMenu };
