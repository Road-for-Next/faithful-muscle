import { ThemeProvider } from 'next-themes';
import './globals.css';
import AlertDialogBase from '@/components/AlertDialogBase';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-secondary">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AlertDialogBase />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
