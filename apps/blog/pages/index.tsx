import React from "react";

import Blog from "../../../packages/ui/src/Blog";
//TODO: add functions and fetches
const IndexPage: React.FC = () => {
  return (
    <div>
      <main className="container mx-auto px-4 py-8">
        <Blog />
      </main>
    </div>
  );
};

export default IndexPage;