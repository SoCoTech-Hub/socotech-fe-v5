import React from "react";
import Link from "next/link";

import { Button } from "@acme/ui/button";

interface AssignmentHomeProps {
  module: Array<{
    id: string;
    title: string;
  }> | null;
  lessonId: string | null;
  response: Array<{
    id: string;
    assignment: {
      id: string;
    };
  }> | null;
}

const AssignmentHome: React.FC<AssignmentHomeProps> = ({
  module,
  lessonId,
  response,
}) => {
  return (
    <>
      {module ? (
        <>
          <div className="bg-compBg mobile:p-1.5 laptop:p-2 desktop:p-3 mobile:gap-1 laptop:gap-3 desktop:gap-4 mobile:grid-cols-2 laptop:grid-cols-4 desktop:grid-cols-4 grid rounded-lg">
            {module.map((item, r) => (
              <div key={r}>
                <Link href={`/${lessonId}/assignment/${item.id}`}>
                  <Button className="bg-primary">{item?.title}</Button>
                </Link>
                <div>
                  {response?.map((x) =>
                    x.assignment.id === item.id ? (
                      <Link href={`/${lessonId}/assignment/${item.id}/marks`}>
                        <Button
                          key={x.id}
                          className="bg-secondary"
                        >{`${item?.title} marks`}</Button>
                      </Link>
                    ) : null,
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div>Assignment Not Found</div>
          </div>
        </>
      )}
    </>
  );
};

export default AssignmentHome;
