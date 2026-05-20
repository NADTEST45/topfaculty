import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export const metadata = { title: 'TopFaculty - Faculty Recruitment 2026 | Teaching Jobs India', description: 'India\'s leading platform for academic faculty recruitment. Find teaching, research, and non-teaching jobs at top colleges and universities.' };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
