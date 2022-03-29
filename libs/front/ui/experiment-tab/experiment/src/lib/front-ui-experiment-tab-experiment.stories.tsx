import { BooleanInput } from '@lab-studio/front/ui/experiment-tab/boolean-input';
import { EnumInput } from '@lab-studio/front/ui/experiment-tab/enum-input';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';
import { makeSubRecipeInput } from '@lab-studio/front/ui/experiment-tab/sub-recipe-form';
import {
  InstrumentName,
  ScopeInstruments,
  ScopeVariables,
} from '@lab-studio/shared/data/recipe/experiment-scope';
import {
  ExperimentMeasurement,
  PlainifiedRecipe,
  RecipeInfo,
} from '@lab-studio/shared/data/recipe/recipe';
import {
  RecipeOutput,
  RecipeOutputTypes,
} from '@lab-studio/shared/data/recipe/recipe-output';
import { useArgs } from '@storybook/client-api';
import { Meta, Story } from '@storybook/react';
import { instanceToPlain, Type } from 'class-transformer';
import * as R from 'ramda';
import 'reflect-metadata';
import { InstrumentInput } from '@lab-studio/front/ui/experiment-tab/instrument-input';
import { makeExperiment } from './front-ui-experiment-tab-experiment';

enum ChannelMode {
  SweepCurrent = 'Sweep Current',
  SweepVoltage = 'Sweep Voltage',
  FixedCurrent = 'Fixed Current',
  FixedVoltage = 'Fixed Voltage',
}

abstract class ChannelModeRecipe {
  abstract info(): RecipeInfo<ChannelModeRecipe>;
}

class SweepRecipe extends ChannelModeRecipe {
  start = 0;
  step = 1e-5;
  stop = 1e-4;
  unit = 'V';

  info(): RecipeInfo<SweepRecipe> {
    return {
      start: {
        errorMessage:
          Math.abs(this.start) > 1e2 ? 'Input too large (> 100)' : undefined,
      },
      step: {
        errorMessage:
          Math.sign(this.step * (this.stop - this.start)) <= 0
            ? 'Step sign should be inverted'
            : undefined,
      },
      stop: {
        errorMessage:
          Math.abs(this.stop) > 1e2 ? 'Input too large (> 100)' : undefined,
      },
    };
  }
}

function SweepRecipeForm(props: RecipeFormProps<SweepRecipe>) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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

  info(): RecipeInfo<FixedRecipe> {
    return {
      value: {
        errorMessage:
          Math.abs(this.value) > 1e2 ? 'Input too large (> 100)' : undefined,
      },
    };
  }
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

  info(): RecipeInfo<ChannelRecipe> {
    return {
      recipe: this.recipe.info(),
    };
  }
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
  instrument: InstrumentName = '';

  @Type(() => ChannelRecipe)
  channelARecipe = new ChannelRecipe();
  @Type(() => ChannelRecipe)
  channelBRecipe = new ChannelRecipe();

  output(): RecipeOutput {
    return {
      innerOutputList: {
        'Channel A Current': {
          type:
            this.channelARecipe.mode === ChannelMode.FixedVoltage ||
            this.channelARecipe.mode === ChannelMode.SweepVoltage
              ? RecipeOutputTypes.Number
              : RecipeOutputTypes.None,
          declare: 'ia',
          write: 'ia',
        },
        'Channel A Voltage': {
          type:
            this.channelARecipe.mode === ChannelMode.FixedCurrent ||
            this.channelARecipe.mode === ChannelMode.SweepCurrent
              ? RecipeOutputTypes.Number
              : RecipeOutputTypes.None,
          declare: 'va',
          write: 'va',
        },
        'Channel B Current': {
          type:
            this.channelBRecipe.mode === ChannelMode.FixedVoltage ||
            this.channelBRecipe.mode === ChannelMode.SweepVoltage
              ? RecipeOutputTypes.Number
              : RecipeOutputTypes.None,
          declare: 'ib',
          write: 'ib',
        },
        'Channel B Voltage': {
          type:
            this.channelBRecipe.mode === ChannelMode.FixedCurrent ||
            this.channelBRecipe.mode === ChannelMode.SweepCurrent
              ? RecipeOutputTypes.Number
              : RecipeOutputTypes.None,
          declare: 'vb',
          write: 'vb',
        },
      },
      outerOutputList: {
        'All Channel A Currents': {
          type:
            this.channelARecipe.mode === ChannelMode.FixedVoltage ||
            this.channelARecipe.mode === ChannelMode.SweepVoltage
              ? RecipeOutputTypes.NumberArray
              : RecipeOutputTypes.None,
          declare: 'Ia',
        },
        'All Channel A Voltages': {
          type:
            this.channelARecipe.mode === ChannelMode.FixedCurrent ||
            this.channelARecipe.mode === ChannelMode.SweepCurrent
              ? RecipeOutputTypes.NumberArray
              : RecipeOutputTypes.None,
          declare: 'Va',
        },
        'All Channel B Currents': {
          type:
            this.channelBRecipe.mode === ChannelMode.FixedVoltage ||
            this.channelBRecipe.mode === ChannelMode.SweepVoltage
              ? RecipeOutputTypes.NumberArray
              : RecipeOutputTypes.None,
          declare: 'Ib',
        },
        'All Channel B Voltages': {
          type:
            this.channelBRecipe.mode === ChannelMode.FixedCurrent ||
            this.channelBRecipe.mode === ChannelMode.SweepCurrent
              ? RecipeOutputTypes.NumberArray
              : RecipeOutputTypes.None,
          declare: 'Vb',
        },
      },
    };
  }

  info(): RecipeInfo<Recipe> {
    return {
      channelARecipe: this.channelARecipe.info(),
      channelBRecipe: this.channelBRecipe.info(),
    };
  }
}

function RecipeForm(props: RecipeFormProps<Recipe>) {
  return (
    <div>
      <InstrumentInput
        parentRecipeFormProps={props}
        entry="instrument"
        model="keithley-2600"
      />
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
    </div>
  );
}

const RecipeExperiment = makeExperiment(
  RecipeForm,
  Recipe,
  (recipe) => recipe.output(),
  (recipe) => recipe.info()
);

export default {
  component: RecipeExperiment,
  title: 'RecipeExperiment',
} as Meta;

const Template: Story<{
  experimentMeasurement: ExperimentMeasurement<Recipe>;
  columns: string[];
  instruments: ScopeInstruments;
  variables: ScopeVariables;
}> = (args) => {
  const [argValues, updateArgs] = useArgs();
  return (
    <RecipeExperiment
      {...args}
      onChange={(experimentMeasurement) =>
        updateArgs({ experimentMeasurement })
      }
      scope={{
        columns: args.columns,
        instruments: args.instruments,
        variables: args.variables,
        addresses: [],
      }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  experimentMeasurement: {
    plainifiedRecipe: instanceToPlain(new Recipe()) as PlainifiedRecipe<Recipe>,
    recipeOutput: new Recipe().output(),
  },
  columns: ['ia', 'va', 'ib', 'vb'],
  instruments: {
    Gate: 'keithley-2600',
    Bias: 'keithley-2600',
    Cryostat: 'lake-shore-336',
    Magnet: 'lake-shore-625',
    Compressor: 'sumitomo-f70',
  },
  variables: {
    i: RecipeOutputTypes.Number,
    iAll: RecipeOutputTypes.NumberArray,
  },
};
