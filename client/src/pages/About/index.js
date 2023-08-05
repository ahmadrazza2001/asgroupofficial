import React from "react";
import "./about.css";
import {
  BiSolidShield,
  BiLogoBitcoin,
  BiSolidShare,
  BiMoneyWithdraw,
  BiSupport,
} from "react-icons/bi";

const about = () => {
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
            About Us
          </h1>
        </div>
        <div className="flex flex-col gap-5 mt-5 ">
          {[
            {
              name: "Ahsan Yar Babar",
              role: "C.E.0",
              image:
                "https://res.cloudinary.com/sbcunueh/image/upload/v1690630718/hand2hand/ozf8xvvrp5khshbid2g7.png",
              text:
                "AS Group of Companies focuses not only on profits but focuses more on their client's trust and satisfaction. We can proudly claim that AS group of companies not only benefits it's clients but also operates under islamic rules. Therefore, surety and satisfaction is incrementing our loyal customers daily.",
            },
            {
              name: "Samad Yar Babar",
              role: "President",
              image:
                "https://res.cloudinary.com/sbcunueh/image/upload/v1690734968/hand2hand/uz2wsf2zgizu4wojzi6y.jpg",
              text:
                "At AS Group of Companies, client's trust is our top priority. Every large scale buisness starts with small investments. We at AS group of companies make sure that every investment of our client bear rich fruit. Our vision is to regulate the money, and make more money.",
            },
            {
              name: "Bilal Khan",
              role: "Managing Director",
              image:
                "https://res.cloudinary.com/sbcunueh/image/upload/v1690639291/hand2hand/seyd0ebjpwctbyy8nyul.jpg",
              text:
                "AS Group of Companies is like a train which is flowing at great speed towards it's destination. From the last 4 years, this company is giving the best profit on investments and providing many other oportunities to it's users.",
            },
          ].map((person, index) => (
            <div className="col d-flex justify-content-center" key={index}>
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
                  <div className="col-md-4 md:flex md:items-center">
                    <img
                      style={{ maxWidth: "150px", borderRadius: "10px" }}
                      src={person.image}
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
                          {person.name}
                        </b>{" "}
                        ({person.role})
                      </h5>
                      <p className="card-text text-left">{person.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col d-flex justify-content-center ">
            <div
              className="card mb-3 col-md-8"
              style={{
                borderRadius: "10px",
                border: "none",
                boxShadow:
                  "0 2px 8px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.10)",
              }}
            >
              <div className="row g-0">
                <div className="flex col-md-12">
                  <div className="card-body justify-center items-center">
                    <h5 className="card-title text-center">
                      <b
                        style={{
                          fontSize: "30px",
                        }}
                      >
                        Our Vision
                      </b>{" "}
                    </h5>
                    <p className="card-text">
                      "At AS Group of Companies, client's trust is our top
                      priority. Every large scale buisness starts with small
                      investments. We at AS group of companies make sure that
                      every investment of our client bear rich fruit. Our vision
                      is to regulate the money, and make more money."
                    </p>
                    <h5 className="card-title  mt-4">
                      <b
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        Key Features:
                      </b>
                    </h5>
                    <p>
                      <ul
                        style={{
                          listStyle: "none",
                        }}
                      >
                        <li>
                          <BiSolidShield
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          100% guaranteed safety & protection of your finance.
                        </li>
                        <li>
                          <BiLogoBitcoin
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          Earn as much as you want.
                        </li>
                        <li>
                          <BiSolidShare
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          Referral program.
                        </li>
                        <li>
                          <BiMoneyWithdraw
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          Profit share.
                        </li>
                        <li>
                          <BiSupport
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          24/7 support.
                        </li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bottom-0 w-full text-center py-10 text-black">
        © {new Date().getFullYear()} AS Group Official
      </footer>
    </>
  );
};

export default about;
