import React, { useEffect, useRef, useState } from 'react'

const useThrottleEffect = (value, delay) => {
    const [throttledValue, setThrottledValue] = useState(value)
    const lastRef = useRef(Date.now())

    useEffect(() => {
        const handler = setTimeout(()=>{
            let now = Date.now();
            const timeElapsed = now - lastRef.current;

            if(timeElapsed >= delay){
                setThrottledValue(value)
                lastRef.current = now;
            }
        }, delay - (Date.now() - lastRef.current))
    
      return () => {
        clearTimeout(handler)
      }
    }, [delay, value])

  return throttledValue;
}

export default useThrottleEffect