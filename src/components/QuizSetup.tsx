import { MathTopic } from "@/types/math";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface QuizSetupProps {
  topic: MathTopic;
  setTopic: (topic: MathTopic) => void;
  difficulty: number[];
  setDifficulty: (difficulty: number[]) => void;
  startQuiz: () => void;
}

const QuizSetup = ({ topic, setTopic, difficulty, setDifficulty, startQuiz }: QuizSetupProps) => {
  return (
    <Card className="p-8 shadow-lg border-0 bg-white max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-gray-700">Choose Your Practice</h2>
      <div className="space-y-8">
        <div>
          <label className="block text-xl font-medium mb-4 text-gray-600">Select Topic</label>
          <Select onValueChange={(value: MathTopic) => setTopic(value)} value={topic}>
            <SelectTrigger className="w-full h-12 text-lg">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent className="transition-all duration-700">
              <SelectItem value="arithmetic_integers">Arithmetic: Integer Operations</SelectItem>
              <SelectItem value="algebra_one_step">Algebra - One Step Equations</SelectItem>
              <SelectItem value="algebra_two_step">Algebra - Two Step Equations</SelectItem>
              <SelectItem value="algebra_unknowns_both_sides">Algebra - Unknowns on Both Sides</SelectItem>
              <SelectItem value="algebra_factorising_monic">Algebra - Factorising Monic Quadratics</SelectItem>
              <SelectItem value="algebra_factorising_nonmonic">Algebra - Factorising Non-monic Quadratics</SelectItem>
              <SelectItem value="algebra_expanding_quadratics">Algebra - Expanding Quadratic Expressions</SelectItem>
              <SelectItem value="fractions_addition">Fractions Addition</SelectItem>
              <SelectItem value="fractions_subtraction">Fractions Subtraction</SelectItem>
              <SelectItem value="fractions_multiplication">Fractions Multiplication</SelectItem>
              <SelectItem value="fractions_division">Fractions Division</SelectItem>
              <SelectItem value="fractions_improper_to_mixed">Fractions Improper to Mixed</SelectItem>
              <SelectItem value="fractions_mixed_to_improper">Fractions Mixed to Improper</SelectItem>
              <SelectItem value="mixed_fractions">Mixed Fractions</SelectItem>
              <SelectItem value="decimals_addition">Decimals Addition</SelectItem>
              <SelectItem value="decimals_subtraction">Decimals Subtraction</SelectItem>
              <SelectItem value="decimals_multiplication">Decimals Multiplication</SelectItem>
              <SelectItem value="decimals_division">Decimals Division</SelectItem>
              <SelectItem value="percentages_increase_decrease">Percentages: Increase and Decrease</SelectItem>
              <SelectItem value="percentages_of_amount">Percentages: of an Amount</SelectItem>
              <SelectItem value="percentages_reverse">Percentages: Reverse Percentages</SelectItem>
              <SelectItem value="conversions_fractions_decimals_percentages">FDP: Converting between Fractions, Decimals, and Percentages</SelectItem>
              <SelectItem value="negative_numbers_addition">Negative Numbers: Addition</SelectItem>
              <SelectItem value="negative_numbers_subtraction">Negative Numbers: Subtraction</SelectItem>
              <SelectItem value="negative_numbers_multiplication">Negative Numbers: Multiplication</SelectItem>
              <SelectItem value="negative_numbers_division">Negative Numbers: Division</SelectItem>
              <SelectItem value="negative_numbers_mixed">Negative Numbers: Mixed Operations</SelectItem>
              <SelectItem value="ratio_simplifying">Ratio: Simplifying</SelectItem>
              <SelectItem value="ratio_sharing">Ratio: Sharing in a Given Ratio</SelectItem>
              <SelectItem value="ratio_comparing">Ratio: Comparing Ratios</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-xl font-medium mb-4 text-gray-600">
            Difficulty Range: {difficulty[0]} to {difficulty[1]}
          </label>
          <Slider
            value={[difficulty[0], difficulty[1]]}
            onValueChange={setDifficulty}
            max={10}
            min={1}
            step={1}
            className="my-6"
          />
        </div>
        
        <Button 
          onClick={startQuiz} 
          className="w-full h-14 text-xl bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          Start Practice
        </Button>
      </div>
    </Card>
  );
};

export default QuizSetup;