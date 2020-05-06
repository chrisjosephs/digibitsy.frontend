import styled from 'styled-components';
import React, {Component} from "react";

class Invaders extends Component {
    constructor(props) {
        super(props)
        this.state = {curtains: false}
    }

    render() {
        const fade = this.state.fade
        return (
            <div className={"SpaceInvader"} style={{position: "absolute", width:"100%", height: "100%"}}>
                <FullScreenInvaders className={fade ? FullscreenShow: ''}>>
                <ButtonSi onClick={() => this.setState({ fade: true })}/>
                <SpaceInvaderCurtain/>
                </FullScreenInvaders>
            </div>
        );
    }
}
const Heading = keyframes`
  0% { top: -3.125em; }
  100% { top: 3em;}
`;
const SpaceInvaderCurtain = styled.div`
  display: inline-block;
  background: pink;
  width: 200px;
  height: 200px;
  transition: transform 300ms ease-in-out;
  &:hover {
    transform: translate(200px, 150px) rotate(20deg)
  }
`
const FullScreenInvaders = styled.div`
    opacity: 1;
    bottom: 0;
    right: 0;
    left: 0;
    background: blue; 
    height: 100%;
    width: 100%;
`

const ButtonSi = styled.div`
    position:absolute;
    z-index:2000;
    height:100px;
    width:200px;
    background:red;
    float:left;
}
`

const FullscreenHide = styled.div`
    -webkit-transition-property: all,
    -moz-transition-property: all;
    -o-transition-property: all;
    -ms-transition-property: all;
    transition-property: all;

    -webkit-transition-duration: 1s;
    -moz-transition-duration: 1s;
    -o-transition-duration: 1s;
    -ms-transition-duration: 1s;
    transition-duration: 1s;

    -webkit-transition-delay: 0s;
    -moz-transition-delay: 0s;
    -o-transition-delay: 0s;
    -ms-transition-delay: 0s;
    transition-delay: 0s;
    position: absolute;
    z-index: 1000;
    height: 100%;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
    opacity: 1;
    top: -100%;
    bottom: 0;
    right: 0;
    left: 0;
    background: #141414;
    `

const FullscreenShow = styled.div`
    -webkit-transition-property: all;
    -moz-transition-property: all;
    -o-transition-property: all;
    -ms-transition-property: all;
    transition-property: all;

    -webkit-transition-duration: 1s;
    -moz-transition-duration: 1s;
    -o-transition-duration: 1s;
    -ms-transition-duration: 1s;
    transition-duration: 1s;

    -webkit-transition-delay: 0s;
    -moz-transition-delay: 0s;
    -o-transition-delay: 0s;
    -ms-transition-delay: 0s;
    transition-delay: 0s;
    position: absolute;
    height: 100%;
    z-index: 1000;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
    filter: alpha(opacity=100);
    opacity: 1;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #141414;
`

export default Invaders
