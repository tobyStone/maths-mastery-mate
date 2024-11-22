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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">GCSE Math Practice</h1>
        
        {questions.length === 0 ? (
          <Card className="p-6 animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6">Setup Your Practice</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Select Topic</label>
                <Select onValueChange={(value: MathTopic) => setTopic(value)}>
                  <SelectTrigger>
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
                <label className="block text-sm font-medium mb-2">
                  Difficulty Level: {difficulty[0]}
                </label>
                <Slider
                  value={difficulty}
                  onValueChange={setDifficulty}
                  max={10}
                  min={1}
                  step={1}
                  className="my-4"
                />
              </div>
              
              <Button onClick={startQuiz} className="w-full">
                Start Practice
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-6 animate-fadeIn">
            {!quizState.completed ? (
              <>
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Question {quizState.currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Score: {quizState.score}
                  </span>
                </div>
                
                <div className="text-2xl font-bold mb-6">
                  {questions[quizState.currentQuestion].question}
                </div>
                
                <div className="space-y-4">
                  <Input
                    type="text"
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className="text-lg"
                  />
                  
                  <Button onClick={checkAnswer} className="w-full">
                    Submit Answer
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Practice Complete!</h2>
                <p className="text-xl">
                  You scored {quizState.score} out of {questions.length}
                </p>
                <Button onClick={startQuiz} className="mt-4">
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