import { Grid, Typography } from '@mui/material';
import Link from 'next/link';
function Terms() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8}>
        <Typography variant="h5" mt={2}>
          Terms and Conditions
        </Typography>
        <Typography variant="h6" mt={4}>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" mt={2}>
          By using our app, you agree to abide by these Terms and Conditions.
        </Typography>
        <Typography variant="h6" mt={4}>
          2. User Content
        </Typography>
        <Typography variant="body1" mt={2}>
          You are solely responsible for any content you post or submit through
          our app. By submitting content, you grant us a non-exclusive,
          royalty-free, perpetual, and worldwide license to use, display, and
          distribute your content.
        </Typography>
        <Typography variant="h6" mt={4}>
          3. Privacy Policy
        </Typography>
        <Typography variant="body1" mt={2}>
          Our Privacy Policy outlines how we collect, use, and protect your
          personal information. By using our app, you consent to the practices
          described in our{' '}
          <Link style={{ color: 'white' }} href="/privacy">
            <a
              style={{
                color: 'inherit',
                textDecoration: 'underline',
              }}
            >
              Privacy Policy
            </a>
          </Link>
          .
        </Typography>
        <Typography variant="h6" mt={4}>
          4. Intellectual Property
        </Typography>
        <Typography variant="body1" mt={2}>
          The content, design, and features of our app are protected by
          copyright, trademark, and other intellectual property laws. You may
          not use or reproduce our content without permission.
        </Typography>
        <Typography variant="h6" mt={4}>
          5. Limitation of Liability
        </Typography>
        <Typography variant="body1" mt={2}>
          We strive to provide accurate and reliable information through our
          app. However, we do not guarantee the accuracy or completeness of the
          content. We are not liable for any damages resulting from your use of
          our app.
        </Typography>
        <Typography variant="h6" mt={4}>
          6. Changes to Terms
        </Typography>
        <Typography variant="body1" mt={2}>
          We reserve the right to modify these Terms and Conditions at any time.
        </Typography>
        <Typography variant="body1" mt={4} mb={2}>
          Thank you for using Foods!
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Terms;
