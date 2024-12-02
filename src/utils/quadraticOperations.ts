import { Question } from "@/types/math";

const generateMonicFactorisingQuestion = (difficulty: number): Question => {
  // Start with simpler questions at lower difficulties
  const maxRoot = Math.min(6, Math.floor(difficulty * 1.5));
  const root1 = Math.floor(Math.random() * maxRoot) - Math.floor(maxRoot/2);
  const root2 = Math.floor(Math.random() * maxRoot) - Math.floor(maxRoot/2);
  
  const sum = -(root1 + root2);
  const product = root1 * root2;
  
  return {
    id: Math.random(),
    question: `Solve:\nx² ${sum >= 0 ? '+' : ''}${sum}x ${product >= 0 ? '+' : ''}${product}`,
    answer: `(x ${root1 >= 0 ? '-' : '+'}${Math.abs(root1)})(x ${root2 >= 0 ? '-' : '+'}${Math.abs(root2)})`,
    difficulty
  };
};

const generateNonMonicFactorisingQuestion = (difficulty: number): Question => {
  // Start with simpler coefficients at lower difficulties
  const maxCoeff = Math.min(5, Math.floor(difficulty * 1.2));
  const a = Math.floor(Math.random() * (maxCoeff - 1)) + 2; // coefficient of x²
  const root1 = Math.floor(Math.random() * 5) - 2;
  const root2 = Math.floor(Math.random() * 5) - 2;
  
  const sum = -(root1 + root2) * a;
  const product = root1 * root2 * a;
  
  return {
    id: Math.random(),
    question: `Solve:\n${a}x² ${sum >= 0 ? '+' : ''}${sum}x ${product >= 0 ? '+' : ''}${product}`,
    answer: `${a}(x ${root1 >= 0 ? '-' : '+'}${Math.abs(root1)})(x ${root2 >= 0 ? '-' : '+'}${Math.abs(root2)})`,
    difficulty
  };
};

const generateExpandingQuestion = (difficulty: number): Question => {
  // Start with simpler coefficients at lower difficulties
  const maxNum = Math.min(5, Math.floor(difficulty * 1.2));
  const a = difficulty > 5 ? Math.floor(Math.random() * 3) + 2 : 1; // coefficient of x
  const b = Math.floor(Math.random() * maxNum) + 1; // constant term
  const c = Math.floor(Math.random() * maxNum) + 1; // coefficient of x in second bracket
  const d = Math.floor(Math.random() * maxNum) + 1; // constant term in second bracket
  
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

export const generateQuadraticQuestions = (type: string, difficulty: number): Question[] => {
  const generator = 
    type === "algebra_factorising_monic" ? generateMonicFactorisingQuestion :
    type === "algebra_factorising_nonmonic" ? generateNonMonicFactorisingQuestion :
    generateExpandingQuestion;
    
  return Array(20).fill(null).map(() => generator(difficulty));
};