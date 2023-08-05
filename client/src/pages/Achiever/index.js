import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetAchievers } from "../../apicalls/achiever";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import Divider from "../../components/Divider";
import moment from "moment";
import { BiSolidMedal } from "react-icons/bi";

function Achievers() {
  //{product.age === 1 ? " year" : " years"} {' '}
  //const [showFilters, setShowFilters] = React.useState(true);
  const [achievers, setAchievers] = React.useState([]);

  const dispatch = useDispatch();
  //const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAchievers();
      dispatch(SetLoader(false));
      if (response.success) {
        setAchievers(
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
      <div className="col-12 d-flex flex-col justify-content-center p-5">
        <div className="text-center">
          <h1
            className="pt-5"
            style={{
              marginTop: "30px",
              color: "indigo",
              fontWeight: "600",
            }}
          >
            Achievers
          </h1>
        </div>
        <div className="row justify-content-center">
          <div
            className=" flex flex-col col-md-8 md:flex-row flex-wrap justify-center gap-5 "
            style={{ marginTop: "50px", maxWidth: "100%" }}
          >
            {achievers?.map((achievers) => {
              return (
                <div
                  className="card cursor-pointer shadow-lg"
                  style={{
                    maxWidth: "100%",
                    marginBottom: "15px",
                    border: "none",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                  key={achievers._id}
                >
                  <img
                    src={achievers.images[0]}
                    className="card-img-top shadow-lg"
                    alt="Not available/removed"
                    style={{
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",

                      objectFit: "fill",
                      maxHeight: "20rem",
                      width: "100%",
                    }}
                  />
                  <div className="card-body">
                    <h4 className="card-title text-center ">
                      {achievers.name}
                    </h4>
                    <div className="flex justify-content-center">
                      <p
                        className="card-text text-center"
                        style={{
                          background: "indigo",
                          color: "white",
                          borderRadius: "5px",
                          padding: "2px 10px",
                        }}
                      >
                        <BiSolidMedal
                          style={{
                            fontSize: "15px",
                          }}
                        />
                        {achievers.description}
                      </p>
                    </div>
                    <p className="text-center mt-2 opacity-70">
                      {achievers.season} - {achievers.year}
                    </p>

                    <Divider />

                    <p className="card-text text-sm text-center">
                      <span style={{ color: "grey", fontStyle: "italic" }}>
                        {" "}
                        Posted on:
                        {moment(achievers.createdAt).format(
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

        <div>
          <p className="text-center pt-5 opacity-50">
            Go up for latest Achievers
          </p>
        </div>
      </div>
    </>
  );
}

export default Achievers;
