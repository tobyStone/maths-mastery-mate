import { Question } from "@/types/math";

const formatCoefficient = (coefficient: number) => {
  if (coefficient === 1) return "";
  if (coefficient === -1) return "-";
  return coefficient.toString();
};

const generateOneStepQuestion = (difficulty: number): Question => {
  const operators = ["×", "÷", "+", "-"];
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const answer = Math.floor(Math.random() * (difficulty * 2)) + 1;
  const coefficient = Math.floor(Math.random() * 4) + 2;
  
  let questionStr = "";
  let result;
  
  switch(operator) {
    case "×":
      result = answer * coefficient;
      questionStr = `${result} = ${coefficient}x`;
      break;
    case "÷":
      result = answer * coefficient;
      questionStr = `${result} = x ÷ ${coefficient}`;
      break;
    case "+":
      result = answer + coefficient;
      questionStr = `${result} = x + ${coefficient}`;
      break;
    case "-":
      result = answer - coefficient;
      questionStr = `${result} = x - ${coefficient}`;
      break;
  }

  // Only use decimals in higher difficulty levels
  if (difficulty < 8) {
    result = Math.floor(result);
  }

  return {
    id: Math.random(),
    question: `Solve:\n${questionStr}`,
    answer: `x = ${answer}`,
    difficulty
  };
};

const generateTwoStepQuestion = (difficulty: number): Question => {
  const operators = [
    { first: "×", second: "+" },
    { first: "×", second: "-" },
    { first: "÷", second: "+" },
    { first: "÷", second: "-" }
  ];
  const operatorPair = operators[Math.floor(Math.random() * operators.length)];
  
  const answer = Math.floor(Math.random() * difficulty) + 1;
  const coefficient = Math.floor(Math.random() * 4) + 2;
  const constant = Math.floor(Math.random() * (difficulty / 2)) + 1;
  
  let result;
  if (operatorPair.first === "×") {
    result = coefficient * answer + (operatorPair.second === "+" ? constant : -constant);
  } else {
    result = answer / coefficient + (operatorPair.second === "+" ? constant : -constant);
  }
  
  const questionStr = `${result} = ${operatorPair.first === "×" ? formatCoefficient(coefficient) : ""}x ${operatorPair.first === "÷" ? `÷ ${coefficient}` : ""} ${operatorPair.second} ${constant}`;

  return {
    id: Math.random(),
    question: `Solve:\n${questionStr}`,
    answer: `x = ${answer}`,
    difficulty
  };
};

const generateUnknownsBothSidesQuestion = (difficulty: number): Question => {
  let leftCoefficient = Math.floor(Math.random() * 4) + 1;
  let rightCoefficient;
  do {
    rightCoefficient = Math.floor(Math.random() * 4) + 1;
  } while (rightCoefficient === leftCoefficient);
  
  const answer = Math.floor(Math.random() * difficulty) + 1;
  const constant = Math.floor(Math.random() * (difficulty * 2)) + 1;
  
  // Using subtraction instead of negative numbers
  const questionStr = `${formatCoefficient(leftCoefficient)}x - ${constant} = ${formatCoefficient(rightCoefficient)}x - ${constant + (leftCoefficient - rightCoefficient) * answer}`;

  return {
    id: Math.random(),
    question: `Solve:\n${questionStr}`,
    answer: `x = ${answer}`,
    difficulty
  };
};

const generateMonicFactorisingQuestion = (difficulty: number): Question => {
  const maxRoot = Math.min(6, Math.floor(difficulty * 1.5));
  const root1 = Math.floor(Math.random() * maxRoot) - Math.floor(maxRoot/2);
  let root2;
  do {
    root2 = Math.floor(Math.random() * maxRoot) - Math.floor(maxRoot/2);
  } while (root2 === 0 || root1 === 0); // Avoid zero roots
  
  const sum = -(root1 + root2);
  const product = root1 * root2;
  
  return {
    id: Math.random(),
    question: `Solve:\nx² ${sum >= 0 ? '+' : ''}${sum}x ${product >= 0 ? '+' : ''}${product} = 0`,
    answer: `x = ${root1}, x = ${root2}`,
    difficulty
  };
};

const generateNonMonicFactorisingQuestion = (difficulty: number): Question => {
  const maxCoeff = Math.min(5, Math.floor(difficulty * 1.2));
  const a = Math.floor(Math.random() * (maxCoeff - 1)) + 2;
  let root1, root2;
  do {
    root1 = Math.floor(Math.random() * 5) - 2;
    root2 = Math.floor(Math.random() * 5) - 2;
  } while (root1 === 0 || root2 === 0); // Avoid zero roots
  
  const sum = -(root1 + root2) * a;
  const product = root1 * root2 * a;
  
  return {
    id: Math.random(),
    question: `Solve:\n${a}x² ${sum >= 0 ? '+' : ''}${sum}x ${product >= 0 ? '+' : ''}${product} = 0`,
    answer: `x = ${root1}, x = ${root2}`,
    difficulty
  };
};

const generateExpandingQuestion = (difficulty: number): Question => {
  const maxNum = Math.min(5, Math.floor(difficulty * 1.2));
  const a = difficulty > 5 ? Math.floor(Math.random() * 3) + 2 : 1;
  let b, c, d;
  do {
    b = Math.floor(Math.random() * maxNum) + 1;
    c = Math.floor(Math.random() * maxNum) + 1;
    d = Math.floor(Math.random() * maxNum) + 1;
  } while (b === 0 || c === 0 || d === 0); // Avoid zero coefficients
  
  const expanded = {
    x2: a * c,
    x: a * d + b * c,
    constant: b * d
  };
  
  return {
    id: Math.random(),
    question: `Expand:\n(${a === 1 ? '' : a}x ${b >= 0 ? '+' : ''}${b})(${c === 1 ? '' : c}x ${d >= 0 ? '+' : ''}${d})`,
    answer: `${expanded.x2}x² ${expanded.x >= 0 ? '+' : ''}${expanded.x}x ${expanded.constant >= 0 ? '+' : ''}${expanded.constant}`,
    difficulty
  };
};

export const generateAlgebraQuestions = (type: string, difficulty: number): Question[] => {
  const generator = type === "algebra_one_step" ? generateOneStepQuestion :
                   type === "algebra_two_step" ? generateTwoStepQuestion :
                   type === "algebra_unknowns_both_sides" ? generateUnknownsBothSidesQuestion :
                   type === "algebra_factorising_monic" ? generateMonicFactorisingQuestion :
                   type === "algebra_factorising_nonmonic" ? generateNonMonicFactorisingQuestion :
                   generateExpandingQuestion;
                   
  return Array(20).fill(null).map(() => generator(difficulty));
};