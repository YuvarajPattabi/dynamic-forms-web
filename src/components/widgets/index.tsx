import { Droppable } from "react-beautiful-dnd";
import "./style.css";
import WidgetElemet from "./widgets-dnd";

type ElementProps = {
  elements: {
    id: string;
    name: string;
    type: string;
    icon: any;
  }[];
  identifier: string;
};

const getItemStyle = (isDraggingOver: boolean) => ({
  padding: "8px",
  background: isDraggingOver ? "#c1c1c1" : "inherit",
  transition: "background 0.2s ease-in",
});

const Widgets = ({ elements, identifier }: ElementProps) => {
  return (
    <Droppable droppableId={identifier} key={identifier}>
      {(provided, snapshots) => (
        <div
          className="elements-container"
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getItemStyle(snapshots.isDraggingOver)}
        >
          {elements.map((item, index) => (
            <WidgetElemet
              id={item.id}
              name={item.name}
              type={item.type}
              icon={item.icon}
              index={index}
              key={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Widgets;
