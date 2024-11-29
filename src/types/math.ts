export type MathTopic = 
  | "fractions_addition"
  | "fractions_subtraction"
  | "fractions_multiplication"
  | "fractions_division"
  | "fractions_improper_to_mixed"
  | "fractions_mixed_to_improper"
  | "mixed_fractions"
  | "decimals_addition"
  | "decimals_subtraction"
  | "decimals_multiplication"
  | "decimals_division"
  | "percentages_addition"
  | "percentages_subtraction"
  | "percentages_multiplication"
  | "percentages_division"
  | "algebra_one_step"
  | "algebra_two_step"
  | "algebra_unknowns_both_sides";

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
