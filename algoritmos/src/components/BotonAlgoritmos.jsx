import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';

export default function SpeedDialTooltipOpen({ actions }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Backdrop open={open} />
        <SpeedDial
            ariaLabel="Algoritmos disponibles"
            sx={{ position: 'absolute', bottom:-100 , right: 16}}
            icon={<SpeedDialIcon icon={<EditIcon />} openIcon={<CloseIcon  />} />}
            FabProps={{
                sx: { bgcolor: 'rgb(226,188,157)', '&:hover': { bgcolor: 'rgb(188, 98, 112)' } }
              }}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
        >
            {actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                onClick={() => {
                action.action(); 
                handleClose(); 
                }}
            />
            ))}
        </SpeedDial>
    </Box>
  );
}
