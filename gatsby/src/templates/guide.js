import React from 'react'
import PropTypes from 'prop-types'
import {  graphql } from 'gatsby'
import styled from 'styled-components'
import MDXRenderer from 'gatsby-mdx/mdx-renderer'

import { Layout, SEO, MXContentMain, MXContentNav, MXInPageTOC } from '../components'

const Title = styled.h1`
`

const PostContent = styled.div`
`

const Page = ({ pageContext: { slug, pages }, data: { mdx: postNode } }) => {
  const post = postNode.frontmatter

  return (
    <Layout hasSideNavigation="true" navmode="develop" customSEO>
        <SEO postPath={slug} postNode={postNode} article />
        <MXContentMain hasSideNavigation="true">
          <div className="mxcontent__main__doc">
            <Title>{post.title}</Title>
            {post.showTableOfContents &&
            <MXInPageTOC tableOfContents={postNode.tableOfContents} />}
            <PostContent>
              <MDXRenderer>{postNode.body}</MDXRenderer>
            </PostContent>
          </div>
        </MXContentMain>
        <MXContentNav title="Guides" content={pages} currentSlug={slug} tableOfContents={postNode.tableOfContents}></MXContentNav>
    </Layout>
  )
}

export default Page

Page.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired
  }),
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
}

Page.defaultProps = {
  pageContext: PropTypes.shape({  }),
}

export const pageQuery = graphql`
  query pageBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        author,
        image
        showTableOfContents
      }
      tableOfContents
      timeToRead
      rawBody
      parent {
        ... on File {
          mtime
          birthtime
        }
      }
    }
  }
`
