import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hariprasad P | Futuristic Full Stack & AI Developer',
  description:
    'Luxury, high-performance developer portfolio of Hariprasad P. Specializing in scalable full-stack architectures, responsive design systems, and AI-powered web solutions.',
  keywords: [
    'Hariprasad P',
    'Full Stack Developer',
    'AI Web Development',
    'Software Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Java',
    'Python',
    'Portfolio',
  ],
  authors: [{ name: 'Hariprasad P', url: 'https://github.com/hariprasad8760-debug' }],
  openGraph: {
    title: 'Hariprasad P | Futuristic Full Stack & AI Developer',
    description: 'BUILD. INNOVATE. ELEVATE. Crafting digital experiences where intelligent ideas meet elegant engineering.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#050407',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
