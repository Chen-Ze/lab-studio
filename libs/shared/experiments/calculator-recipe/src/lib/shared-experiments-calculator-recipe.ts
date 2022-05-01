import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import { RecipeInfo } from '@lab-studio/shared/data/recipe/recipe';
import {
  RecipeOutput,
  RecipeOutputTypes,
} from '@lab-studio/shared/data/recipe/recipe-output';
import * as math from 'mathjs';

export class CalculatorRecipe {
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
