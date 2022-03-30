import {
  SubroutinesRenderer,
  SubroutinesRendererProps,
} from '@lab-studio/front/feature/experiment-tab/routine-renderer';
import { injectable } from 'inversify';
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
} from 'react-beautiful-dnd';

export interface WithDragHandle {
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

@injectable()
export class DetailedSubroutinesRenderer
  implements SubroutinesRenderer<WithDragHandle>
{
  render(props: SubroutinesRendererProps<WithDragHandle>) {
    return (
      <div>
        <div>{props.experiment}</div>
        <div
          style={{
            margin: '10px',
          }}
        >
          <DragDropContext
            onDragEnd={(result) => {
              if (!result.destination) return;
              props.onMove(result.source.index, result.destination?.index);
            }}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {props.subroutines.map((subroutine, i) => (
                    <Draggable
                      key={subroutine.key}
                      draggableId={subroutine.key}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div key={subroutine.key}>
                            {subroutine.render({
                              dragHandleProps: provided.dragHandleProps,
                            })}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {props.menu}
        </div>
      </div>
    );
  }
}
