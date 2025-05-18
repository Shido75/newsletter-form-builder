import { NewsletterForm } from "@/components/NewsletterForm";

export default function Subscribe() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-classic-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-classic-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold text-classic-primary leading-tight">
              Stay Informed with Our Newsletter
            </h1>
            <p className="text-lg text-classic-text/80">
              Join our community and receive curated updates delivered straight to your inbox.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                <div className="bg-classic-primary/10 p-2 rounded-full">
                  <svg className="h-5 w-5 text-classic-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-classic-text">Professional insights and updates</span>
              </div>
              
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                <div className="bg-classic-primary/10 p-2 rounded-full">
                  <svg className="h-5 w-5 text-classic-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-classic-text">Exclusive content and resources</span>
              </div>
              
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-sm transition-all hover:shadow-md">
                <div className="bg-classic-primary/10 p-2 rounded-full">
                  <svg className="h-5 w-5 text-classic-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-classic-text">Industry trends and analysis</span>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-classic-muted">
              <div className="flex items-start space-x-3">
                <div className="bg-classic-primary/10 p-2 rounded-full shrink-0 mt-1">
                  <svg className="h-5 w-5 text-classic-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-classic-primary">Trusted by Professionals</h3>
                  <p className="text-sm text-classic-text/70 mt-1">
                    Join thousands of professionals who trust our newsletter for reliable industry insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </div>
  );
}