import React, { VFC } from "react";
import styled from "styled-components"

interface Props {
  toc: string;
}

const Wrapper = styled.div`
  border: 1px solid #ccc;
  padding: 10px;

  ul {
    margin: 0;
  }
`

const Title = styled.div`
  margin-bottom: 0;
`

export const Toc: VFC<Props> = ({ toc }) => {
  return (
    <Wrapper>
      <Title>目次</Title>
      <div
        dangerouslySetInnerHTML={{
          __html: toc,
        }}
      />
    </Wrapper>
  );
};
