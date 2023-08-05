import { Button, message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DeleteBusiness, GetBusiness } from "../../../apicalls/business";
import { SetLoader } from "../../../redux/loadersSlice";
import BusinessForm from "./BusinessForm.js";
import "tailwindcss/tailwind.css";

function Business() {
  const [selectedBusiness, setSelectedBusiness] = React.useState(null);
  const [business, setBusiness] = React.useState([]);
  const [showBusinessForm, setShowBusinessForm] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetBusiness({
        seller: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setBusiness(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const deleteBusiness = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteBusiness(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Logo",
      dataIndex: "image",
      width: 50,
      textWrap: "word-break",
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ""}
            alt="Not available/removed"
            className="w-20 h-20 object-cover rounded-md"
          />
        );
      },
    },
    {
      title: "Business Name",
      dataIndex: "name",
      width: 150,
      textWrap: "word-break",
      render: (text, record) => {
        return <span style={{ fontWeight: "600" }}>{record.name}</span>;
      },
    },

    {
      title: "Description",
      dataIndex: "description",
      width: 250,
      textWrap: "word-break",
      render: (text, record) => {
        return <span>{record.description}</span>;
      },
    },

    {
      title: "Business Points",
      dataIndex: "points",
      width: 50,
      textWrap: "word-break",
      render: (text, record) => {
        return (
          <span style={{ color: "#D4D4D4" }}>will be available soon..</span>
        );
      },
    },

    {
      title: "Added On",
      dataIndex: "createdAt",
      width: 150,
      textWrap: "word-break",
      render: (text, record) => {
        return (
          <span style={{ color: "grey" }}>
            {moment(record.createdAt).format("DD/MM/YYYY (hh:mm A)")}
          </span>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      width: 50,
      textWrap: "word-break",
      render: (text, record) => {
        return (
          <div className="flex gap-5 items-center">
            <i
              style={{
                color: "orange",
                cursor: "pointer",
              }}
              className="ri-pencil-line"
              onClick={() => {
                setSelectedBusiness(record);
                setShowBusinessForm(true);
              }}
            ></i>
            <i
              style={{
                color: "red",
                cursor: "pointer",
              }}
              className="ri-delete-bin-line"
              onClick={() => {
                deleteBusiness(record._id);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full px-2 sm:px-0">
      <div className="flex flex-col-reverse sm:flex-row justify-between mb-2">
        <Button
          type="default"
          onClick={() => {
            setSelectedBusiness(null);
            setShowBusinessForm(true);
          }}
          className="mb-2 sm:mb-0"
        >
          + Business
        </Button>
      </div>
      <div className="overflow-auto">
        <Table columns={columns} dataSource={business} bordered />
      </div>
      {showBusinessForm && (
        <BusinessForm
          showBusinessForm={showBusinessForm}
          setShowBusinessForm={setShowBusinessForm}
          selectedBusiness={selectedBusiness}
          getData={getData}
        />
      )}
    </div>
  );
}

export default Business;
