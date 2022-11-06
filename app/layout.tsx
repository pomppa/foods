import RootStyleRegistry from './emotion';
import Layout from './mui-layout';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <html lang="en">
      <body>
        <RootStyleRegistry>
          <Layout>{children}</Layout>
        </RootStyleRegistry>
      </body>
    </html>
  );
}
