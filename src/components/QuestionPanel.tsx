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
    if (text.startsWith('Solve:')) {
      const [solve, equation] = text.split('\n');
      return (
        <>
          <div className="text-xl mb-2">{solve}</div>
          <div className="text-2xl">
            {equation.split('').map((char, index) => 
              char.toLowerCase() === 'x' ? 
                <span key={index} className="font-serif italic">{char}</span> : 
                <span key={index}>{char}</span>
            )}
          </div>
        </>
      );
    }
    
    // Add instruction for improper and mixed fractions
    let instruction = '';
    if (text.includes('/') && !text.includes(' ') && !text.includes('+') && !text.includes('-') && !text.includes('×') && !text.includes('÷')) {
      instruction = 'Turn into a mixed number';
    } else if (text.includes(' ') && text.includes('/') && !text.includes('+') && !text.includes('-') && !text.includes('×') && !text.includes('÷')) {
      instruction = 'Turn into an improper fraction';
    }
    
    // Split the expression into parts (numbers and operators)
    const parts = text.split(' ');
    
    return (
      <>
        {instruction && <div className="text-lg mb-2 text-gray-600">{instruction}</div>}
        {parts.map((part, index) => {
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
        })}
      </>
    );
  };

  return (
    <Card 
      className="p-6 cursor-pointer transition-all hover:shadow-lg border-2 border-purple-200"
      onClick={() => setShowAnswer(!showAnswer)}
    >
      <div className="text-left text-gray-500 mb-2">{questionNumber}.0</div>
      <div className="min-h-[100px] flex items-center justify-center">
        {showAnswer ? (
          <div className="text-green-600 font-semibold flex items-center text-[1.3em]">
            {formatMathExpression(answer)}
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