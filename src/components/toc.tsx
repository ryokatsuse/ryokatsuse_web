import React, { VFC } from "react";

interface Props {
  toc: string;
}

export const Toc: VFC<Props> = ({ toc }) => {
  return (
    <div className="border border-solid border-gray-500 p-1">
      <div className="mb-1">目次</div>
      <div
        dangerouslySetInnerHTML={{
          __html: toc,
        }}
      />
    </div>
  );
};
