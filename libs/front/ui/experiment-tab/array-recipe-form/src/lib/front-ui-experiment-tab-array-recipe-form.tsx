import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { InputProps } from '@lab-studio/front/ui/experiment-tab/input-props';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SwipeVerticalOutlinedIcon from '@mui/icons-material/SwipeVerticalOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { PickByValueExact } from 'utility-types';

interface ArrayRecipeFormProps<
  TRecipe,
  TElementRecipe,
  TEntry extends keyof PickByValueExact<TRecipe, Array<TElementRecipe>>
> {
  parentRecipeFormProps: RecipeFormProps<TRecipe>;
  entry: TEntry;
  subRecipeForm: (props: RecipeFormProps<TElementRecipe>) => JSX.Element;
  allocator: {
    new (): TElementRecipe;
  };
}

function FrontUiExperimentTabArrayRecipeForm<
  TRecipe,
  TElementRecipe,
  TEntry extends keyof PickByValueExact<TRecipe, Array<TElementRecipe>>
>(props: ArrayRecipeFormProps<TRecipe, TElementRecipe, TEntry>) {
  const reorder = <T,>(list: T[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newRecipe = Object.assign(
      new props.parentRecipeFormProps.allocator(),
      props.parentRecipeFormProps.recipe
    );
    // eslint-disable-next-line
    // @ts-ignore
    newRecipe[props.entry] = reorder(
      // eslint-disable-next-line
      // @ts-ignore
      newRecipe[props.entry],
      result.source.index,
      result.destination.index
    );
    props.parentRecipeFormProps.onChange(newRecipe);
  };
  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {(
                props.parentRecipeFormProps.recipe[
                  // eslint-disable-next-line
                // @ts-ignore
                  props.entry
                ] as unknown as Array<TElementRecipe>
              ).map((elementRecipe, i) => {
                return (
                  <Draggable key={i} draggableId={String(i)} index={i}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}>
                        <Divider />
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              width: '100%',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <div {...provided.dragHandleProps}>
                              <SwipeVerticalOutlinedIcon
                                fontSize="small"
                                color="disabled"
                              />
                            </div>
                            <IconButton
                              onClick={(e) => {
                                const newRecipe = Object.assign(
                                  new props.parentRecipeFormProps.allocator(),
                                  props.parentRecipeFormProps.recipe
                                );
                                // eslint-disable-next-line
                                // @ts-ignore
                                newRecipe[props.entry].splice(i, 1);
                                props.parentRecipeFormProps.onChange(newRecipe);
                              }}
                            >
                              <DeleteForeverOutlinedIcon
                                color="error"
                                fontSize="small"
                              />
                            </IconButton>
                          </Box>
                          <props.subRecipeForm
                            recipe={elementRecipe}
                            recipeInfo={
                              // eslint-disable-next-line
                              // @ts-ignore
                              props.parentRecipeFormProps.recipeInfo?.[
                                props.entry
                              ]?.[i]
                            }
                            allocator={props.allocator}
                            onChange={(newElementRecipe) => {
                              const newRecipe = Object.assign(
                                new props.parentRecipeFormProps.allocator(),
                                props.parentRecipeFormProps.recipe
                              );
                              // eslint-disable-next-line
                              // @ts-ignore
                              newRecipe[props.entry][i] = newElementRecipe;
                              props.parentRecipeFormProps.onChange(newRecipe);
                            }}
                          />
                        </Box>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={(e) => {
            const newRecipe = Object.assign(
              new props.parentRecipeFormProps.allocator(),
              props.parentRecipeFormProps.recipe
            );
            // eslint-disable-next-line
            // @ts-ignore
            newRecipe[props.entry].push(new props.allocator());
            props.parentRecipeFormProps.onChange(newRecipe);
          }}
        >
          <AddCircleIcon color="primary" fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}

export function makeArrayRecipeInput<TElementRecipe>(
  subRecipeForm: ArrayRecipeFormProps<
    unknown,
    TElementRecipe,
    never
  >['subRecipeForm'],
  allocator: ArrayRecipeFormProps<unknown, TElementRecipe, never>['allocator']
) {
  return function <
    TRecipe,
    TEntry extends keyof PickByValueExact<TRecipe, Array<TElementRecipe>>
  >(props: InputProps<Array<TElementRecipe>, TRecipe, TEntry>) {
    return (
      <FrontUiExperimentTabArrayRecipeForm
        {...props}
        allocator={allocator}
        subRecipeForm={subRecipeForm}
      />
    );
  };
}
