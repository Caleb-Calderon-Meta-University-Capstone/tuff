import { useEffect } from "react";
import confetti from "canvas-confetti";
import { Heart, PartyPopper, ArrowLeft } from "lucide-react";
import { FloatingHearts } from "./HeartDecoration";
import { Button } from "@/components/ui/button";

interface SuccessPageProps {
	onBack: () => void;
}

const SuccessPage = ({ onBack }: SuccessPageProps) => {
	useEffect(() => {
		// Fire confetti!
		const duration = 5000;
		const animationEnd = Date.now() + duration;
		const colors = ["#a855f7", "#ec4899", "#ef4444", "#f472b6", "#c084fc"];

		const frame = () => {
			confetti({
				particleCount: 3,
				angle: 60,
				spread: 55,
				origin: { x: 0 },
				colors: colors,
			});
			confetti({
				particleCount: 3,
				angle: 120,
				spread: 55,
				origin: { x: 1 },
				colors: colors,
			});

			if (Date.now() < animationEnd) {
				requestAnimationFrame(frame);
			}
		};

		// Initial burst
		confetti({
			particleCount: 100,
			spread: 100,
			origin: { y: 0.6 },
			colors: colors,
		});

		frame();

		// Heart-shaped confetti burst
		const heartBurst = () => {
			confetti({
				particleCount: 50,
				spread: 60,
				origin: { y: 0.5, x: 0.5 },
				colors: colors,
				shapes: ["circle"],
				scalar: 1.2,
			});
		};

		const heartInterval = setInterval(heartBurst, 2000);

		return () => {
			clearInterval(heartInterval);
		};
	}, []);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
			<FloatingHearts />

			{/* Back button */}
			<div className="absolute top-6 left-6 z-20">
				<Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
					<ArrowLeft className="w-4 h-4" />
					Back
				</Button>
			</div>

			<div className="text-center z-10 animate-fade-up">
				{/* Celebration icons */}
				<div className="flex items-center justify-center gap-4 mb-6">
					<PartyPopper className="w-8 h-8 text-pink animate-wiggle" />
					<Heart className="w-12 h-12 text-primary fill-primary animate-pulse-soft" />
					<PartyPopper className="w-8 h-8 text-red animate-wiggle" style={{ transform: "scaleX(-1)" }} />
				</div>

				{/* Main message */}
				<h1 className="font-romantic text-4xl md:text-5xl lg:text-6xl text-gradient mb-6 leading-relaxed">hooray!</h1>
				{/* Heart photo */}
				<div className="flex justify-center mb-6">
					<svg viewBox="0 0 100 90" className="w-40 h-40 md:w-48 md:h-48 drop-shadow-lg">
						<defs>
							<clipPath id="heart-clip">
								<path d="M50 82 L10 40 A20 20 0 0 1 50 15 A20 20 0 0 1 90 40 Z" />
							</clipPath>
						</defs>

						<image href="/Heartpic.JPG" x="0" y="0" width="100" height="90" preserveAspectRatio="xMidYMid slice" clipPath="url(#heart-clip)" />
					</svg>
				</div>

				{/* Decorative hearts at bottom */}
				<div className="flex justify-center gap-3">
					<Heart className="w-5 h-5 text-pink fill-pink animate-float" style={{ animationDelay: "0ms" }} />
					<Heart className="w-6 h-6 text-primary fill-primary animate-float" style={{ animationDelay: "200ms" }} />
					<Heart className="w-7 h-7 text-red fill-red animate-float" style={{ animationDelay: "400ms" }} />
					<Heart className="w-6 h-6 text-primary fill-primary animate-float" style={{ animationDelay: "600ms" }} />
					<Heart className="w-5 h-5 text-pink fill-pink animate-float" style={{ animationDelay: "800ms" }} />
				</div>
			</div>
		</div>
	);
};

export default SuccessPage;
