/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import StarFieldCanvas from "./starfieldcanvas";
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import "./layout.css"
import '../css/global.css'

const PageContainer = styled.div`
    ${tw`
        bg-transparent text-xl text-center
    `}
    padding: 0px;
`;


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
    style={{
        'overflow-x': 'hidden',
        'background-image': 'url("https://lukasz-zembrzuski.pl/wp-content/uploads/2018/03/nebula-starfield.jpg")',
        'padding': '0px; margin: 0px',
        'width': '100%',
        'height': '100%'
    }}>
        <StarFieldCanvas>STARFIELD CANVAS</StarFieldCanvas>
      <Header siteTitle={data.site.siteMetadata.title} />
        <PageContainer>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
        </PageContainer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
