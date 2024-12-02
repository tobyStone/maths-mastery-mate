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
  const [topic, setTopic] = useState<MathTopic>("fractions_addition");
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

  const resetQuiz = () => {
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-[#7986CB] py-8">
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12 text-white">Maths Starter</h1>
        
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
                    <SelectItem value="algebra_one_step">Algebra - One Step Equations</SelectItem>
                    <SelectItem value="algebra_two_step">Algebra - Two Step Equations</SelectItem>
                    <SelectItem value="algebra_unknowns_both_sides">Algebra - Unknowns on Both Sides</SelectItem>
                    <SelectItem value="fractions_addition">Fractions Addition</SelectItem>
                    <SelectItem value="fractions_subtraction">Fractions Subtraction</SelectItem>
                    <SelectItem value="fractions_multiplication">Fractions Multiplication</SelectItem>
                    <SelectItem value="fractions_division">Fractions Division</SelectItem>
                    <SelectItem value="fractions_improper_to_mixed">Fractions Improper to Mixed</SelectItem>
                    <SelectItem value="fractions_mixed_to_improper">Fractions Mixed to Improper</SelectItem>
                    <SelectItem value="mixed_fractions">Mixed Fractions</SelectItem>
                    <SelectItem value="decimals_addition">Decimals Addition</SelectItem>
                    <SelectItem value="decimals_subtraction">Decimals Subtraction</SelectItem>
                    <SelectItem value="decimals_multiplication">Decimals Multiplication</SelectItem>
                    <SelectItem value="decimals_division">Decimals Division</SelectItem>
                    <SelectItem value="percentages_addition">Percentages Addition</SelectItem>
                    <SelectItem value="percentages_subtraction">Percentages Subtraction</SelectItem>
                    <SelectItem value="percentages_multiplication">Percentages Multiplication</SelectItem>
                    <SelectItem value="percentages_division">Percentages Division</SelectItem>
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
