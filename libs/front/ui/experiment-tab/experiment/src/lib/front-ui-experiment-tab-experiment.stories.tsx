import { BooleanInput } from '@lab-studio/front/ui/experiment-tab/boolean-input';
import { EnumInput } from '@lab-studio/front/ui/experiment-tab/enum-input';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';
import { makeSubRecipeInput } from '@lab-studio/front/ui/experiment-tab/sub-recipe-form';
import {
  ExperimentMeasurement,
  PlainifiedRecipe,
} from '@lab-studio/shared/data/recipe/recipe';
import { RecipeOutputFlags } from '@lab-studio/shared/data/recipe/recipe-output';
import { useArgs } from '@storybook/client-api';
import { Meta, Story } from '@storybook/react';
import { instanceToPlain, Type } from 'class-transformer';
import * as R from 'ramda';
import 'reflect-metadata';
import { makeExperiment } from './front-ui-experiment-tab-experiment';

enum ChannelMode {
  SweepCurrent = 'Sweep Current',
  SweepVoltage = 'Sweep Voltage',
  FixedCurrent = 'Fixed Current',
  FixedVoltage = 'Fixed Voltage',
}

abstract class ChannelModeRecipe {}

class SweepRecipe extends ChannelModeRecipe {
  start = 0;
  step = 1e-5;
  stop = 1e-4;
  unit = 'V';
}

function SweepRecipeForm(props: RecipeFormProps<SweepRecipe>) {
  return (
    <div>
      <NumberInput
        parentRecipeFormProps={props}
        entry="start"
        postfix={props.recipe.unit}
      />
      <NumberInput
        parentRecipeFormProps={props}
        entry="stop"
        postfix={props.recipe.unit}
      />
      <NumberInput
        parentRecipeFormProps={props}
        entry="step"
        postfix={props.recipe.unit}
      />
    </div>
  );
}

const SweepRecipeInput = makeSubRecipeInput(SweepRecipeForm, SweepRecipe);

class FixedRecipe extends ChannelModeRecipe {
  value = 0;
  unit = 'V';
}

function FixedRecipeForm(props: RecipeFormProps<FixedRecipe>) {
  return (
    <div>
      <NumberInput
        parentRecipeFormProps={props}
        entry="value"
        postfix={props.recipe.unit}
      />
    </div>
  );
}

const FixedRecipeInput = makeSubRecipeInput(FixedRecipeForm, FixedRecipe);

class ChannelRecipe {
  private _mode = ChannelMode.FixedVoltage;

  get mode() {
    return this._mode;
  }

  set mode(_mode: ChannelMode) {
    this._mode = _mode;
    switch (_mode) {
      case ChannelMode.FixedCurrent:
        this.recipe = new FixedRecipe();
        this.recipe.unit = 'A';
        break;
      case ChannelMode.FixedVoltage:
        this.recipe = new FixedRecipe();
        this.recipe.unit = 'V';
        break;
      case ChannelMode.SweepCurrent:
        this.recipe = new SweepRecipe();
        this.recipe.unit = 'A';
        break;
      case ChannelMode.SweepVoltage:
        this.recipe = new SweepRecipe();
        this.recipe.unit = 'V';
        break;
    }
  }

  turnOffAfterDone = false;

  @Type(() => ChannelModeRecipe, {
    discriminator: {
      property: '__mode',
      subTypes: [
        { value: FixedRecipe, name: ChannelMode.FixedCurrent },
        { value: FixedRecipe, name: ChannelMode.FixedVoltage },
        { value: SweepRecipe, name: ChannelMode.SweepCurrent },
        { value: SweepRecipe, name: ChannelMode.SweepVoltage },
      ],
    },
    // default should be false by the docs, not so in fact however
    // this option also seems not working
    keepDiscriminatorProperty: false,
  })
  recipe: FixedRecipe | SweepRecipe = new FixedRecipe();
}

