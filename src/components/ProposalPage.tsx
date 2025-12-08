import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, ArrowLeft } from "lucide-react";
import { FloatingHearts } from "./HeartDecoration";

interface ProposalPageProps {
  onYes: () => void;
  onBack: () => void;
}

const ProposalPage = ({ onYes, onBack }: ProposalPageProps) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [escapeCount, setEscapeCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoHover = () => {
    if (!containerRef.current) return;

    setEscapeCount((prev) => prev + 1);

    // Alternate between moving and shrinking
    if (escapeCount % 3 === 2) {
      // Shrink the button
      setNoButtonScale((prev) => Math.max(prev * 0.7, 0.3));
    } else {
      // Move to random position
      const container = containerRef.current.getBoundingClientRect();
      const maxX = container.width / 2 - 80;
      const maxY = container.height / 2 - 40;

      const newX = (Math.random() - 0.5) * 2 * maxX;
      const newY = (Math.random() - 0.5) * 2 * maxY;

      setNoButtonPosition({ x: newX, y: newY });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    >
      <FloatingHearts />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
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

      <div className="text-center z-10 animate-fade-up py-4">
        {/* Decorative top */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-pink animate-pulse-soft" />
          <Heart className="w-10 h-10 text-primary fill-primary animate-bounce-soft" />
          <Sparkles className="w-6 h-6 text-red animate-pulse-soft" />
        </div>

        {/* The big question */}
        <div className="mb-4" style={{ paddingBottom: '0.5rem', lineHeight: '1.6' }}>
          <h1 className="font-romantic text-4xl md:text-5xl lg:text-6xl text-gradient" style={{ lineHeight: '1.6', paddingBottom: '1.5rem', marginBottom: '0' }}>
            Will you be my last girlfriend?
          </h1>
        </div>

        {/* Buttons container */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[120px]">
          {/* Yes button - stays in place */}
          <Button
            variant="yes"
            onClick={onYes}
            className="z-10"
          >
            <Heart className="w-5 h-5 fill-current" />
            Yes!
          </Button>

          {/* No button - runs away */}
          <Button
            variant="no"
            onMouseEnter={handleNoHover}
            onTouchStart={handleNoHover}
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px) scale(${noButtonScale})`,
              transition: "transform 0.3s ease-out",
            }}
            className="z-10"
          >
            No
          </Button>
        </div>

        {/* Hint text */}
        {escapeCount > 2 && (
          <p className="text-sm text-muted-foreground mt-8 animate-fade-up">
            click yes lil boy
          </p>
        )}
      </div>
    </div>
  );
};

export default ProposalPage;
