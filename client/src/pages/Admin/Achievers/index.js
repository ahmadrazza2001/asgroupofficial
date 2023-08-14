import { Button, message, Table } from "antd";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DeleteAchievers, GetAchievers } from "../../../apicalls/achiever";
import { SetLoader } from "../../../redux/loadersSlice";
import AchieversForm from "./AchieversForm";
import "tailwindcss/tailwind.css";

function Achievers() {
  const [selectedAchievers, setSelectedAchievers] = React.useState(null);
  const [achievers, setAchievers] = React.useState([]);
  const [showAchieversForm, setShowAchieversForm] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAchievers({
        seller: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setAchievers(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }, [dispatch, user._id]);

  const deleteAchievers = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteAchievers(id);
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
  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      title: "Photo",
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
      title: "Achiever Name",
      dataIndex: "name",
      width: 250,
      textWrap: "word-break",
      render: (text, record) => {
        return <span style={{ fontWeight: "600" }}>{record.name}</span>;
      },
    },

    {
      title: "Achieved",
      dataIndex: "description",
      width: 250,
      textWrap: "word-break",
      render: (text, record) => {
        return <span>{record.description}</span>;
      },
    },
    {
      title: "Season",
      dataIndex: "season",
      width: 150,
      textWrap: "word-break",
      render: (text, record) => {
        return <span>{record.season}</span>;
      },
    },

    {
      title: "Year",
      dataIndex: "year",
      width: 150,
      textWrap: "word-break",
      render: (text, record) => {
        return <span>{record.year}</span>;
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
                setSelectedAchievers(record);
                setShowAchieversForm(true);
              }}
            ></i>
            <i
              style={{
                color: "red",
                cursor: "pointer",
              }}
              className="ri-delete-bin-line"
              onClick={() => {
                deleteAchievers(record._id);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full px-2 sm:px-0">
      <div className="flex flex-col-reverse sm:flex-row justify-between mb-2">
        <Button
          type="default"
          onClick={() => {
            setSelectedAchievers(null);
            setShowAchieversForm(true);
          }}
          className="mb-2 sm:mb-0"
        >
          + Achiever
        </Button>
      </div>
      <div className="overflow-auto">
        <Table columns={columns} dataSource={achievers} bordered />
      </div>
      {showAchieversForm && (
        <AchieversForm
          showAchieversForm={showAchieversForm}
          setShowAchieversForm={setShowAchieversForm}
          selectedAchievers={selectedAchievers}
          getData={getData}
        />
      )}
    </div>
  );
}

export default Achievers;
