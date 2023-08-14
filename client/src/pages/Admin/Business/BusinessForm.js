import { Modal, Tabs, Form, Input, message } from "antd";

import { useDispatch } from "react-redux";
import { AddBusiness, EditBusiness } from "../../../apicalls/business";
import { SetLoader } from "../../../redux/loadersSlice";
import React, { useEffect } from "react";
import Images from "./Images";
import "react-quill/dist/quill.snow.css";

const rules = [
  {
    required: true,
    message: "Field can't be kept empty",
  },
];

function BusinessForm({
  showBusinessForm,
  setShowBusinessForm,
  selectedBusiness,
  getData,
}) {
  const [selectedTab = "1", setSelectedTab] = React.useState("1");
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      let response = null;
      if (selectedBusiness) {
        response = await EditBusiness(selectedBusiness._id, values);
      } else {
        values.status = "pending";
        response = await AddBusiness(values);
      }
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowBusinessForm(false);
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
    if (selectedBusiness) {
      formRef.current.setFieldsValue(selectedBusiness);
    }
  }, [selectedBusiness]);
  return (
    <Modal
      title=""
      open={showBusinessForm}
      onCancel={() => setShowBusinessForm(false)}
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
          {selectedBusiness ? "Edit Business" : "Add New Business"}
        </h1>
        <Tabs
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key) => setSelectedTab(key)}
        >
          <Tabs.TabPane tab="Business Details" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Business Name" name="name" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <Input.TextArea autoSize={{ minRows: 4, maxRows: 8 }} />
              </Form.Item>
              <Form.Item label="Business Point 1 (optional)" name="point1">
                <Input
                  type="text"
                  placeholder="Enter each point on a new line"
                />
              </Form.Item>
              <Form.Item label="Business Point 2 (optional)" name="point2">
                <Input
                  type="text"
                  placeholder="Enter each point on a new line"
                />
              </Form.Item>
              <Form.Item label="Business Point 3 (optional)" name="point3">
                <Input
                  type="text"
                  placeholder="Enter each point on a new line"
                />
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Upload Logo " key="2" disabled={!selectedBusiness}>
            <Images
              selectedBusiness={selectedBusiness}
              getData={getData}
              setShowBusinessForm={setShowBusinessForm}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default BusinessForm;
