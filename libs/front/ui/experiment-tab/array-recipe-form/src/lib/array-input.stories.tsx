import 'reflect-metadata';
import { makeExperiment } from '@lab-studio/front/ui/experiment-tab/experiment';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';
import {
  ExperimentMeasurement,
  PlainifiedRecipe,
} from '@lab-studio/shared/data/recipe/recipe';
import {
  RecipeOutput,
  RecipeOutputTypes,
} from '@lab-studio/shared/data/recipe/recipe-output';
import { useArgs } from '@storybook/client-api';
import { Meta, Story } from '@storybook/react';
import { instanceToPlain, Type } from 'class-transformer';
import { makeArrayRecipeInput } from './front-ui-experiment-tab-array-recipe-form';
import * as R from 'ramda';
import {
  ScopeInstruments,
  ScopeVariables,
} from '@lab-studio/shared/data/recipe/experiment-scope';

class FixedVoltageRecipe {
  value = 0;
}

function FixedVoltageRecipeForm(props: RecipeFormProps<FixedVoltageRecipe>) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NumberInput parentRecipeFormProps={props} entry="value" />
      <NumberInput parentRecipeFormProps={props} entry="value" />
    </div>
  );
}

const ArrayFixedVoltageRecipeInput = makeArrayRecipeInput(
  FixedVoltageRecipeForm,
  FixedVoltageRecipe
);

class StepVoltageRecipe {
  @Type(() => FixedVoltageRecipe)
  voltages: Array<FixedVoltageRecipe> = [];

  output(oldOutput?: RecipeOutput): RecipeOutput {
    return {
      innerOutputList: R.zipObj(
        R.range(0, this.voltages.length).map((num) => `Current${num}`),
        R.times(
          (num) => ({
            type: RecipeOutputTypes.Number,
            declare:
              oldOutput?.innerOutputList[`Current${num}`]?.declare || `i${num}`,
            write: oldOutput?.innerOutputList[`Current${num}`]?.write || 'i',
          }),
          this.voltages.length
        )
      ),
      outerOutputList: {},
    };
  }
}

function StepVoltageRecipeForm(props: RecipeFormProps<StepVoltageRecipe>) {
  return (
    <ArrayFixedVoltageRecipeInput
      parentRecipeFormProps={props}
      entry="voltages"
    />
  );
}

const StepVoltageRecipeExperiment = makeExperiment(
  StepVoltageRecipeForm,
  StepVoltageRecipe,
  (recipe) => recipe.output()
);

export default {
  component: StepVoltageRecipeExperiment,
  title: 'StepVoltageRecipeExperiment',
} as Meta;

const Template: Story<{
  experimentMeasurement: ExperimentMeasurement<StepVoltageRecipe>;
  columns: string[];
  variables: ScopeVariables;
  instruments: ScopeInstruments;
}> = (args) => {
  const [, updateArgs] = useArgs();
  return (
    <StepVoltageRecipeExperiment
      {...args}
      onChange={(experimentMeasurement) =>
        updateArgs({ experimentMeasurement })
      }
      scope={{
        ...args,
        addresses: [],
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  experimentMeasurement: {
    plainifiedRecipe: instanceToPlain(
      new StepVoltageRecipe()
    ) as PlainifiedRecipe<StepVoltageRecipe>,
    recipeOutput: {
      innerOutputList: {},
      outerOutputList: {},
    },
  },
  columns: ['ia', 'va', 'ib', 'vb'],
  variables: {},
  instruments: {},
};
