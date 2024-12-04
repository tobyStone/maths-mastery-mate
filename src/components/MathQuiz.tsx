import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MathTopic, Question, QuizState } from "@/types/math";
import { generateQuestions } from "@/utils/questionGenerator";
import { useToast } from "@/components/ui/use-toast";
import QuestionPanel from "./QuestionPanel";
import QuizSetup from "./QuizSetup";

const MathQuiz = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState<MathTopic>("arithmetic_mixed");
  const [difficulty, setDifficulty] = useState([1, 5]); // Default range
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: [],
    completed: false,
  });

  const startQuiz = () => {
    const newQuestions = generateQuestions(topic, difficulty[0], difficulty[1]);
    // Limit to 16 questions
    setQuestions(newQuestions.slice(0, 16));
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: [],
      completed: false,
    });
  };

  const resetQuiz = () => {
    setQuestions([]);
  };

  // Function to format topic name for display
  const formatTopicName = (topic: string) => {
    return topic
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="min-h-screen bg-[#7986CB] py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12 text-white">Maths Starter</h1>
        
        {questions.length === 0 ? (
          <QuizSetup 
            topic={topic}
            setTopic={setTopic}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            startQuiz={startQuiz}
          />
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              {formatTopicName(topic)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {questions.map((question, index) => (
                <QuestionPanel
                  key={index}
                  questionNumber={index + 1}
                  question={question.question}
                  answer={question.answer}
                />
              ))}
            </div>
            <div className="text-center space-y-4">
              <Button 
                onClick={startQuiz}
                className="h-14 text-xl px-12 bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                New Practice
              </Button>
              <div>
                <Button 
                  onClick={resetQuiz}
                  className="h-14 text-xl px-12 bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Back to Menu
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathQuiz;