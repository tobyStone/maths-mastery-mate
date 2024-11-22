import MathQuiz from "@/components/MathQuiz";

const Index = () => {
  return (
    <div className="relative min-h-screen p-4">
      <div className="text-4xl font-bold text-center mb-8 text-purple-600">
        GCSE Maths Starter
      </div>
      <img 
        src="/pi-logo.png" 
        alt="Math Logo" 
        className="absolute top-4 right-4 w-16 h-16 object-contain animate-fadeIn"
      />
      <MathQuiz />
    </div>
  );
};

export default Index;