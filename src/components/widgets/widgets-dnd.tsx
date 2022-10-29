import { Draggable } from "react-beautiful-dnd";

type ElementProps = {
  id: string;
  name: string;
  type: string;
  icon: any;
  index: number;
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  border: isDragging ? "2px dashed #ddd" : "1px solid #ddd",
  margin: "2px 10px",
  background: isDragging ? "#eee" : null,
  transition: "background 0.2s ease-in",
  ...draggableStyle,
});

const WidgetElemet = ({ id, name, type, icon, index }: ElementProps) => {
  return (
    <Draggable key={index} draggableId={id} index={index}>
      {(provided, snapshots) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="card"
          style={getItemStyle(
            snapshots.isDragging,
            provided.draggableProps.style
          )}
        >
          <div className="elements-image">{icon}</div>
          <p>{name}</p>
        </div>
      )}
    </Draggable>
  );
};

export default WidgetElemet;
