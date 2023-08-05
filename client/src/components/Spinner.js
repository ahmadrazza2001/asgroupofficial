import React from "react";

function Spinner() {
  return (
    <div
      style={{
        background: "indigo",
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center opacity-100"
    >
      <div className="w-15 h-15 border-2 border-t-transparent rounded-full text-white">
        <img
          style={{ width: "65px" }}
          src="https://res.cloudinary.com/sbcunueh/image/upload/v1690485937/logo1_d6qizj.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Spinner;
