import { Modal, Tabs, Form, Input, message } from "antd";
import { Select } from "antd";

import { useDispatch } from "react-redux";
import { AddAchievers, EditAchievers } from "../../../apicalls/achiever";
import { SetLoader } from "../../../redux/loadersSlice";
import React, { useEffect } from "react";
import Images from "./Images";

const rules = [
  {
    required: true,
    message: "Field can't be kept empty",
  },
];

function AchieversForm({
  showAchieversForm,
  setShowAchieversForm,
  selectedAchievers,
  getData,
}) {
  const [selectedTab = "1", setSelectedTab] = React.useState("1");
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      let response = null;
      if (selectedAchievers) {
        response = await EditAchievers(selectedAchievers._id, values);
      } else {
        values.status = "pending";
        response = await AddAchievers(values);
      }
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowAchieversForm(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const formRef = React.useRef(null);
  const { Option } = Select;

  useEffect(() => {
    if (selectedAchievers) {
      formRef.current.setFieldsValue(selectedAchievers);
    }
  }, [selectedAchievers]);
  return (
    <Modal
      title=""
      open={showAchieversForm}
      onCancel={() => setShowAchieversForm(false)}
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
          {selectedAchievers ? "Edit Achiever" : "Add New Achiever"}
        </h1>
        <Tabs
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key) => setSelectedTab(key)}
        >
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Achiever Name" name="name" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Achieved" name="description" rules={rules}>
                <Select placeholder="Select an option">
                  <Option value="Bike">Bike</Option>
                  <Option value="Car">Car</Option>
                  <Option value="Umrah Package">Umrah Package</Option>
                  <Option value="Tour">Tour</Option>
                  <Option value="Mobile">Mobile</Option>
                  <Option value="Headphones">Headphones</Option>
                  <Option value="Dinner">Dinner</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Season" name="season" rules={rules}>
                <Select placeholder="Select an option">
                  <Option value="Spring">Spring</Option>
                  <Option value="Summer">Summer</Option>
                  <Option value="Winter">Winter</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Year" name="year" rules={rules}>
                <Select placeholder="Select an option">
                  <Option value="2018">2018</Option>
                  <Option value="2019">2019</Option>
                  <Option value="2020">2020</Option>
                  <Option value="2021">2021</Option>
                  <Option value="2022">2022</Option>
                  <Option value="2023">2023</Option>
                  <Option value="2024">2024</Option>
                  <Option value="2025">2025</Option>
                  <Option value="2026">2026</Option>
                  <Option value="2027">2027</Option>
                  <Option value="2028">2028</Option>
                  <Option value="2029">2029</Option>
                  <Option value="2030">2030</Option>
                </Select>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2" disabled={!selectedAchievers}>
            <Images
              selectedAchievers={selectedAchievers}
              getData={getData}
              setShowAchieversForm={setShowAchieversForm}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default AchieversForm;
