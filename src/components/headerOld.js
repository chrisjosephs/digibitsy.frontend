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
                <div className="flex">
                    {/*
                    <div className={"md:w-1/3"}>
                    <CloudBase className = "CloudBase">
                        <CloudTitle>
                            Bitsydigi
                        </CloudTitle>
                        <CloudRounds className = "CloudRounds"/>
                    </CloudBase>
                    </div>

                    <div className={"md:w-1/3"}>
                        <CloudBase2 className = "CloudBase">
                        <CloudTitle2>
                            the works of Chris Josephs esq
                        </CloudTitle2>
                        <CloudRounds className = "CloudRounds"/>
                    </CloudBase2>
                    </div>
                    */}
                </div>
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
const cloudFloat = keyframes`
0%   {
        transform: rotate(-25deg);
    }
    100% {
        transform: rotate(-20deg);
    }
    
`

const CloudBase = styled.div`
background: #d4d4d4;
opacity: 0.8;
height: 100px;
width: 600px;
border-radius: 50px; /* half of height will do */
position: relative;
top: 120px;
box-shadow: 4px 20px 20px 0px rgba(0, 0, 0, 0.4);
-webkit-transition: 0.2s ease-in all;
-moz-transition: 0.2s ease-in all;
transition: 0.2s ease-in all;
transform: rotate(-22.5deg);
animation: ${cloudFloat} 2.5s linear infinite alternate;
background: linear-gradient(#f2f9ff 65%,#b6ccd8 100%);
`
const CloudBase2 = styled.div`
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
transform: rotate(22.5deg);
animation: 2.5s linear infinite alternate;
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
background: linear-gradient(#f2f9ff 65%,#b6ccd8 100%);
&&:before, &&:after{
content: '';
position: absolute;
background: #f2f9ff;
}
&&:after{
height: 100px;
width: 200px;
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
const CloudTitle2 = styled.div`
top: 40px;
position: relative;
left: 30px;
z-index: 20;
font-size: 3rem;
`
