import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MathTopic, Question, QuizState } from "@/types/math";
import { generateQuestions } from "@/utils/questionGenerator";
import { useToast } from "@/components/ui/use-toast";
import QuestionPanel from "./QuestionPanel";

const MathQuiz = () => {
  const { toast } = useToast();
  const [topic, setTopic] = useState<MathTopic>("fractions");
  const [difficulty, setDifficulty] = useState([5]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: [],
    completed: false,
  });

  const startQuiz = () => {
    const newQuestions = generateQuestions(topic, difficulty[0]);
    setQuestions(newQuestions);
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: [],
      completed: false,
    });
  };

  return (
    <div className="min-h-screen bg-[#7986CB] py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12 text-white">GCSE Maths Starter</h1>
        
        {questions.length === 0 ? (
          <Card className="p-8 shadow-lg border-0 bg-white max-w-2xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-gray-700">Choose Your Practice</h2>
            <div className="space-y-8">
              <div>
                <label className="block text-xl font-medium mb-4 text-gray-600">Select Topic</label>
                <Select onValueChange={(value: MathTopic) => setTopic(value)}>
                  <SelectTrigger className="w-full h-12 text-lg">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fractions">Fractions</SelectItem>
                    <SelectItem value="decimals">Decimals</SelectItem>
                    <SelectItem value="percentages">Percentages</SelectItem>
                    <SelectItem value="algebra">Algebra</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-xl font-medium mb-4 text-gray-600">
                  Difficulty Level: {difficulty[0]}
                </label>
                <Slider
                  value={difficulty}
                  onValueChange={setDifficulty}
                  max={10}
                  min={1}
                  step={1}
                  className="my-6"
                />
              </div>
              
              <Button 
                onClick={startQuiz} 
                className="w-full h-14 text-xl bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                Start Practice
              </Button>
            </div>
          </Card>
        ) : (
          <div>
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
            <div className="text-center">
              <Button 
                onClick={startQuiz}
                className="h-14 text-xl px-12 bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                New Practice
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathQuiz;