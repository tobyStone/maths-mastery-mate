import MathQuiz from "@/components/MathQuiz";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-[#6B7AE4] p-4">
      <div className="flex justify-between items-start px-4 py-2">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-[#333333] mb-2">
            Maths inCoding
          </h1>
          <p className="text-xl text-[#333333] italic">
            ... learning maths through coding computer games
          </p>
        </div>
        <img 
          src="/lovable-uploads/f7fd5321-1c9f-4973-b601-4362406e69e9.png" 
          alt="Math Logo" 
          className="w-24 h-24 object-contain animate-fadeIn"
        />
      </div>
      <MathQuiz />
    </div>
  );
};

export default Index;