import React from "react";

import { Button } from "../../../../packages/ui/src/button";

//TODO:fix button
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
                <Button
                  color="bg-themeColorMain"
                  link={`/${lessonId}/assignment/${item.id}`}
                  label={item?.title}
                />
                <div>
                  {response?.map((x) =>
                    x.assignment.id === item.id ? (
                      <Button
                        key={x.id}
                        color="bg-themeColorSecondary"
                        label={`${item?.title} marks`}
                        link={`/${lessonId}/assignment/${item.id}/marks`}
                      />
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
