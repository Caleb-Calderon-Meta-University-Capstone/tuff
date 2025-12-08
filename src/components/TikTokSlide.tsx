import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Heart, ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";

interface Slide {
  id: number;
  type: "image" | "video";
  src: string;
  caption: string;
}

interface TikTokSlideProps {
  slide: Slide;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentIndex: number;
  totalSlides: number;
}

const TikTokSlide = ({ slide, onNext, onPrevious, isFirst, isLast, currentIndex, totalSlides }: TikTokSlideProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Try to play video with sound when slide changes
    if (slide.type === "video" && videoRef.current) {
      const video = videoRef.current;
      video.muted = false;
      video.play().catch(() => {
        // If autoplay fails, try muted first then unmute after user interaction
        video.muted = true;
        video.play().then(() => {
          // Once playing, try to unmute (requires user interaction)
          const unmuteOnInteraction = () => {
            video.muted = false;
            document.removeEventListener("click", unmuteOnInteraction);
            document.removeEventListener("touchstart", unmuteOnInteraction);
          };
          document.addEventListener("click", unmuteOnInteraction);
          document.addEventListener("touchstart", unmuteOnInteraction);
        });
      });
    }
  }, [slide.id]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm mx-auto animate-scale-in">
        {/* Back button - top left */}
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrevious}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {isFirst ? "Back" : "Previous"}
          </Button>
        </div>

        {/* TikTok-style card */}
        <div className="relative bg-card rounded-2xl overflow-hidden shadow-card">
          {/* Progress indicator */}
          <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i <= currentIndex ? "bg-primary" : "bg-primary/30"
                }`}
              />
            ))}
          </div>

          {/* Media container */}
          <div className="aspect-[9/16] bg-secondary relative overflow-hidden">
            {slide.type === "image" ? (
              <img
                src={slide.src}
                alt={slide.caption}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            ) : (
              <video
                ref={videoRef}
                src={slide.src}
                className="w-full h-full object-cover"
                autoPlay
                loop
                playsInline
                onError={(e) => {
                  // Fallback if video fails to load
                  const target = e.target as HTMLVideoElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
                onClick={(e) => {
                  // Ensure video plays with sound when clicked
                  const video = e.currentTarget;
                  if (video.muted) {
                    video.muted = false;
                  }
                  video.play();
                }}
              />
            )}
            
            {/* Fallback placeholder (hidden by default, shown if media fails to load) */}
            <div 
              className={`w-full h-full bg-gradient-to-br ${
                slide.type === "image" 
                  ? "from-pink-light to-purple-light" 
                  : "from-red-light to-pink-light"
              } flex items-center justify-center absolute top-0 left-0`}
              style={{ display: 'none' }}
            >
              <div className="text-center p-8">
                {slide.type === "image" ? (
                  <>
                    <Heart className="w-16 h-16 text-primary fill-primary mx-auto mb-4 animate-pulse-soft" />
                    <p className="text-muted-foreground font-medium">Memory #{slide.id}</p>
                    <p className="text-sm text-muted-foreground/70 mt-2">
                      (Image not found: {slide.src})
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <div className="w-0 h-0 border-l-[20px] border-l-primary border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
                    </div>
                    <p className="text-muted-foreground font-medium">Video #{slide.id}</p>
                    <p className="text-sm text-muted-foreground/70 mt-2">
                      (Video not found: {slide.src})
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Gradient overlay for caption */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-foreground/80 to-transparent" />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
              <p className="text-lg font-semibold leading-relaxed mb-4">
                {slide.caption}
              </p>
            </div>
          </div>

          {/* Side actions (TikTok style) */}
          <div className="absolute right-3 bottom-24 flex flex-col gap-4">
            <button className="w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 text-primary fill-primary" />
            </button>
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="mt-6 flex justify-center gap-4">
          {!isFirst && (
            <Button
              variant="outline"
              size="lg"
              onClick={onPrevious}
              className="gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </Button>
          )}
          <Button
            variant="romantic"
            size="lg"
            onClick={onNext}
            className="gap-2"
          >
            {isLast ? "Continue" : "Next"}
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TikTokSlide;
