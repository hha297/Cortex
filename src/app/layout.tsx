import type { Metadata } from 'next';
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from '@/components/providers';
const spaceGrotesk = Space_Grotesk({
        variable: '--font-space-grotesk',
        subsets: ['latin'],
});

const plexMono = IBM_Plex_Mono({
        variable: '--font-plex-mono',
        subsets: ['latin'],
        weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
        title: 'Cortex',
        description: 'Cortex',
};

export default function RootLayout({
        children,
}: Readonly<{
        children: React.ReactNode;
}>) {
        return (
                <html lang="en" suppressHydrationWarning>
                        <body className={`${spaceGrotesk.variable} ${plexMono.variable} antialiased`}>
                                <Providers>{children}</Providers>
                                <Toaster />
                        </body>
                </html>
        );
}
