import { useState } from "react";
import IntroPage from "@/components/IntroPage";
import SlideshowPage from "@/components/SlideshowPage";
import LoadingScreen from "@/components/LoadingScreen";
import ProposalPage from "@/components/ProposalPage";
import SuccessPage from "@/components/SuccessPage";

type Stage = "intro" | "slideshow" | "loading" | "proposal" | "success";

const Index = () => {
  const [stage, setStage] = useState<Stage>("intro");

  return (
    <div className="min-h-screen">
      {stage === "intro" && (
        <IntroPage onStart={() => setStage("slideshow")} />
      )}
      
      {stage === "slideshow" && (
        <SlideshowPage onComplete={() => setStage("loading")} />
      )}
      
      {stage === "loading" && (
        <LoadingScreen onComplete={() => setStage("proposal")} />
      )}
      
      {stage === "proposal" && (
        <ProposalPage onYes={() => setStage("success")} />
      )}
      
      {stage === "success" && <SuccessPage />}
    </div>
  );
};

export default Index;
