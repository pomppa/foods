import React from 'react';
import { Box, CircularProgress, Fab } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import BackIcon from '@mui/icons-material/ArrowBack';

const StickyFabs = (props) => {
  const {
    primaryFabVisible,
    primaryFabDisabled,
    secondaryFabVisible,
    secondaryFabDisabled,
    onPrimaryClick,
    onSecondaryClick,
    isLoading,
    primaryFabIcon,
  } = props;

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        position: 'fixed',
        zIndex: 1,
        bottom: '16px',
        left: '90%',
        transform: 'translateX(-50%)',
        maxWidth: '90%',
        margin: '0 auto',
      }}
    >
      {primaryFabVisible && (
        <Fab
          aria-label="Save"
          color="primary"
          disabled={primaryFabDisabled}
          onClick={onPrimaryClick}
          style={{
            marginBottom: '8px',
            outline: 'none',
            backgroundColor: primaryFabDisabled
              ? 'rgba(255, 255, 255, 0.12)'
              : null, // maybe a bug, not always grey but hover color
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : primaryFabIcon ? (
            primaryFabIcon
          ) : (
            <SaveIcon />
          )}
        </Fab>
      )}
      {secondaryFabVisible && (
        <Fab
          disabled={secondaryFabDisabled}
          aria-label="Back"
          color="secondary"
          onClick={onSecondaryClick}
        >
          <BackIcon />
        </Fab>
      )}
    </Box>
  );
};

export default StickyFabs;
