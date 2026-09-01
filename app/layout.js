import './globals.css';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { LanguageProvider } from '@/components/ui/LanguageProvider';
import { MotionProvider } from '@/components/ui/MotionConfig';
import SmoothScroll from '@/components/ui/SmoothScroll';
import TransitionProvider from '@/components/ui/TransitionProvider';
import CursorProvider from '@/components/ui/CursorProvider';

export const metadata = {
  metadataBase: new URL('https://naufalhakim.dev'),
  title: {
    default: 'Naufal Hakim Muzaki — Software Engineer & Full-Stack Developer',
    template: '%s | Naufal Hakim Muzaki',
  },
  description:
    'Personal portfolio and digital experience of Naufal Hakim Muzaki. Specializing in resilient full-stack systems, clean architecture, and 60 FPS creative web interactions.',
  keywords: [
    'Naufal Hakim Muzaki',
    'Naufal Hakim',
    'Software Engineer',
    'Full-Stack Developer',
    'Creative Developer',
    'Next.js',
    'React',
    'GSAP',
    'Node.js',
    'PostgreSQL',
    'Tailwind CSS',
  ],
  authors: [{ name: 'Naufal Hakim Muzaki' }],
  creator: 'Naufal Hakim Muzaki',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://naufalhakim.dev',
    title: 'Naufal Hakim Muzaki — Software Engineer & Full-Stack Developer',
    description:
      'Personal portfolio and digital experience of Naufal Hakim Muzaki. Specializing in resilient full-stack systems, clean architecture, and 60 FPS creative web interactions.',
    siteName: 'Naufal Hakim Muzaki Portfolio',
    images: [
      {
        url: '/profile.jpg',
        width: 800,
        height: 1000,
        alt: 'Naufal Hakim Muzaki',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naufal Hakim Muzaki — Software Engineer & Full-Stack Developer',
    description:
      'Personal portfolio and digital experience of Naufal Hakim Muzaki. Specializing in resilient full-stack systems, clean architecture, and 60 FPS creative web interactions.',
    images: ['/profile.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: '#070b14',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased selection:bg-sky-500 selection:text-white transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <div className="grain-overlay" aria-hidden="true" />
            <MotionProvider>
              <SmoothScroll>
                <TransitionProvider>
                  <CursorProvider>
                    {children}
                  </CursorProvider>
                </TransitionProvider>
              </SmoothScroll>
            </MotionProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
