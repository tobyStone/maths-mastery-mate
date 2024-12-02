import { Question } from "@/types/math";

const formatCoefficient = (coefficient: number) => {
  if (coefficient === 1) return "";
  if (coefficient === -1) return "-";
  return coefficient.toString();
};

const generateOneStepQuestion = (difficulty: number): Question => {
  const useDecimals = difficulty > 7;
  const answer = useDecimals 
    ? Math.round((Math.random() * (difficulty * 2)) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * (difficulty * 2)) + 1;
  
  const coefficient = Math.floor(Math.random() * 5) + 1;
  
  // For one-step equations, we'll only use one operation
  const questionStr = `Solve:\n${coefficient * answer} = ${formatCoefficient(coefficient)}x`;

  return {
    id: Math.random(),
    question: questionStr,
    answer: `x = ${answer}`,
    difficulty
  };
};

const generateUnknownsBothSidesQuestion = (difficulty: number): Question => {
  const useDecimals = difficulty > 7;
  const useNegatives = difficulty > 7;
  
  // Generate coefficients based on difficulty
  let leftCoefficient = Math.floor(Math.random() * 5) + 1;
  let rightCoefficient = Math.floor(Math.random() * 5) + 1;
  
  // For higher difficulties, introduce negative coefficients
  if (useNegatives) {
    if (Math.random() > 0.5) leftCoefficient *= -1;
    if (Math.random() > 0.5) rightCoefficient *= -1;
  }
  
  // Generate the answer
  const answer = useDecimals 
    ? Math.round((Math.random() * difficulty) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * difficulty) + 1;
  
  // Generate constants that increase in complexity with difficulty
  const leftConstant = Math.floor(Math.random() * (difficulty * 2)) + 1;
  const rightConstant = Math.floor(Math.random() * (difficulty * 2)) + 1;

  // Create the equation with x terms on both sides
  const questionStr = `Solve:\n${formatCoefficient(leftCoefficient)}x + ${leftConstant} = ${formatCoefficient(rightCoefficient)}x + ${rightConstant}`;

  return {
    id: Math.random(),
    question: questionStr,
    answer: `x = ${answer}`,
    difficulty
  };
};

const generateTwoStepQuestion = (difficulty: number): Question => {
  const useDecimals = difficulty > 7;
  const answer = useDecimals 
    ? Math.round((Math.random() * difficulty) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * difficulty) + 1;
  
  const coefficient = Math.floor(Math.random() * 5) + 1;
  const constant = Math.floor(Math.random() * (difficulty / 2)) + 1;
  
  const result = answer;
  const questionStr = `Solve:\n${coefficient * answer + constant} = ${formatCoefficient(coefficient)}x + ${constant}`;

  return {
    id: Math.random(),
    question: questionStr,
    answer: `x = ${result}`,
    difficulty
  };
};

export const generateAlgebraQuestions = (type: string, difficulty: number): Question[] => {
  const generator = type === "algebra_one_step" ? generateOneStepQuestion :
                   type === "algebra_two_step" ? generateTwoStepQuestion :
                   generateUnknownsBothSidesQuestion;
                   
  return Array(20).fill(null).map(() => generator(difficulty));
};
