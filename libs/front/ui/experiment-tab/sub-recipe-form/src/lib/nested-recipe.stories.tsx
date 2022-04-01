import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';
import { RecipeInfo } from '@lab-studio/shared/data/recipe/recipe';
import { Meta, Story } from '@storybook/react';
import { instanceToPlain, plainToInstance, Type } from 'class-transformer';
import { useState } from 'react';
import { makeSubRecipeInput } from './front-ui-experiment-tab-sub-recipe-form';
import 'reflect-metadata';

export default {
  component: MultiChannelForm,
  title: 'NestedRecipe',
} as Meta;

class MultiChannelRecipe {
  @Type(() => ChannelRecipe)
  private _array = new Array<ChannelRecipe>();

  get numberOfChannels() {
    return this._array.length;
  }

  set numberOfChannels(_numberOfChannels: number) {
    this._array.splice(_numberOfChannels);
    while (this._array.length < _numberOfChannels) {
      this._array.push(new ChannelRecipe());
    }
  }

  get array() {
    return this._array;
  }

  set array(newArray: Array<ChannelRecipe>) {
    this._array = newArray;
  }

  validation(): RecipeInfo<MultiChannelRecipe> {
    return {
      array: this._array.map((channelRecipe) => channelRecipe.validation()),
    };
  }
}

class ChannelRecipe {
  value = 1234;

  validation(): RecipeInfo<ChannelRecipe> {
    let errorMessage;
    if (this.value < 0) {
      errorMessage = 'Value cannot be negative';
    } else if (this.value >= 1000) {
      errorMessage = 'Value is too large (>= 1000).';
    }
    return {
      value: { errorMessage },
    };
  }
}

function MultiChannelForm(props: RecipeFormProps<MultiChannelRecipe>) {
  return (
    <div>
      <NumberInput parentRecipeFormProps={props} entry="numberOfChannels" />
      <ChannelArrayInput parentRecipeFormProps={props} entry="array" />
    </div>
  );
}

function ChannelArrayForm(props: RecipeFormProps<Array<ChannelRecipe>>) {
  return (
    <div>
      {props.recipe.map((_, key) => {
        return (
          <ChannelInput key={key} parentRecipeFormProps={props} entry={+key} />
        );
      })}
    </div>
  );
}

const ChannelArrayInput = makeSubRecipeInput(ChannelArrayForm, Array);

function ChannelForm(props: RecipeFormProps<ChannelRecipe>) {
  return <NumberInput parentRecipeFormProps={props} entry="value" />;
}

const ChannelInput = makeSubRecipeInput(ChannelForm, ChannelRecipe);

const Template: Story = (args) => {
  const [recipe, setRecipe] = useState(() => {
    const multiChannelRecipe = new MultiChannelRecipe();
    multiChannelRecipe.numberOfChannels = 2;
    const multiChannelRecipeObj = instanceToPlain(multiChannelRecipe);
    return multiChannelRecipeObj;
  });

  return (
    <MultiChannelForm
      recipe={plainToInstance(MultiChannelRecipe, recipe)}
      recipeInfo={plainToInstance(MultiChannelRecipe, recipe).validation()}
      allocator={MultiChannelRecipe}
      onChange={(newRecipe) => {
        setRecipe(instanceToPlain(newRecipe));
      }}
      scope={{
        columns: [],
        instruments: {},
        variables: {},
        addresses: [],
      }}
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {};
