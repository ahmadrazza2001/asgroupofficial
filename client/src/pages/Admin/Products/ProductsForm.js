import { Modal, Tabs, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { AddNews, EditNews } from "../../../apicalls/products";
import { SetLoader } from "../../../redux/loadersSlice";
import React, { useEffect } from "react";
import Images from "./Images";

const rules = [
  {
    required: true,
    message: "Field can't be kept empty",
  },
];

function NewsForm({ showNewsForm, setShowNewsForm, selectedNews, getData }) {
  const [selectedTab = "1", setSelectedTab] = React.useState("1");
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      let response = null;
      if (selectedNews) {
        response = await EditNews(selectedNews._id, values);
      } else {
        values.status = "pending";
        response = await AddNews(values);
      }
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowNewsForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const formRef = React.useRef(null);

  useEffect(() => {
    if (selectedNews) {
      formRef.current.setFieldsValue(selectedNews);
    }
  }, [selectedNews]);
  return (
    <Modal
      title=""
      open={showNewsForm}
      onCancel={() => setShowNewsForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
      {...(selectedTab === "2" && { footer: false })}
    >
      <div>
        <h1 className="text-primary text-2xl text-center font-semibold uppercase">
          {selectedNews ? "Edit News" : "Add News"}
        </h1>
        <Tabs
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key) => setSelectedTab(key)}
        >
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="News Title" name="name" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item label="#Tags" name="description" rules={rules}>
                <Input type="text" />
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2" disabled={!selectedNews}>
            <Images
              selectedNews={selectedNews}
              getData={getData}
              setShowNewsForm={setShowNewsForm}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default NewsForm;
