import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetBusiness } from "../../apicalls/business";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import Divider from "../../components/Divider";
import moment from "moment";
import "./business.css";

function Business() {
  const [business, setBusiness] = React.useState([]);

  const dispatch = useDispatch();
  //const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetBusiness();
      dispatch(SetLoader(false));
      if (response.success) {
        setBusiness(
          response.data.sort(
            (a, b) => moment(b.createdAt) - moment(a.createdAt)
          )
        );
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="col-12 d-flex flex-col justify-content-center px-4 md:px-0">
        <div className="text-center mt-5">
          <h1
            className="pt-5"
            style={{
              marginTop: "30px",
              color: "indigo",
              fontWeight: "600",
            }}
          >
            Our Businesses
          </h1>
        </div>
        <div className="flex flex-col gap-5 mt-5 ">
          {business?.map((business) => {
            return (
              <div className="col d-flex justify-content-center">
                <div
                  className="card mb-3 col-md-8"
                  style={{
                    borderRadius: "10px",
                    padding: "20px",
                    boxShadow:
                      "0 2px 8px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.10)",
                    border: "none",
                  }}
                >
                  <div className="row g-0">
                    <div
                      className="col-md-4 md:flex md:items-center"
                      key={business._id}
                    >
                      <img
                        style={{ maxWidth: "150px", borderRadius: "10px" }}
                        src={business.images[0]}
                        className="img-fluid mx-auto d-block"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body text-center md:text-left">
                        <h5 className="card-title">
                          <b
                            style={{
                              fontSize: "20px",
                            }}
                          >
                            {business.name}
                          </b>{" "}
                        </h5>
                        <p className="card-text text-left">
                          {business.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <footer className="bottom-0 w-full text-center py-10 text-black">
        © {new Date().getFullYear()} AS Group Official
      </footer>
    </>
  );
}

export default Business;
