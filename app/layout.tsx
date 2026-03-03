import "./globals.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { ThemeProvider } from "./components/ThemeProvider";
import { ToastProvider } from "./components/ToastProvider";
import AnimatedWrapper from "./components/AnimatedWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
        <ThemeProvider>
          <ToastProvider>
            <div className="flex">
              {/* Sidebar */}
              <Sidebar />

              {/* Content */}
              <div className="ml-64 w-full min-h-screen flex flex-col">
                <Topbar />

                {/* ✅ SAFE Client Animation Wrapper */}
                <AnimatedWrapper>
                  {children}
                </AnimatedWrapper>
              </div>
            </div>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}