import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';

function Privacy() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h5" mt={2}>
          Privacy Policy
        </Typography>
        <Typography variant="body1" mt={2}>
          Welcome to Foods! This Privacy Policy explains how we collect, use,
          share, and protect your personal information. By using our app, you
          agree to the terms outlined in this policy.
        </Typography>
        <Typography variant="h6" mt={4}>
          1. Information We Collect
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Personal Information"
              secondary="This includes your name, email address and profile photo."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Usage Information"
              secondary="We collect data about how you interact with our app, such as the features you use and the actions you take."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Device Information"
              secondary="We may collect information about your device, such as its operating system, unique device identifiers, and mobile network information."
            />
          </ListItem>
        </List>
        <Typography variant="h6" mt={4}>
          2. How We Use Your Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Provide and Improve"
              secondary="We use your information to provide and improve our app's functionality and user experience."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Analyze App Usage"
              secondary="We analyze app usage to enhance performance and optimize features."
            />
          </ListItem>
        </List>
        <Typography variant="h6" mt={4}>
          3. Sharing Your Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Legal Requirements"
              secondary="We may disclose your information if required by law or to protect our rights, privacy, safety, or property."
            />
          </ListItem>
        </List>
        <Typography variant="body1" mt={4} mb={2}>
          Thank you for using Foods!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Privacy;
