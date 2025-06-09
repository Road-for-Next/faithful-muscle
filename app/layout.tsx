import { ThemeProvider } from 'next-themes';
import './globals.css';
import AlertDialogBase from '@/components/AlertDialogBase';
import { Toaster } from '@/components/ui/sonner';

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
          <Toaster position="bottom-center" />
          <AlertDialogBase />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
