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
    // Check if the text contains a fraction (contains '/')
    if (text.includes('/')) {
      const parts = text.split('/');
      return (
        <div className="inline-flex flex-col items-center">
          <div className="text-center">{parts[0]}</div>
          <div className="border-t border-current w-full text-center">
            <div>{parts[1]}</div>
          </div>
        </div>
      );
    }
    return text;
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