import CheckboxCard from "./CheckboxCard";
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
import React, { useState } from "react";

const data = [
  {
    id: 1,
    name: "apple",
    checked: false,
    part: 1,
  },
  {
    id: 2,
    name: "mango",
    checked: false,
    part: 1,
  },
  {
    id: 3,
    name: "watermelon",
    checked: false,
    part: 1,
  },
  {
    id: 4,
    name: "guava",
    checked: false,
    part: 1,
  },
  {
    id: 5,
    name: "banana",
    checked: false,
    part: 1,
  },
  {
    id: 6,
    name: "Elephant",
    checked: false,
    part: 2,
  },
  {
    id: 7,
    name: "Cow",
    checked: false,
    part: 2,
  },
  {
    id: 8,
    name: "Monkey",
    checked: false,
    part: 2,
  },
  {
    id: 9,
    name: "Goat",
    checked: false,
    part: 2,
  },
  {
    id: 10,
    name: "Horse",
    checked: false,
    part: 2,
  },
];
interface IData {
  id: number;
  name: string;
  checked: boolean;
  part: number;
}
function Container() {
  const [items, setItems] = useState<IData[]>(data);

  const reorder = (
    list: IData[],
    startIndex: number,
    endIndex: number
  ): IData[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      data,
      result.source.index,
      result.destination.index
    );

    setItems(() => {
      return newItems;
    });
  }

  const getItemStyle = (
    isDragging: boolean,
    draggableStyle: React.CSSProperties
  ) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: 1 * 2,
    margin: "0 0 1px 0",

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: "grid",
    width: 250,
  });

  return (
    <>
      <div className="card-container">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                className="card-container-1"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items
                  .filter((el) => el.part === 1)
                  .map((el, index) => (
                    <Draggable
                      key={el.id}
                      draggableId={el.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="checkbox-wrapper"
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <CheckboxCard
                            key={el.id}
                            name={el.name}
                            checked={el.checked}
                          ></CheckboxCard>
                        </div>
                      )}
                    </Draggable>
                  ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-2">
            {(provided, snapshot) => (
              <div
                className="card-container-2"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {items
                  .filter((el) => el.part === 2)
                  .map((el, index) => (
                    <Draggable
                      key={el.id}
                      draggableId={el.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="checkbox-wrapper"
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                        >
                          <CheckboxCard
                            key={el.id}
                            name={el.name}
                            checked={el.checked}
                          ></CheckboxCard>
                        </div>
                      )}
                    </Draggable>
                  ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default Container;
