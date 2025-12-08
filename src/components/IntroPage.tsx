import { Button } from "@/components/ui/button";
import { FloatingHearts } from "./HeartDecoration";
import { Heart, Sparkles } from "lucide-react";

interface IntroPageProps {
  onStart: () => void;
}

const IntroPage = ({ onStart }: IntroPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <FloatingHearts />
      
      {/* Main content */}
      <div className="text-center z-10 animate-fade-up">
        {/* Decorative top */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-pink animate-pulse-soft" />
          <Heart className="w-6 h-6 text-primary fill-primary animate-bounce-soft" />
          <Sparkles className="w-5 h-5 text-red animate-pulse-soft" />
        </div>

        {/* Title */}
        <h1 className="font-romantic text-4xl md:text-5xl lg:text-6xl text-gradient mb-6 pb-4" style={{ lineHeight: '1.6', paddingBottom: '1.25rem' }}>
          hey sydney
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-md mx-auto font-medium">
          i made a website jus for you
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-12 bg-gradient-romantic opacity-50" />
          <Heart className="w-4 h-4 text-pink fill-pink" />
          <div className="h-px w-12 bg-gradient-romantic opacity-50" />
        </div>

        {/* Start button */}
        <Button 
          variant="romantic" 
          size="xl"
          onClick={onStart}
          className="animate-pulse-soft"
        >
          <Heart className="w-5 h-5 fill-current" />
          Start
        </Button>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 opacity-40">
        <Heart className="w-3 h-3 text-pink fill-pink" />
        <Heart className="w-4 h-4 text-primary fill-primary" />
        <Heart className="w-3 h-3 text-red fill-red" />
      </div>
    </div>
  );
};

export default IntroPage;
