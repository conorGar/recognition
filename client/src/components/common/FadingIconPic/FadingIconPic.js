import React from 'react'


import MarioIcon from '../../../assets/mario_icon.png'
import BeetleSteveIcon from '../../../assets/icon_beetleSteve.png'
import SunIcon from '../../../assets/icon_sun.png'

import NetflixIcon from '../../../assets/icon_netflix.png';
import "./FadingIconPic.css"

function FadingIconPic(){

    return(
        <div className="fading-icon-container">
            <img className="header-img" id="header-img1" src={MarioIcon}/>
            <img className="header-img" id="header-img2" src={SunIcon}/>
            <img className="header-img" id="header-img3" src={BeetleSteveIcon}/>
            <img className="header-img" id="header-img4" src={NetflixIcon}/>



        </div>
    )
}

export default FadingIconPic;