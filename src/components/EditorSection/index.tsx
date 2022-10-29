import { Col, Row } from "antd";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "./style.css";

type EditorProps = {
  editor: {}[];
  identifier: string;
  value: {
    row: number;
    column: number;
    section: number;
  };
};

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: "none",
  border: isDragging ? "2px dashed #ddd" : "none",
  margin: "2px 10px",
  background: isDragging ? "#eee" : "inherit",
  transition: "background 0.2s ease-in",
  ...draggableStyle,
});

const EditorSection = ({ editor, identifier, value }: EditorProps) => {
  console.log("count", value);
  console.log("Editor", editor);
  return (
    <div>
      {[...Array(value.row)].map((row, indexRow) => {
        return (
          <>
            <Row>
              {[...Array(value.column)].map((col, indexCol) => {
                return (
                  <Col span={24 / value.column} className="grid-line">
                    <Droppable
                      droppableId={`${identifier}_${indexRow}_${indexCol}`}
                      key={`${identifier}_${indexRow}_${indexCol}`}
                    >
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <Draggable
                            key={indexCol}
                            draggableId={`${identifier}_${indexRow}_${indexCol}`}
                            index={indexCol}
                            isDragDisabled={true}
                          >
                            {(provided, snapshots) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className=""
                                style={getItemStyle(
                                  snapshots.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                {<p>Test</p>}
                              </div>
                            )}
                          </Draggable>
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Col>
                );
              })}
            </Row>
          </>
        );
      })}
    </div>
  );
};

export default EditorSection;
