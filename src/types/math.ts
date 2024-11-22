export type MathTopic = 
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division"
  | "fractions"
  | "decimals"
  | "percentages"
  | "algebra"
  | "geometry"
  | "statistics";

export interface Question {
  id: number;
  question: string;
  answer: string;
  difficulty: number;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: string[];
  completed: boolean;
}