function ChannelRecipeForm(props: RecipeFormProps<ChannelRecipe>) {
  return (
    <div>
      <EnumInput
        parentRecipeFormProps={props}
        enumObject={ChannelMode}
        entry="mode"
      />
      {props.recipe.recipe instanceof FixedRecipe && (
        <FixedRecipeInput
          parentRecipeFormProps={props}
          entry={'recipe' as never}
        />
      )}
      {props.recipe.recipe instanceof SweepRecipe && (
        <SweepRecipeInput
          parentRecipeFormProps={props}
          entry={'recipe' as never}
        />
      )}
      <BooleanInput parentRecipeFormProps={props} entry="turnOffAfterDone" />
    </div>
  );
}

const ChannelRecipeInput = makeSubRecipeInput(ChannelRecipeForm, ChannelRecipe);

class Recipe {
  @Type(() => ChannelRecipe)
  channelARecipe = new ChannelRecipe();
  @Type(() => ChannelRecipe)
  channelBRecipe = new ChannelRecipe();

  output(): RecipeOutputFlags {
    return {
      innerOutputList: {
        'Channel A Current':
          this.channelARecipe.mode === ChannelMode.FixedVoltage ||
          this.channelARecipe.mode === ChannelMode.SweepVoltage,
        'Channel A Voltage':
          this.channelARecipe.mode === ChannelMode.FixedCurrent ||
          this.channelARecipe.mode === ChannelMode.SweepCurrent,
        'Channel B Current':
          this.channelBRecipe.mode === ChannelMode.FixedVoltage ||
          this.channelBRecipe.mode === ChannelMode.SweepVoltage,
        'Channel B Voltage':
          this.channelBRecipe.mode === ChannelMode.FixedCurrent ||
          this.channelBRecipe.mode === ChannelMode.SweepCurrent,
      },
      outerOutputList: {
        'All Channel A Currents':
          this.channelARecipe.mode === ChannelMode.FixedVoltage ||
          this.channelARecipe.mode === ChannelMode.SweepVoltage,
        'All Channel A Voltages':
          this.channelARecipe.mode === ChannelMode.FixedCurrent ||
          this.channelARecipe.mode === ChannelMode.SweepCurrent,
        'All Channel B Currents':
          this.channelBRecipe.mode === ChannelMode.FixedVoltage ||
          this.channelBRecipe.mode === ChannelMode.SweepVoltage,
        'All Channel B Voltages':
          this.channelBRecipe.mode === ChannelMode.FixedCurrent ||
          this.channelBRecipe.mode === ChannelMode.SweepCurrent,
      },
    };
  }
}

function RecipeForm(props: RecipeFormProps<Recipe>) {
  return (
    <div style={{ display: 'flex' }}>
      <ChannelRecipeInput
        parentRecipeFormProps={props}
        entry="channelARecipe"
      />
      <ChannelRecipeInput
        parentRecipeFormProps={props}
        entry="channelBRecipe"
      />
    </div>
  );
}

const RecipeExperiment = makeExperiment(RecipeForm, Recipe, (recipe) =>
  recipe.output()
);

export default {
  component: RecipeExperiment,
  title: 'RecipeExperiment',
} as Meta;

const Template: Story<{
  experimentMeasurement: ExperimentMeasurement<Recipe>;
  columns: string[];
}> = (args) => {
  const [argValues, updateArgs] = useArgs();
  return (
    <RecipeExperiment
      {...args}
      onChange={(experimentMeasurement) =>
        updateArgs({ experimentMeasurement })
      }
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  experimentMeasurement: {
    plainifiedRecipe: instanceToPlain(new Recipe()) as PlainifiedRecipe<Recipe>,
    recipeOutput: R.mapObjIndexed(
      R.pipe(
        R.filter(Boolean),
        R.mapObjIndexed(() => ({}))
      ),
      new Recipe().output()
    ),
  },
  columns: ['ia', 'va', 'ib', 'vb'],
};