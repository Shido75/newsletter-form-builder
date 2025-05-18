import { useState, useEffect } from "react";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ThemeSelector } from "@/components/ThemeSelector";

type ColorTheme = "classic" | "warm" | "mono" | "complementary";

export default function Subscribe() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [colorTheme, setColorTheme] = useState<ColorTheme>("classic");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Get background classes based on theme
  const getBackgroundClasses = () => {
    switch (colorTheme) {
      case "classic":
        return "from-blue-50 to-indigo-100";
      case "warm":
        return "from-orange-50 to-red-50";
      case "mono":
        return "from-green-50 to-emerald-50";
      case "complementary":
        return "from-blue-50 to-orange-50";
      default:
        return "from-blue-50 to-indigo-100";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${getBackgroundClasses()} p-4 relative overflow-hidden transition-colors duration-500`}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-10 w-64 h-64 bg-${colorTheme}-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-subtle`}></div>
        <div className={`absolute bottom-20 right-10 w-80 h-80 bg-${colorTheme}-secondary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-subtle`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-${colorTheme}-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-subtle`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className={`w-full max-w-4xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Theme selector */}
        <div className="mb-8 text-center">
          <ThemeSelector onThemeChange={setColorTheme} currentTheme={colorTheme} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className={`flex flex-col justify-center space-y-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 className={`text-4xl font-bold text-${colorTheme}-text leading-tight`}>Stay Ahead with Our Newsletter</h1>
            <p className={`text-lg text-${colorTheme}-text/80`}>
              Join our community and never miss out on our latest updates, tips, and exclusive offers tailored to your interests.
            </p>
            
            <div className="space-y-4 mt-4">
              <div className={`flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm transition-all hover:shadow-md hover:translate-x-1 border border-${colorTheme}-primary/10`}>
                <div className={`bg-${colorTheme}-primary/10 p-2 rounded-full`}>
                  <svg className={`h-5 w-5 text-${colorTheme}-primary`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`text-${colorTheme}-text/90`}>Personalized content based on your interests</span>
              </div>
              
              <div className={`flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm transition-all hover:shadow-md hover:translate-x-1 border border-${colorTheme}-primary/10`} style={{ transitionDelay: '100ms' }}>
                <div className={`bg-${colorTheme}-primary/10 p-2 rounded-full`}>
                  <svg className={`h-5 w-5 text-${colorTheme}-primary`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`text-${colorTheme}-text/90`}>Exclusive subscriber-only content and offers</span>
              </div>
              
              <div className={`flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm transition-all hover:shadow-md hover:translate-x-1 border border-${colorTheme}-primary/10`} style={{ transitionDelay: '200ms' }}>
                <div className={`bg-${colorTheme}-primary/10 p-2 rounded-full`}>
                  <svg className={`h-5 w-5 text-${colorTheme}-primary`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className={`text-${colorTheme}-text/90`}>Control your preferences and unsubscribe anytime</span>
              </div>
            </div>
            
            <div className={`bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-${colorTheme}-primary/20 mt-6`}>
              <div className="flex items-start space-x-3">
                <div className={`bg-${colorTheme}-primary/10 p-2 rounded-full shrink-0 mt-1`}>
                  <svg className={`h-5 w-5 text-${colorTheme}-primary`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`font-medium text-${colorTheme}-text`}>Your privacy matters</h3>
                  <p className={`text-sm text-${colorTheme}-text/70 mt-1`}>
                    We respect your privacy and will never share your information with third parties without your consent.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`flex items-center justify-center transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <NewsletterForm colorTheme={colorTheme} />
          </div>
        </div>
      </div>
    </div>
  );
}