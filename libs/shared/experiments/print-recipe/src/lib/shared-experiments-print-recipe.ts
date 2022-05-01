import { RecipeOutput } from '@lab-studio/shared/data/recipe/recipe-output';
import { Type } from 'class-transformer';

export class PrintEntryRecipe {
  variableName = '';
  column = '';
}

export class PrintRecipe {
  @Type(() => PrintEntryRecipe)
  entries: PrintEntryRecipe[] = [];

  output(): RecipeOutput {
    return {
      innerOutputList: {},
      outerOutputList: {},
    };
  }
}
