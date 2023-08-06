import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { GetNews } from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import moment from "moment";
import "../../index.css";

function News() {
  const [news, setNews] = React.useState([]);

  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetNews();
      dispatch(SetLoader(false));
      if (response.success) {
        setNews(
          response.data.sort(
            (a, b) => moment(b.createdAt) - moment(a.createdAt)
          )
        );
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className="col-12 d-flex flex-col justify-content-center p-5">
        <div className="text-center mt-5">
          <h1
            style={{
              marginTop: "30px",
              color: "indigo",
              fontWeight: "600",
            }}
          >
            News Feed
          </h1>
        </div>
        <div className="col d-flex justify-content-center">
          <div
            className=" flex flex-col col-md-8 md:flex-row flex-wrap justify-center gap-5 mt-12 "
            style={{ marginTop: "50px" }}
          >
            <div className="justify-content-center ">
              {news?.map((news) => {
                return (
                  <div
                    className="card-box cursor-pointer shadow-lg"
                    style={{
                      width: "50rem",
                      marginBottom: "25px",
                      border: "none",
                      borderRadius: "15px",
                    }}
                    key={news._id}
                  >
                    <img
                      src={news.images[0]}
                      className="card-img-top"
                      alt="Not available/removed"
                      style={{
                        objectFit: "fill",
                        maxHeight: "auto",
                        width: "100%",
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title ">{news.name}</h5>
                      <div>
                        <p
                          style={{
                            color: "indigo",
                            opacity: "60%",
                          }}
                        >
                          {news.description}
                        </p>
                      </div>

                      <p className="card-text text-sm">
                        <span style={{ color: "grey", fontStyle: "italic" }}>
                          {" "}
                          Posted on:
                          {moment(news.createdAt).format(
                            " MMM D , YYYY (hh:mm A)"
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <p className="text-center pt-5 opacity-50">Go up for latest news</p>
        </div>
      </div>
    </>
  );
}

export default News;
