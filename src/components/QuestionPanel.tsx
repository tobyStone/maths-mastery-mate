import { useState } from "react";
import { Card } from "@/components/ui/card";

interface QuestionPanelProps {
  questionNumber: number;
  question: string;
  answer: string;
}

const QuestionPanel = ({ questionNumber, question, answer }: QuestionPanelProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Card 
      className="p-6 cursor-pointer transition-all hover:shadow-lg border-2 border-purple-200"
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <div className="text-left text-gray-500 mb-2">{questionNumber}.0</div>
      <div className="min-h-[100px] flex items-center justify-center text-2xl">
        {showAnswer ? (
          <div className="text-green-600 font-semibold">{answer}</div>
        ) : (
          <div>{question}</div>
        )}
      </div>
    </Card>
  );
};

export default QuestionPanel;