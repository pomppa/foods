import React from 'react';
import { CircularProgress, Fab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
      {primaryFabVisible && (
        <Fab
          aria-label="Save"
          color="primary"
          disabled={primaryFabDisabled}
          onClick={onPrimaryClick}
          style={{ marginBottom: '8px' }}
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
    </div>
  );
};

export default StickyFabs;
