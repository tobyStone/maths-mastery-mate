import MathQuiz from "@/components/MathQuiz";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-[#6B7AE4] p-4">
      <div className="flex justify-between items-start px-4 py-2">
        <h1 className="text-4xl font-bold text-white">
          GCSE Maths Starter
        </h1>
        <img 
          src="/lovable-uploads/f7fd5321-1c9f-4973-b601-4362406e69e9.png" 
          alt="Math Logo" 
          className="w-16 h-16 object-contain animate-fadeIn"
        />
      </div>
      <MathQuiz />
    </div>
  );
};

export default Index;