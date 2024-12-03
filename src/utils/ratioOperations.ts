import { Question } from "@/types/math";
import { gcd } from "./mathUtils";

const generateRatioQuestion = (type: string, difficulty: number): Question => {
  const maxNum = Math.min(20, Math.floor(difficulty * 3));
  
  switch (type) {
    case "simplifying": {
      const factor = Math.floor(Math.random() * 5) + 2;
      const num1 = (Math.floor(Math.random() * maxNum) + 1) * factor;
      const num2 = (Math.floor(Math.random() * maxNum) + 1) * factor;
      const divisor = gcd(num1, num2);
      return {
        id: Math.random(),
        question: `Simplify the ratio ${num1}:${num2}`,
        answer: `${num1/divisor}:${num2/divisor}`,
        difficulty
      };
    }
    case "sharing": {
      const total = (Math.floor(Math.random() * maxNum) + 1) * 10;
      const ratio1 = Math.floor(Math.random() * 5) + 1;
      const ratio2 = Math.floor(Math.random() * 5) + 1;
      const sum = ratio1 + ratio2;
      const part1 = (total * ratio1) / sum;
      const part2 = (total * ratio2) / sum;
      return {
        id: Math.random(),
        question: `Share ${total} in the ratio ${ratio1}:${ratio2}`,
        answer: `${part1}:${part2}`,
        difficulty
      };
    }
    default: { // comparing
      const ratio1_1 = Math.floor(Math.random() * maxNum) + 1;
      const ratio1_2 = Math.floor(Math.random() * maxNum) + 1;
      const factor = Math.floor(Math.random() * 3) + 2;
      const ratio2_1 = ratio1_1 * factor;
      const ratio2_2 = ratio1_2 * factor;
      return {
        id: Math.random(),
        question: `Are these ratios equivalent? ${ratio1_1}:${ratio1_2} and ${ratio2_1}:${ratio2_2}`,
        answer: "Yes",
        difficulty
      };
    }
  }
};

export const generateRatioQuestions = (type: string, difficulty: number): Question[] => {
  return Array(20).fill(null).map(() => generateRatioQuestion(type.split('_').pop() || "", difficulty));
};