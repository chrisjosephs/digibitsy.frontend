/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import BigBangStarField from 'react-big-bang-star-field'
import PropTypes from "prop-types"
import {useStaticQuery, graphql} from "gatsby"
import Header from "../components/header"
import tw from 'tailwind.macro'
import styled from '@emotion/styled'
import Invaders from '../components/invaders'
import "./layout.css"
import '../css/global.css'
import {StaticQuery} from "../../.cache/gatsby-browser-entry";
import Transition from '../components/transition'
import Rocket from "../components/rocket";

const Layout = ({ children, location }) => (
    <StaticQuery
        query={graphql`query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }`}
        render={data => (
            <>
                <Header siteTitle={data.site.siteMetadata.title}/>
                <div
                    style={{
                        'overflowX': 'hidden',
                        'padding': '0px; margin: 0px',
                        'width': '100%',
                        'height': '100%'
                    }}>
                    <BigBangStarField
                        className="Big-Bang-Star-Field"
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            zIndex: '-10'
                        }}
                    />
                    <div
                        style={{
                            margin: `0 auto`,
                            maxWidth: 960,
                            padding: `0 1.0875rem 1.45rem`,
                        }}
                    >
                        <Invaders/>
                        <Rocket/>
                    <Transition location = {location}>
                            <main>{children}</main>
                    </Transition>
                    </div>
                    <footer>
                        © {new Date().getFullYear()}, Built with
                        {` `}
                        <a href="https://www.gatsbyjs.org">Gatsby</a>, Threejs (where opengl supported), Drupal 8,
                        graphQL, Tailwind css
                    </footer>
                </div>
            </>
        )}
    />
)
Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
