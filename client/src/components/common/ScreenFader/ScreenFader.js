import React from 'react'

import './ScreenFader.css'



//This whole component is literally ONLY for making the screen 'darker' when a popup occurs
function ScreenFader(props){
    return(
        <div className={props.currentClass + '-fader'}>

        </div>
    )
}

export default ScreenFader;