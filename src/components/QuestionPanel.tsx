import { useState } from "react";
import { Card } from "@/components/ui/card";

interface QuestionPanelProps {
  questionNumber: number;
  question: string;
  answer: string;
}

const QuestionPanel = ({ questionNumber, question, answer }: QuestionPanelProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const formatFraction = (text: string) => {
    // Split the expression into parts (numbers and operators)
    const parts = text.split(' ');
    
    return parts.map((part, index) => {
      // If this part contains a fraction (has a slash)
      if (part.includes('/')) {
        const [numerator, denominator] = part.split('/');
        return (
          <span key={index} className="inline-flex items-center">
            <div className="inline-flex flex-col items-center">
              <div className="text-center">{numerator}</div>
              <div className="border-t border-current w-full text-center">
                <div>{denominator}</div>
              </div>
            </div>
            {/* Add spacing and operator if not the last part */}
            {index < parts.length - 1 && <span className="mx-2">{parts[index + 1] === '+' ? '+' : ''}</span>}
          </span>
        );
      }
      // If it's an operator, only render it if it's not already handled above
      return part === '+' ? null : <span key={index} className="mx-2">{part}</span>;
    });
  };

  return (
    <Card 
      className="p-6 cursor-pointer transition-all hover:shadow-lg border-2 border-purple-200"
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <div className="text-left text-gray-500 mb-2">{questionNumber}.0</div>
      <div className="min-h-[100px] flex items-center justify-center text-2xl">
        {showAnswer ? (
          <div className="text-green-600 font-semibold">{formatFraction(answer)}</div>
        ) : (
          <div>{formatFraction(question)}</div>
        )}
      </div>
    </Card>
  );
};

export default QuestionPanel;