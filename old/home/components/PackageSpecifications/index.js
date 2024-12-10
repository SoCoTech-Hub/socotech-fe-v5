import React from "react";

const PackageSpecifications = ({ itemData = "Provide data" }) => {
  return (
    <div>
      <div className="flex items-center align-middle">
        <div className="w-2 h-2 mr-3 bg-black rounded-lg"></div>
        <div className="">{itemData}</div>
      </div>
    </div>
  );
};

export default PackageSpecifications;
