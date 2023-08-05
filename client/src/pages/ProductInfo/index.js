import React from "react";
import { useDispatch } from "react-redux";
import { GetAllBids, GetNewsById } from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import { Button, message } from "antd";
import Divider from "../../components/Divider";
import { useParams } from "react-router-dom";
import moment from "moment";
import BidModal from "./BidModal";

function NewsInfo() {
  const [showAddNewBid, setShowAddNewBid] = React.useState(false);
  const [showBids, setShowBids] = React.useState(false);

  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [news, setNews] = React.useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetNewsById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        const bidsResponse = await GetAllBids({ news: id });
        setNews({
          ...response.data,
          bids: bidsResponse.data,
        });
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    news && (
      <div>
        <div className="grid grid-cols-2 gap-5 mt-5">
          {/* images */}
          <div className="flex flex-col gap-5">
            <img
              src={news.images[selectedImageIndex]}
              alt="Image not available"
              className="w-full rounded-md"
              style={{ height: "70vh" }}
            />

            <div className="flex gap-5">
              {news.images.map((image, index) => {
                return (
                  <img
                    className={
                      "w-20 h-20 object-cover rounded-md cursor-pointer " +
                      (selectedImageIndex === index
                        ? "border-2 border-black-700 border-dashed p-2"
                        : "")
                    }
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>
          </div>

          {/* details */}
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="font-bold text-black-900">{news.name}</h3>
              <Divider />
              <div>
                <h5 className="font-bold text-gray-900">Tags</h5>
                <span>{news.description}</span>
              </div>
            </div>

            <Divider />

            <div className="flex justify-between mt-2">
              <span>Posted on</span>

              <span>
                {moment(news.createdAt).format("MMM D , YYYY (hh:mm A)")}
              </span>
            </div>
            <Divider />

            <div className="flex flex-col">
              <div className="flex justify-between mb-5">
                <Button onClick={() => setShowBids(!showBids)}>
                  Show Comments
                </Button>

                <Button onClick={() => setShowAddNewBid(!showAddNewBid)}>
                  Add New Comment
                </Button>
              </div>
            </div>
          </div>
        </div>

        {showAddNewBid && (
          <BidModal
            news={news}
            reloadData={getData}
            showBidModal={showAddNewBid}
            setShowBidModal={setShowAddNewBid}
          />
        )}
        {showBids && (
          <BidModal
            news={news}
            reloadData={getData}
            bidsModal={showBids}
            setBidsModal={setShowBids}
          />
        )}
      </div>
    )
  );
}

export default NewsInfo;
