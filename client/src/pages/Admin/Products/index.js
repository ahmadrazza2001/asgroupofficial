import { Button, message, Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DeleteNews, GetNews } from "../../../apicalls/products";
import { SetLoader } from "../../../redux/loadersSlice";
import NewsForm from "./ProductsForm";

function News() {
  const [selectedNews, setSelectedNews] = React.useState(null);
  const [news, setNews] = React.useState([]);
  const [showNewsForm, setShowNewsForm] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetNews({
        seller: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setNews(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const deleteNews = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteNews(id);
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
      title: "Image",
      dataIndex: "image",
      width: 50,
      textWrap: "word-break",
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ""}
            alt="Not availble/removed"
            className="w-20 h-20 object-cover rounded-md"
          />
        );
      },
    },
    {
      title: "News Title",
      dataIndex: "name",
      width: 250,
      textWrap: "word-break",
      render: (text, record) => {
        return <span style={{ fontWeight: "600" }}>{record.name}</span>;
      },
    },

    {
      title: "#Tags",
      dataIndex: "description",
      width: 250,
      textWrap: "word-break",
      render: (text, record) => {
        return (
          <span
            style={{
              opacity: "50%",
            }}
          >
            {record.description}
          </span>
        );
      },
    },

    {
      title: "Posted On",
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
                setSelectedNews(record);
                setShowNewsForm(true);
              }}
            ></i>
            <i
              style={{
                color: "red",
                cursor: "pointer",
              }}
              className="ri-delete-bin-line"
              onClick={() => {
                deleteNews(record._id);
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
            setSelectedNews(null);
            setShowNewsForm(true);
          }}
          className="mb-2 sm:mb-0"
        >
          + News
        </Button>
      </div>
      <div className="overflow-auto">
        <Table columns={columns} dataSource={news} bordered />
      </div>

      {showNewsForm && (
        <NewsForm
          showNewsForm={showNewsForm}
          setShowNewsForm={setShowNewsForm}
          selectedNews={selectedNews}
          getData={getData}
        />
      )}
    </div>
  );
}

export default News;
