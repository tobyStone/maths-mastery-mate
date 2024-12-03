import { Question } from "@/types/math";

const generateNegativeQuestion = (operation: string, difficulty: number): Question => {
  const maxNum = Math.min(20, Math.floor(difficulty * 3));
  // Ensure at least one negative number, with possibility of positive numbers
  const num1 = Math.random() < 0.7 ? 
    -(Math.floor(Math.random() * maxNum) + 1) : 
    Math.floor(Math.random() * maxNum);
  const num2 = Math.random() < 0.7 ? 
    -(Math.floor(Math.random() * maxNum) + 1) : 
    Math.floor(Math.random() * maxNum);
  
  let result: number;
  let questionStr: string;
  
  switch (operation) {
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
      // Ensure no division by zero
      if (num2 === 0) {
        return generateNegativeQuestion(operation, difficulty);
      }
      result = num1 / num2;
      questionStr = `${num1} ÷ ${num2}`;
      break;
    default:
      // Mixed operations
      const ops = ["+", "-", "×", "÷"];
      const op = ops[Math.floor(Math.random() * ops.length)];
      if (op === "÷" && num2 === 0) {
        return generateNegativeQuestion(operation, difficulty);
      }
      result = op === "+" ? num1 + num2 :
               op === "-" ? num1 - num2 :
               op === "×" ? num1 * num2 :
               num1 / num2;
      questionStr = `${num1} ${op} ${num2}`;
  }
  
  return {
    id: Math.random(),
    question: questionStr,
    answer: result.toString(),
    difficulty
  };
};

export const generateNegativeQuestions = (type: string, difficulty: number): Question[] => {
  return Array(20).fill(null).map(() => generateNegativeQuestion(type.split('_').pop() || "", difficulty));
};