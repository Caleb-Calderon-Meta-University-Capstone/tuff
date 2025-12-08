import { useState } from "react";
import TikTokSlide from "./TikTokSlide";

interface SlideshowPageProps {
	onComplete: () => void;
	onBack: () => void;
}

// 📸 HOW TO ADD YOUR PICTURES AND VIDEOS:
// 1. Add your image files (jpg, png, webp, etc.) to the /public folder
//    Example: /public/memory1.jpg, /public/memory2.png
// 2. Add your video files (mp4, webm, etc.) to the /public folder
//    Example: /public/video1.mp4, /public/video2.webm
// 3. Update the 'src' paths below to match your file names
//    Use paths starting with "/" (e.g., "/memory1.jpg" or "/videos/video1.mp4")
// 4. You can organize files in subfolders like /public/photos/ or /public/videos/
//    Then use paths like "/photos/memory1.jpg" or "/videos/video1.mp4"

const slides = [
	{
		id: 1,
		type: "image" as const,
		src: "/img1.jpg",
		caption: "from stalking you on ig in august...",
	},
	{
		id: 2,
		type: "video" as const,
		src: "/vidoe2.MOV",
		caption: "to hanging out w u for the first time",
	},
	{
		id: 3,
		type: "image" as const,
		src: "/img3.PNG",
		caption: "to late night talks",
	},
	{
		id: 4,
		type: "image" as const,
		src: "/img4.JPG",
		caption: "then seeing how thurl of a boul you really are 😍😍😍",
	},
	{
		id: 5,
		type: "video" as const,
		src: "/lastvid.mov",
		caption: "im glad i met u syd",
	},
];

const SlideshowPage = ({ onComplete, onBack }: SlideshowPageProps) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const handleNext = () => {
		if (currentSlide < slides.length - 1) {
			setCurrentSlide(currentSlide + 1);
		} else {
			onComplete();
		}
	};

	const handlePrevious = () => {
		if (currentSlide > 0) {
			setCurrentSlide(currentSlide - 1);
		} else {
			onBack();
		}
	};

	return <TikTokSlide key={slides[currentSlide].id} slide={slides[currentSlide]} onNext={handleNext} onPrevious={handlePrevious} isFirst={currentSlide === 0} isLast={currentSlide === slides.length - 1} currentIndex={currentSlide} totalSlides={slides.length} />;
};

export default SlideshowPage;
