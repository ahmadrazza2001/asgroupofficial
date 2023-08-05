import { Form, Input, Modal, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddNotification } from "../../apicalls/notifications";
import { PlaceNewBid } from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import moment from "moment";

function BidModal({
  showBidModal,
  setShowBidModal,
  bidsModal,
  setBidsModal,
  news,
  reloadData,
}) {
  const { user } = useSelector((state) => state.users);
  const formRef = React.useRef(null);
  const rules = [{ required: true, message: "Required" }];
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await PlaceNewBid({
        ...values,
        news: news._id,
        seller: news.seller._id,
        buyer: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        message.success("Comment added successfully");

        // send notification to seller
        await AddNotification({
          title: "A new comment has been added",
          message: `Hey there! A new comment has been placed on your post by ${user.name}`,
          user: news.seller._id,
          onClick: `/profile`,
          read: false,
        });
        reloadData();
        setShowBidModal(false);
        setBidsModal(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoader(false));
    }
  };
  return (
    <div>
      <Modal
        onCancel={() => setShowBidModal(false)}
        open={showBidModal}
        centered
        width={600}
        onOk={() => formRef.current.submit()}
      >
        <div className="flex flex-col gap-5 mb-5">
          <h1 className="text-2xl font-semibold text-orange-900 text-center">
            New Comment
          </h1>

          <Form layout="vertical" ref={formRef} onFinish={onFinish}>
            <Form.Item label="Type a Message" name="message" rules={rules}>
              <Input.TextArea />
            </Form.Item>
          </Form>
        </div>
      </Modal>

      <Modal
        onCancel={() => setBidsModal(false)}
        open={bidsModal}
        centered
        width={1000}
        style={{ marginTop: "50px" }}
        onOk={() => setBidsModal(false)}
      >
        <div className="flex flex-col gap-2 mb-5" data-bs-spy="scroll">
          <h4 className="text-2xl font-semibold text-black-900 text-center">
            Comments on this post
          </h4>
          <div>
            {news.showBidsOnNewsPage &&
              news.bids.map((bid) => {
                return (
                  <div className="border border-gray-300 border-solid p-3 rounded mt-5">
                    <div className="flex justify-between text-gray-700">
                      <span>
                        <b>{bid.buyer.name} commented</b>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>{bid.message}</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>
                        {" "}
                        {moment(bid.createdAt).format("MMM D , YYYY hh:mm A")}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BidModal;
