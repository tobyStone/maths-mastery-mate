import { useState } from "react";
import { Card } from "@/components/ui/card";

interface QuestionPanelProps {
  questionNumber: number;
  question: string;
  answer: string;
}

const QuestionPanel = ({ questionNumber, question, answer }: QuestionPanelProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const formatMathExpression = (text: string) => {
    // Handle ratio questions
    if (text.includes('Are these ratios equivalent?')) {
      return (
        <div className="text-[1.3em] tracking-tight">
          {text.split(' ').map((word, index) => (
            <span key={index} className="mr-1">{word}</span>
          ))}
        </div>
      );
    }

    if (text.startsWith('Solve:')) {
      const [solve, equation] = text.split('\n');
      return (
        <>
          <div className="text-xl mb-2">{solve}</div>
          <div className="text-[1.3em]">
            {equation.split('').map((char, index) => 
              char.toLowerCase() === 'x' ? 
                <span key={index} className="font-serif italic">{char}</span> : 
                <span key={index}>{char}</span>
            )}
          </div>
        </>
      );
    }
    
    // Default case for all other questions
    return <div className="text-[1.3em]">{text}</div>;
  };

  return (
    <Card 
      className="p-6 cursor-pointer transition-all hover:shadow-lg border-2 border-purple-200"
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <div className="text-left text-gray-500 mb-2">{Math.floor(questionNumber)}</div>
      <div className="min-h-[100px] flex items-center justify-center">
        {showAnswer ? (
          <div className="text-green-600 font-semibold text-[1.3em]">
            {answer}
          </div>
        ) : (
          <div className="flex items-center flex-col">
            {formatMathExpression(question)}
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuestionPanel;