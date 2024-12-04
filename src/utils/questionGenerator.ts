import { MathTopic, Question } from "@/types/math";
import { generateDecimalQuestions } from "./decimalOperations";
import { generatePercentageQuestions } from "./percentageOperations";
import { generateAlgebraQuestions } from "./algebraOperations";
import { generateConversionQuestions } from "./conversionOperations";
import { generateNegativeQuestions } from "./negativeOperations";
import { generateRatioQuestions } from "./ratioOperations";
import { generateArithmeticQuestions } from "./arithmeticOperations";

export const generateQuestions = (topic: MathTopic, minDifficulty: number, maxDifficulty: number): Question[] => {
  if (topic.startsWith("arithmetic_")) {
    return generateArithmeticQuestions(topic, minDifficulty, maxDifficulty);
  }
  
  if (topic.startsWith("negative_numbers_")) {
    return generateNegativeQuestions(topic, Math.floor((minDifficulty + maxDifficulty) / 2));
  }
  
  if (topic.startsWith("ratio_")) {
    return generateRatioQuestions(topic.split('_').pop() || "", Math.floor((minDifficulty + maxDifficulty) / 2));
  }
  
  if (topic.startsWith("algebra_")) {
    return generateAlgebraQuestions(topic, minDifficulty, maxDifficulty);
  }
  
  switch (topic) {
    case "decimals_addition":
    case "decimals_subtraction":
    case "decimals_multiplication":
    case "decimals_division":
      return generateDecimalQuestions(topic.split('_')[1], Math.floor((minDifficulty + maxDifficulty) / 2));
      
    case "percentages_increase_decrease":
    case "percentages_of_amount":
    case "percentages_reverse":
      return generatePercentageQuestions(topic, Math.floor((minDifficulty + maxDifficulty) / 2));
      
    case "conversions_fractions_decimals_percentages":
      return generateConversionQuestions(Math.floor((minDifficulty + maxDifficulty) / 2));
      
    default:
      return generateArithmeticQuestions("arithmetic_mixed", minDifficulty, maxDifficulty);
  }
};