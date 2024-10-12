import React, { useDebugValue, useEffect, useState } from "react";

const useFetchAPI = (url, options) => {
  const [responseData, setResponseData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch(url, options)
    .then((resp) => resp.json())
    .then((data) => {
      setResponseData(data);
      setError(null)
    })
    .catch((e)=>{
        setError(e)
        setResponseData(null)
    }).finally(()=> setLoading(false))
  }, [url, options])
  
  useDebugValue('Custom Fetch API');
  
    return {responseData, loading, error};
};

export default useFetchAPI;