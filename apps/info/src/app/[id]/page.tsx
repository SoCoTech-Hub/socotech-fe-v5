"use client";

import React, { useState } from "react";

import { Button } from "@acme/ui/button";

const Info = () => {
  const [data, setData] = useState({ title: "", content: "" });
  //TODO: Get info page (terms of use, payment policy etc) and display here
  return (
    <div className="flex">
      <div className="flex flex-row">
        <h2>{data.title}</h2>
        <Button />
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
};

export default Info;