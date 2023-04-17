import React, { useEffect, useState } from 'react'
import {useScroll, motion, useTransform} from 'framer-motion'

export default function ProgressBar() {
    const [viewport, setViewport] = useState(innerHeight)
    const { scrollYProgress } = useScroll(0)    
    const scaleX = useTransform(scrollYProgress, [0,1], [0, viewport])

    addEventListener('resize', () => {
        setViewport(innerHeight)
    })

  return <motion.div 
  className="progress-bar"
  style={{height: scaleX}}
  />;
}

