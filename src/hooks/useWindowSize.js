import { useState,useEffect } from "react";


const useWindowSize = () => {
    const [windowSize,setWindowSize] = useState({
        width:undefined,
        height:undefined
    })//we have an object as default value of the state
    useEffect(()=>{
    const handleResize = ()=>{
        setWindowSize({
            width:window.innerWidth,
            height:window.innerHeight
        })
    }
    handleResize()
    //to value to continue to adjust
    window.addEventListener('resize',handleResize)
    //to prevent memory leak
    //by using clean up function
    //so to remove the event listener
    //this is done to not set any dep changes in the useEffect function
    //runs after app closes
    return ()=>window.removeEventListener("resize",handleResize)
    },[])//runs only during load time
 return windowSize
}

export default useWindowSize
