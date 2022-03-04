import { RecipeInfo } from '@lab-studio/shared/data/recipe/recipe';
import { Story, Meta } from '@storybook/react';
import { Type } from 'class-transformer';
import { makeExperiment } from './front-ui-experiment-tab-experiment';
import 'reflect-metadata';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';
import { makeSubRecipeInput } from '@lab-studio/front/ui/experiment-tab/sub-recipe-form';
import { EnumInput } from '@lab-studio/front/ui/experiment-tab/enum-input';
import { BooleanInput } from '@lab-studio/front/ui/experiment-tab/boolean-input';
import { useState } from 'react';

enum ChannelMode {
  SweepCurrent = 'Sweep Current',
  SweepVoltage = 'Sweep Voltage',
  FixedCurrent = 'Fixed Current',
  FixedVoltage = 'Fixed Voltage',
}

class SweepRecipe {
  start = 0;
  step = 1e-5;
  stop = 1e-4;
}

class SweepCurrentRecipe extends SweepRecipe {}

class SweepVoltageRecipe extends SweepRecipe {}

function SweepRecipeForm(props: RecipeFormProps<SweepRecipe>) {
  const postfix = ((recipe: SweepRecipe) => {
    if (recipe instanceof SweepCurrentRecipe) {
      return 'A';
    } else if (recipe instanceof SweepVoltageRecipe) {
      return 'V';
    } else {
      return '';
    }
  })(props.recipe);
  return (
    <div>
      <NumberInput
        parentRecipeFormProps={props}
        entry="start"
        postfix={postfix}
      />
      <NumberInput
        parentRecipeFormProps={props}
        entry="stop"
        postfix={postfix}
      />
      <NumberInput
        parentRecipeFormProps={props}
        entry="step"
        postfix={postfix}
      />
    </div>
  );
}

const SweepRecipeInput = makeSubRecipeInput(SweepRecipeForm, SweepRecipe);

class FixedRecipe {
  value = 0;
}

class FixedCurrentRecipe extends FixedRecipe {}

class FixedVoltageRecipe extends FixedRecipe {}

function FixedRecipeForm(props: RecipeFormProps<FixedRecipe>) {
  const postfix = ((recipe: FixedRecipe) => {
    if (recipe instanceof FixedCurrentRecipe) {
      return 'A';
    } else if (recipe instanceof FixedVoltageRecipe) {
      return 'V';
    } else {
      return '';
    }
  })(props.recipe);
  return (
    <div>
      <NumberInput
        parentRecipeFormProps={props}
        entry="value"
        postfix={postfix}
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
        this.recipe = new FixedCurrentRecipe();
        break;
      case ChannelMode.FixedVoltage:
        this.recipe = new FixedVoltageRecipe();
        break;
      case ChannelMode.SweepCurrent:
        this.recipe = new SweepCurrentRecipe();
        break;
      case ChannelMode.SweepVoltage:
        this.recipe = new SweepVoltageRecipe();
        break;
    }
  }

  turnOffAfterDone = false;

  @Type(() => Object, {
    discriminator: {
      property: '_mode',
      subTypes: [
        { value: FixedCurrentRecipe, name: ChannelMode.FixedCurrent },
        { value: FixedVoltageRecipe, name: ChannelMode.FixedVoltage },
        { value: SweepCurrentRecipe, name: ChannelMode.SweepCurrent },
        { value: SweepVoltageRecipe, name: ChannelMode.SweepVoltage },
      ],
    },
  })
  recipe: FixedRecipe | SweepRecipe = new FixedVoltageRecipe();
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

const RecipeExperiment = makeExperiment(RecipeForm, Recipe);

export default {
  component: RecipeExperiment,
  title: 'RecipeExperiment',
} as Meta;

const Template: Story = (args) => {
  const [recipe, setRecipe] = useState(new Recipe());
  return <RecipeExperiment recipe={recipe} onChange={setRecipe} />;
};

export const Default = Template.bind({});
Default.args = {};
