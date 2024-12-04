import { Question } from "@/types/math";

const generateArithmeticQuestion = (type: string, difficulty: number): Question => {
  const maxNum = Math.min(1000, Math.floor(difficulty * 100));
  let num1: number, num2: number, result: number, operator: string;
  
  switch(type) {
    case "arithmetic_addition":
      num1 = Math.floor(Math.random() * maxNum) + 1;
      num2 = Math.floor(Math.random() * maxNum) + 1;
      result = num1 + num2;
      operator = "+";
      break;
      
    case "arithmetic_subtraction":
      num1 = Math.floor(Math.random() * maxNum) + 1;
      num2 = Math.floor(Math.random() * num1) + 1; // Ensure positive result
      result = num1 - num2;
      operator = "-";
      break;
      
    case "arithmetic_multiplication":
      num1 = Math.floor(Math.random() * 30) + 1;
      num2 = Math.floor(Math.random() * 30) + 1;
      result = num1 * num2;
      operator = "×";
      break;
      
    case "arithmetic_division":
      num2 = Math.floor(Math.random() * 12) + 1;
      num1 = num2 * (Math.floor(Math.random() * 20) + 1); // Ensure whole number result
      result = num1 / num2;
      operator = "÷";
      break;
      
    default: // Mixed operations
      const operators = ["+", "-", "×", "÷"];
      operator = operators[Math.floor(Math.random() * operators.length)];
      if (operator === "÷") {
        num2 = Math.floor(Math.random() * 12) + 1;
        num1 = num2 * (Math.floor(Math.random() * 20) + 1);
        result = num1 / num2;
      } else if (operator === "×") {
        num1 = Math.floor(Math.random() * 30) + 1;
        num2 = Math.floor(Math.random() * 30) + 1;
        result = num1 * num2;
      } else {
        num1 = Math.floor(Math.random() * maxNum) + 1;
        num2 = Math.floor(Math.random() * maxNum) + 1;
        if (operator === "-" && num2 > num1) {
          [num1, num2] = [num2, num1]; // Swap to ensure positive result
        }
        result = operator === "+" ? num1 + num2 : num1 - num2;
      }
  }
  
  return {
    id: Math.random(),
    question: `${num1} ${operator} ${num2}`,
    answer: result.toString(),
    difficulty
  };
};

export const generateArithmeticQuestions = (type: string, minDifficulty: number, maxDifficulty: number): Question[] => {
  return Array(16).fill(null).map((_, index) => {
    const difficulty = minDifficulty + (index * ((maxDifficulty - minDifficulty) / 15));
    return generateArithmeticQuestion(type, Math.round(difficulty));
  });
};