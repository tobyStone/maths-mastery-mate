import { Question } from "@/types/math";

const generateNegativeQuestion = (operation: string, difficulty: number): Question => {
  const maxNum = Math.min(20, Math.floor(difficulty * 3));
  // Ensure at least one negative number, with possibility of positive numbers
  const num1 = Math.random() < 0.7 ? 
    -(Math.floor(Math.random() * maxNum) + 1) : 
    Math.floor(Math.random() * maxNum) + 1;
  const num2 = Math.random() < 0.7 ? 
    -(Math.floor(Math.random() * maxNum) + 1) : 
    Math.floor(Math.random() * maxNum) + 1;
  
  let result: number;
  let questionStr: string;
  
  switch(operation) {
    case "addition":
      result = num1 + num2;
      questionStr = `${num1} + ${num2}`;
      break;
    case "subtraction":
      result = num1 - num2;
      questionStr = `${num1} - ${num2}`;
      break;
    case "multiplication":
      result = num1 * num2;
      questionStr = `${num1} × ${num2}`;
      break;
    case "division":
      // Ensure we're not dividing by zero
      const divisor = num2 === 0 ? 1 : num2;
      result = num1 / divisor;
      questionStr = `${num1} ÷ ${divisor}`;
      break;
    default:
      // Mixed operations
      const ops = ["+", "-", "×", "÷"];
      const op = ops[Math.floor(Math.random() * ops.length)];
      if (op === "÷") {
        const divisor = num2 === 0 ? 1 : num2;
        result = num1 / divisor;
        questionStr = `${num1} ÷ ${divisor}`;
      } else if (op === "×") {
        result = num1 * num2;
        questionStr = `${num1} × ${num2}`;
      } else if (op === "-") {
        result = num1 - num2;
        questionStr = `${num1} - ${num2}`;
      } else {
        result = num1 + num2;
        questionStr = `${num1} + ${num2}`;
      }
  }
  
  return {
    id: Math.random(),
    question: questionStr,
    answer: result.toString(),
    difficulty
  };
};

export const generateNegativeQuestions = (type: string, difficulty: number): Question[] => {
  const operation = type.split('_').pop() || "";
  return Array(20).fill(null).map(() => generateNegativeQuestion(operation, difficulty));
};