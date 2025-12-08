import { Heart } from "lucide-react";

interface HeartDecorationProps {
  className?: string;
}

const HeartDecoration = ({ className = "" }: HeartDecorationProps) => {
  return (
    <div className={`absolute pointer-events-none ${className}`}>
      <Heart className="w-6 h-6 text-pink fill-pink opacity-40 animate-float" />
    </div>
  );
};

export const FloatingHearts = () => {
  return (
    <>
      <HeartDecoration className="top-[10%] left-[5%]" />
      <HeartDecoration className="top-[20%] right-[8%] delay-100" />
      <HeartDecoration className="top-[60%] left-[3%] delay-200" />
      <HeartDecoration className="top-[75%] right-[5%] delay-300" />
      <HeartDecoration className="top-[40%] left-[8%] delay-500" />
      <HeartDecoration className="top-[85%] left-[15%] delay-700" />
      <HeartDecoration className="top-[15%] left-[20%] delay-400" />
      <HeartDecoration className="top-[50%] right-[3%] delay-600" />
    </>
  );
};

export default HeartDecoration;
