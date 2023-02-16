import { useState,useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data,setData] = useState([])
  const [fetchError,setFetchError] = useState(null)
  const [isloading,setIsLoading] = useState(false)
  useEffect(()=>{
    let isMounted = true//we want component to be mounted
    const source = axios.CancelToken.source()//this is when component is unmounted we can cancel the req
    const fetchData = async (url)=>{
        setIsLoading(true)
        try {
            const response = await axios.get(url,{
                //apply cancel token
                cancelToken: source.token
            })
            if(isMounted){
                setData(response.data)
                setFetchError(null)
            }
        } catch (error) {
            if(isMounted){
                setFetchError(error.message)
                setData([])
            }
        } finally{
            isMounted && setTimeout(()=>setIsLoading(false),2000)
        }
    }
    fetchData(dataUrl)
    const cleanUp = ()=>{
        console.log('clean up func')
        isMounted = false
        source.cancel()
    }
    return cleanUp
  },[dataUrl])
  return {data,fetchError,isloading}
}

export default useAxiosFetch
