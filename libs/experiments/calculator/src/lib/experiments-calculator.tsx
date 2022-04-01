import { makeExperimentRenderer } from '@lab-studio/experiments/util';
import { makeExperiment } from '@lab-studio/front/ui/experiment-tab/experiment';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { StringInput } from '@lab-studio/front/ui/experiment-tab/string-input';
import {
  RecipeOutput,
  RecipeOutputTypes,
} from '@lab-studio/shared/data/recipe/recipe-output';
import { ReactComponent as CalculatorIcon } from '../assets/calculator.svg';
import * as math from 'mathjs';
import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import { RecipeInfo } from '@lab-studio/shared/data/recipe/recipe';

class CalculatorRecipe {
  expression = '';

  output(): RecipeOutput {
    return {
      innerOutputList: {},
      outerOutputList: {
        Result: {
          type: RecipeOutputTypes.Any,
        },
      },
    };
  }

  info(environment?: ExperimentScope): RecipeInfo<CalculatorRecipe> {
    try {
      const symbols = math
        .parse(this.expression)
        .filter((node) => node.type === 'SymbolNode')
        .filter(function (node): node is math.SymbolNode {
          return true;
        })
        .map((node) => node.name);
      const undefinedSymbols = symbols.filter(
        (symbol) =>
          !(symbol in math || symbol in (environment?.variables || {}))
      );
      return {
        expression: {
          errorMessage: undefinedSymbols.length
            ? `Undefined variables: ${Array.from(
                new Set(undefinedSymbols)
              ).join(', ')}.`
            : undefined,
        },
      };
    } catch (e) {
      return {
        expression: {
          errorMessage: String(e),
        },
      };
    }
  }
}

function CalculatorForm(props: RecipeFormProps<CalculatorRecipe>) {
  return (
    <div>
      <StringInput parentRecipeFormProps={props} entry="expression" />
    </div>
  );
}

const CalculatorExperiment = makeExperiment(
  CalculatorForm,
  CalculatorRecipe,
  (recipe) => recipe.output(),
  (recipe, environment) => recipe.info(environment)
);

export const CalculatorRenderer = makeExperimentRenderer(
  CalculatorRecipe,
  CalculatorExperiment,
  <CalculatorIcon style={{ width: 60 }} />,
  'Calculator'
);
