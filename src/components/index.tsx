import { useState } from "react";
import { AlignLeftOutlined } from "@ant-design/icons";
import {
  FontColorsOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  UserOutlined,
  DownOutlined,
  SwitcherOutlined,
  PaperClipOutlined,
  ControlOutlined,
  DatabaseOutlined,
  CodeOutlined,
} from "@ant-design/icons/lib/icons";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Widgets from "./widgets";
import { Row, Col } from "antd";
import "./style.css";
import EditorSection from "./EditorSection";
import GetRowAndColumnCount from "./Popover";

const Container = () => {
  const widgetElements = [
    {
      id: "7af5e3e1-92bc-4f35-8f93-14bf52db59c4",
      name: "Text",
      type: "text",
      icon: <FontColorsOutlined />,
    },
    {
      id: "37d7207f-fdbc-434e-9e74-a97f6ffcd65a",
      name: "Text Area",
      type: "text-area",
      icon: <AlignLeftOutlined />,
    },
    {
      id: "f711e575-979b-4e97-b104-f93b4cfc859e",
      name: "Number",
      type: "number",
      icon: <NumberOutlined />,
    },
    {
      id: "3ba7491d-f918-4b65-86e7-26814d8c8dc7",
      name: "Currency",
      type: "currency",
      icon: <MoneyCollectOutlined />,
    },
    {
      id: "7443c696-4577-4762-a46a-2ca4fbc94418",
      name: "Date",
      type: "date",
      icon: <CalendarOutlined />,
    },
    {
      id: "7bb9151b-56df-4096-ae31-ce57d0e5df3f",
      name: "Date and Time",
      type: "date-time",
      icon: <FieldTimeOutlined />,
    },
    {
      id: "a03a9cb4-5942-4a90-a4bd-351483c7737a",
      name: "Users",
      type: "users",
      icon: <UserOutlined />,
    },
    {
      id: "6827096f-0dc3-4848-8593-6b6a11beb4aa",
      name: "Dropdown",
      type: "dropdown",
      icon: <DownOutlined />,
    },
    {
      id: "fd3b03e0-4dd0-4c3b-bc9c-25c026515190",
      name: "Yes / No",
      type: "yes-no",
      icon: <SwitcherOutlined />,
    },
    {
      id: "4276abba-8e61-47f2-8da5-fecead1cf982",
      name: "Attachment",
      type: "attachment",
      icon: <PaperClipOutlined />,
    },
    {
      id: "5eb64bf2-7b6f-49fc-ad9e-f77c66895200",
      name: "Lookup",
      type: "lookup",
      icon: <ControlOutlined />,
    },
    {
      id: "fab08a6b-97ac-4af0-8524-658361b86d2a",
      name: "Masters",
      type: "masters",
      icon: <DatabaseOutlined />,
    },
    {
      id: "3d64c676-fddd-4c08-9535-01d5dc2487df",
      name: "Image / Videos / RichText",
      type: "image-video-richText",
      icon: <CodeOutlined />,
    },
  ];

  const [elements, setElements] = useState(widgetElements);
  const [editor, setEditor] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [sectionValues, setSectionValues] = useState([]);

  console.log("section", sectionValues);
  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    const start = source.droppableId;
    const finish = destination?.droppableId;
    console.log("result ===> ", result);

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    if (start === finish) {
      const items = Array.from(elements);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setElements(items);
      return;
    }
    const widgetElement = widgetElements.find(
      (element) => element.id === draggableId
    );
    const replaceObj = editor.findIndex(
      (ele) => ele.columnId === result.destination?.droppableId
    );
    console.log(replaceObj);
    // if (replaceObj > -1) {
    //   editor[replaceObj].widgetId = widgetElement?.id;
    //   editor[replaceObj].widgetType = widgetElement?.type;
    // }
    const columnValue = {
      widgetId: widgetElement?.id,
      widgetType: widgetElement?.type,
      columnId: result.destination?.droppableId,
    };
    if (replaceObj > -1) {
      editor[replaceObj].widgetId = widgetElement?.id;
      editor[replaceObj].widgetType = widgetElement?.type;
      setEditor([...editor]);
    } else {
      let copyArray = [...editor, { ...columnValue }];
      setEditor(copyArray);
    }
  };
  return (
    <Row>
      <Col span={24} className="header">
        <p>Dynamic Forms</p>
      </Col>
      <Col className="inner-container" span={24} style={{ display: "flex" }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Row>
            <Col span={4} className="pad">
              <Col span={24} className="card">
                <Col
                  className="card-title"
                  span={24}
                  style={{ padding: "7px 10px" }}
                >
                  <p>Container</p>
                </Col>
                <Col span={24} className="elements">
                  <Widgets elements={elements} identifier="elements" />
                </Col>
              </Col>
            </Col>
            <Col span={20} className="pad">
              <Row>
                <Col span={24}>
                  <div className="editor">
                    <div className="card">
                      {sectionValues.length > 0 &&
                        sectionValues.map((value) => (
                          <EditorSection
                            identifier="editor"
                            editor={editor}
                            value={value}
                          />
                        ))}
                      <GetRowAndColumnCount
                        setOpen={setOpen}
                        open={open}
                        sectionValues={sectionValues}
                        setSectionValues={setSectionValues}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </DragDropContext>
      </Col>
    </Row>
  );
};

export default Container;
