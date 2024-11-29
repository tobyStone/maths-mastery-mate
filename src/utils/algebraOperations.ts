import { Question } from "@/types/math";

const formatCoefficient = (coefficient: number) => {
  return coefficient === 1 ? "" : coefficient.toString();
};

const generateOneStepQuestion = (difficulty: number): Question => {
  const useDecimals = difficulty > 7;
  const answer = useDecimals 
    ? Math.round((Math.random() * (difficulty * 2)) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * (difficulty * 2)) + 1;
  
  const constant = useDecimals
    ? Math.round((Math.random() * difficulty) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * difficulty) + 1;

  const coefficient = Math.floor(Math.random() * 5) + 1;
  
  let questionStr: string;
  let result: number;
  
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      result = answer;
      questionStr = `Solve:\n${coefficient * answer + constant} = ${formatCoefficient(coefficient)}x + ${constant}`;
      break;
    case 1:
      result = answer;
      questionStr = `Solve:\n${constant} + ${formatCoefficient(coefficient)}x = ${coefficient * answer + constant}`;
      break;
    case 2:
      result = answer;
      questionStr = `Solve:\n${coefficient * answer + constant} = ${formatCoefficient(coefficient)}x + ${constant}`;
      break;
    case 3:
      result = answer;
      questionStr = `Solve:\n${coefficient * answer + constant} = ${constant} + ${formatCoefficient(coefficient)}x`;
      break;
    default:
      result = answer;
      questionStr = `Solve:\n${coefficient * answer + constant} = ${formatCoefficient(coefficient)}x + ${constant}`;
  }

  return {
    id: Math.random(),
    question: questionStr,
    answer: result.toString(),
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
    answer: result.toString(),
    difficulty
  };
};

const generateUnknownsBothSidesQuestion = (difficulty: number): Question => {
  const useDecimals = difficulty > 7;
  const answer = useDecimals 
    ? Math.round((Math.random() * difficulty) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * difficulty) + 1;
  
  const leftCoefficient = Math.floor(Math.random() * 5) + 1;
  const rightCoefficient = Math.floor(Math.random() * 5) + 1;
  const constant = Math.floor(Math.random() * difficulty) + 1;

  const result = answer;
  const questionStr = `Solve:\n${leftCoefficient * answer + constant} = ${formatCoefficient(rightCoefficient)}x + ${constant}`;

  return {
    id: Math.random(),
    question: questionStr,
    answer: result.toString(),
    difficulty
  };
};

export const generateAlgebraQuestions = (type: string, difficulty: number): Question[] => {
  const generator = type === "algebra_one_step" ? generateOneStepQuestion :
                   type === "algebra_two_step" ? generateTwoStepQuestion :
                   generateUnknownsBothSidesQuestion;
                   
  return Array(20).fill(null).map(() => generator(difficulty));
};