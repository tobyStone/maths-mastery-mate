export type MathTopic = 
  | "arithmetic_integers"
  | "algebra_one_step"
  | "algebra_two_step"
  | "algebra_unknowns_both_sides"
  | "algebra_factorising_monic"
  | "algebra_factorising_nonmonic"
  | "algebra_expanding_quadratics"
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
  | "percentages_increase_decrease"
  | "percentages_of_amount"
  | "percentages_reverse"
  | "conversions_fractions_decimals_percentages"
  | "negative_numbers_addition"
  | "negative_numbers_subtraction"
  | "negative_numbers_multiplication"
  | "negative_numbers_division"
  | "negative_numbers_mixed"
  | "ratio_simplifying"
  | "ratio_sharing"
  | "ratio_comparing";

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