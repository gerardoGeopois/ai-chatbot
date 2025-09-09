import './globals.css';

export const metadata = {
  title: 'Simple AI Chatbot',
  description: 'A basic AI chatbot built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
