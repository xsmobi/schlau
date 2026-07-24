import '../src/index.css';

export const metadata = {
  title: 'schlau.app',
  description: 'Mathe by Doing',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
