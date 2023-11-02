import { useRef } from "react";

export class Session{
    constructor(){
        this._default = {
            config : { autoJump : true, cut : 'Even' },
            video : { currentTime : 0, isDragging : false, duration : 0, videoSrc: null, videoRef : useRef( null ) },
            points : {
                pointsList : [],
                selectedMode : false,
                lastSelectedPoint : null
            }
        } 
    }
}

/*
    en modo añadir punto no debe mover el currentTimePoint
*/