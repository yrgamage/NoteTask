
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-destructive/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        <div className="glass-effect rounded-2xl p-12 animate-fade-in">
          {/* 404 Animation */}
          <div className="text-8xl font-bold text-primary mb-6 animate-bounce-subtle">
            404
          </div>
          
          {/* Sad emoji */}
          <div className="text-6xl mb-6">😢</div>
          
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Oops! Page not found
          </h1>
          
          <p className="text-muted-foreground mb-8 leading-relaxed">
            The page you're looking for seems to have wandered off. 
            Don't worry, it happens to the best of us!
          </p>
          
          <a 
            href="/" 
            className="inline-flex items-center space-x-2 px-8 py-3 bg-primary text-primary-foreground 
                       rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 hover-lift hover-glow"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span>Return to Home</span>
          </a>
          
          <div className="mt-6 text-xs text-muted-foreground">
            Lost route: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
