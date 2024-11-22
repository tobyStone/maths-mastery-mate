import MathQuiz from "@/components/MathQuiz";

const Index = () => {
  return (
    <div className="relative">
      <img 
        src="/pi-logo.png" 
        alt="Math Logo" 
        className="absolute top-4 right-4 w-16 h-16 animate-fadeIn"
      />
      <MathQuiz />
    </div>
  );
};

export default Index;