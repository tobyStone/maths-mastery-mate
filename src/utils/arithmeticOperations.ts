import { Question } from "@/types/math";

const generateArithmeticQuestion = (difficulty: number): Question => {
  const maxNum = Math.min(1000, Math.floor(difficulty * 100));
  const operators = ["+", "-", "×", "÷"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  
  let num1 = Math.floor(Math.random() * maxNum) + 1;
  let num2 = Math.floor(Math.random() * maxNum) + 1;
  
  // Ensure division results in whole numbers
  if (operator === "÷") {
    num2 = Math.floor(Math.random() * 12) + 1; // Keep divisors manageable
    num1 = num2 * (Math.floor(Math.random() * 20) + 1); // Ensure divisible
  }
  
  // For multiplication, keep numbers manageable
  if (operator === "×") {
    num1 = Math.floor(Math.random() * 30) + 1;
    num2 = Math.floor(Math.random() * 30) + 1;
  }
  
  let result: number;
  switch(operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      // Ensure positive result
      if (num1 < num2) [num1, num2] = [num2, num1];
      result = num1 - num2;
      break;
    case "×":
      result = num1 * num2;
      break;
    default: // Division
      result = num1 / num2;
  }
  
  return {
    id: Math.random(),
    question: `${num1} ${operator} ${num2}`,
    answer: result.toString(),
    difficulty
  };
};

export const generateArithmeticQuestions = (difficulty: number): Question[] => {
  return Array(20).fill(null).map(() => generateArithmeticQuestion(difficulty));
};
