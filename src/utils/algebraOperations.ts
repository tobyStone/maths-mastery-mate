import { Question } from "@/types/math";

const generateOneStepQuestion = (difficulty: number): Question => {
  const useDecimals = difficulty > 7;
  const answer = useDecimals 
    ? Math.round((Math.random() * (difficulty * 2)) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * (difficulty * 2)) + 1;
  
  const constant = useDecimals
    ? Math.round((Math.random() * difficulty) * (difficulty > 9 ? 4 : 2)) / (difficulty > 9 ? 4 : 2)
    : Math.floor(Math.random() * difficulty) + 1;

  const coefficient = Math.floor(Math.random() * 5) + 1;
  
  // Format types: ax + b = c, b + ax = c, c = ax + b, c = b + ax
  const formatType = Math.floor(Math.random() * 4);
  
  let questionStr: string;
  let result: number;
  
  switch (formatType) {
    case 0:
      result = answer;
      questionStr = `Solve:\n${coefficient}x + ${constant} = ${coefficient * answer + constant}`;
      break;
    case 1:
      result = answer;
      questionStr = `Solve:\n${constant} + ${coefficient}x = ${coefficient * answer + constant}`;
      break;
    case 2:
      result = answer;
      questionStr = `Solve:\n${coefficient * answer + constant} = ${coefficient}x + ${constant}`;
      break;
    case 3:
      result = answer;
      questionStr = `Solve:\n${coefficient * answer + constant} = ${constant} + ${coefficient}x`;
      break;
    default:
      result = answer;
      questionStr = `Solve:\n${coefficient}x + ${constant} = ${coefficient * answer + constant}`;
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
  const questionStr = `Solve:\n${coefficient * answer + constant} = ${coefficient}x + ${constant}`;

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
  const questionStr = `Solve:\n${leftCoefficient * answer + constant} = ${rightCoefficient}x + ${constant}`;

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