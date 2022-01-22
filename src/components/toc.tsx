import React, { VFC } from "react";
import styled from "styled-components"

interface Props {
  toc: string;
}

const Wrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px;

  p {
    margin-bottom: 0;
  }

  ul {
    margin: 0;
  }
`

export const Toc: VFC<Props> = ({ toc }) => {
  return (
    <Wrapper>
      <p>目次</p>
      <div
        dangerouslySetInnerHTML={{
          __html: toc,
        }}
      />
    </Wrapper>
  );
};
