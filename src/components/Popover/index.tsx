import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Popover } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import "./style.css";
type PropoverProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSectionValues: Dispatch<SetStateAction<any>>;
  open: boolean;
  sectionValues: any;
};
const GetRowAndColumnCount = ({
  setOpen,
  open,
  setSectionValues,
  sectionValues,
}: PropoverProps) => {
  const [initialValue, setInitialValue] = useState(0);
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  const onFinish = (values: { row: number; column: number }) => {
    const obj = { section: sectionValues.length + 1, ...values };
    console.log(obj);
    setOpen(false);
    setSectionValues([...sectionValues, obj]);
    // setFieldsValue({ row: "", column: "" });
    
    setInitialValue(0);
    setOpen(false);
  };
  const content = (
    <div>
      <Form
        name="create-section"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Row"
          name="row"
          rules={[{ required: true, message: "Please enter row count!" }]}
          initialValue={initialValue}
        >
          <InputNumber min={1} defaultValue={initialValue} />
        </Form.Item>

        <Form.Item
          label="Column"
          name="column"
          rules={[{ required: true, message: "Please enter column count!" }]}
          initialValue={initialValue}
        >
          <InputNumber min={1} max={4} defaultValue={initialValue} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
  return (
    <div>
      <Popover
        content={content}
        title="Title"
        trigger="click"
        placement="rightTop"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button type="primary" icon={<PlusOutlined />}>
          Add Section
        </Button>
      </Popover>
    </div>
  );
};

export default GetRowAndColumnCount;
