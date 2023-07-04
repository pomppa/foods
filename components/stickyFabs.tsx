import React from 'react';
import { Fab } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const StickyFabs = ({ onEditClick, onBackClick }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        position: 'sticky',
        zIndex: 1,
        bottom: '16px',
        maxWidth: theme.breakpoints.values.md,
        margin: '0 auto',
      }}
    >
      <Fab
        aria-label="Edit"
        color="primary"
        onClick={onEditClick}
        style={{ marginBottom: '8px' }}
      >
        Edit
      </Fab>
      <Fab aria-label="Back" color="secondary" onClick={onBackClick}>
        Back
      </Fab>
    </div>
  );
};

export default StickyFabs;
