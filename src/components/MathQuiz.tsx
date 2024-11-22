import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [currentAnswer, setCurrentAnswer] = useState("");

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

  const checkAnswer = () => {
    const currentQuestion = questions[quizState.currentQuestion];
    const isCorrect = Math.abs(parseFloat(currentAnswer) - parseFloat(currentQuestion.answer)) < 0.01;
    
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestion] = currentAnswer;
    
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;
    
    if (quizState.currentQuestion === questions.length - 1) {
      setQuizState({
        ...quizState,
        score: newScore,
        answers: newAnswers,
        completed: true,
      });
      toast({
        title: "Quiz Completed!",
        description: `You scored ${newScore} out of ${questions.length}!`,
      });
    } else {
      setQuizState({
        ...quizState,
        currentQuestion: quizState.currentQuestion + 1,
        score: newScore,
        answers: newAnswers,
      });
      setCurrentAnswer("");
    }
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">GCSE Maths Starter</h1>
        
        {questions.length === 0 ? (
          <Card className="p-8 shadow-lg border-0 bg-white">
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
                className="w-full h-14 text-xl bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Start Practice
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-8 shadow-lg border-0 bg-white">
            {!quizState.completed ? (
              <>
                <div className="mb-6 flex justify-between items-center text-lg text-gray-600">
                  <span>Question {quizState.currentQuestion + 1} of {questions.length}</span>
                  <span>Score: {quizState.score}</span>
                </div>
                
                <div className="text-4xl font-bold mb-8 text-gray-800 py-8 border-y border-gray-100">
                  {questions[quizState.currentQuestion].question}
                </div>
                
                <div className="space-y-6">
                  <Input
                    type="text"
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className="text-2xl h-14 text-center"
                  />
                  
                  <Button 
                    onClick={checkAnswer} 
                    className="w-full h-14 text-xl bg-green-600 hover:bg-green-700 transition-colors"
                  >
                    Submit Answer
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-6 py-8">
                <h2 className="text-4xl font-bold text-gray-800">Practice Complete!</h2>
                <p className="text-2xl text-gray-600">
                  You scored {quizState.score} out of {questions.length}
                </p>
                <Button 
                  onClick={startQuiz} 
                  className="mt-8 h-14 text-xl px-12 bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Start New Practice
                </Button>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default MathQuiz;