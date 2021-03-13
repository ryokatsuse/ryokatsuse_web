import React from 'react';
import styled from "styled-components"
import { ShareButtons } from "../components/share";

type Props = {
  className?: string
  content: string;
  frontmatter: {
    title: string
    date: string
  }
};

const FCPostBody: React.FC<Props> = ({ content, className, frontmatter }) => {
  const url = typeof window !== 'undefined' ? window.location.href : ''
  return (
    <article className={`${className}`}>
      <header>
        <h1 className={`${className}__title`}>
          {frontmatter.title}
        </h1>
        <div className={`${className}__item`}>
          <div className={`${className}__date`}>
            {frontmatter.date}
          </div>
          {/* <small>
            {post.frontmatter.tags ? (
              <div>
                <Tags tags={post.frontmatter.tags} />
              </div>
            ) : null}
          </small> */}
        </div>
      </header>
      <section
        className={`${className}__section`}
        dangerouslySetInnerHTML={{ __html: content }} />
      <hr/>
      <ShareButtons text={frontmatter.title} url={url} />
    </article>
  );
};

export const PostBody = styled(FCPostBody)`

  p {
    margin-bottom: 1.75rem;
  }

  .gatsby-resp-image-wrapper {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  &__title {
    margin: 0 0 1.5rem 0;
  }

  &__item {
    display: flex;
    flex-flow: row wrap;
    -webkit-box-align: center;
    align-items: center;
  }

  & h2,
  & h3,
  & h4 {
    margin: 1.5rem 0;
  }

  & h2 {
    font-size: 1.8rem;
  }

  & h3 {
    font-size: 1.4rem;
  }

  & h4 {
    font-size: 1.4rem;
  }

  &__section {
    margin: 1rem 0;
  }

  pre[class*="language-"] {
    padding: 12px;
  }

`