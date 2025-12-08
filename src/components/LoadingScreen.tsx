import { useEffect, useState } from "react";
import { Heart, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadingScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

const LoadingScreen = ({ onComplete, onBack }: LoadingScreenProps) => {
  const [dots, setDots] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation
    setIsVisible(true);

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => {
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Back button */}
      <div className={`absolute top-6 left-6 z-10 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <div className="text-center">
        {/* Message */}
        <p className={`text-xl md:text-2xl text-foreground font-semibold max-w-sm mx-auto leading-relaxed transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.2s' }}>
          i got one questions for you ...{dots}
        </p>

        {/* Decorative hearts */}
        <div className={`flex justify-center gap-2 mt-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.4s' }}>
          <Heart className="w-4 h-4 text-pink fill-pink animate-bounce-soft" style={{ animationDelay: "0ms" }} />
          <Heart className="w-5 h-5 text-primary fill-primary animate-bounce-soft" style={{ animationDelay: "150ms" }} />
          <Heart className="w-4 h-4 text-red fill-red animate-bounce-soft" style={{ animationDelay: "300ms" }} />
        </div>

        {/* Next button */}
        <div className={`mt-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.6s' }}>
          <Button
            variant="romantic"
            size="lg"
            onClick={onComplete}
            className="gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
