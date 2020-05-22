import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, {Component} from "react"
import styled from "@emotion/styled"
import {css, keyframes} from "@emotion/core"

class Header extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <>
                <h2>Final Product</h2>
                <div className="main">
                    <CloudBase className = "CloudBase">
                        <CloudTitle>
                            Digibitsy
                        </CloudTitle>
                        <CloudRounds className = "CloudRounds"/>
                    </CloudBase>
                </div>
            </>
        )
    }
}
export default Header
/*
const Header = ({ siteTitle }) => (
    <>
        <CloudTitle></CloudTitle>
  <header
      className='m-1'
    style={{
      background: `rebeccapurple`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
        </>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

*/
const CloudBase = styled.div`
background: #d4d4d4;
opacity: 0.8;
height: 100px;
width: 300px;
border-radius: 50px; /* half of height will do */
position: relative;
top: 120px;
box-shadow:
inset 5px -9px 5px rgba(225, 245, 253, 0.5), 0px 0px 10px 6px rgba(240, 240, 240, 0.7);
-webkit-transition: 0.2s ease-in all;
-moz-transition: 0.2s ease-in all;
transition: 0.2s ease-in all;
&:hover {
 left: 55%;
}
transform: rotate(-22.5deg);
animation: ${cloudFloat} 1.5s linear infinite;
`
const cloudFloat = keyframes`
0%   {
        transform: rotate(-25deg);
    }
    100% {
        transform: rotate(-20deg);
    }
    
`

const CloudRounds = styled.span`
width: 66%;
border-radius: 50%; /* circle */
position: absolute;
bottom: -30px;
-webkit-box-shadow: 0 0 25px 8px rgba(0, 0, 0, 0.2);
-moz-box-shadow: 0 0 25px 8px rgba(0, 0, 0, 0.2);
box-shadow: 0 0 25px 8px rgba(0, 0, 0, 0.2);
-webkit-transition: 0.2s ease-in all;
-moz-transition: 0.2s ease-in all;
transition: 0.2s ease-in all;
&:hover {
 left: 55%;
}
&&:before, &&:after{
content: '';
position: absolute;
background: #d4d4d4;
}
&&:after{
height: 100px;
width: 100px;
border-radius: 50%; /* circle */
top: -180px;
left: 170px;
box-shadow:
inset 3px 2px 2px rgba(230, 230, 230, 0.5),
      0px -10px 15px rgba(255, 255, 255, 0.4);
}
&&:before {
height: 180px;
width: 180px;
border-radius: 50%; /* circle */
top: -220px;
left: 30px;
box-shadow:
inset 2px 4px 2px rgba(230, 230, 230, 0.5),
  0px -10px 15px rgba(255, 255, 255, 0.4);
}
`
const CloudTitle = styled.div`
top: 40px;
position: relative;
left: 30px;
z-index: 20;
font-size: 3rem;
`
