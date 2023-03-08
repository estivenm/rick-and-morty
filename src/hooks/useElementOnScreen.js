import { useEffect, useState } from 'react'

const defaultOptions = {
  root: null,
  rootMargin: '10px',
  threshold: [0.0, 0.75]
}
const useElementOnScreeen = ({ visorRef, optionsRef }) => {
  const [isVisible, setIsVisible] = useState(false)
  const options = optionsRef ?? defaultOptions

  const callBackFunction = (entries) => {
    const [entry] = entries
    setIsVisible(entry.isIntersecting) //Sí esta en pantalla, pone el estado en true, de lo contrario, lo pone en false
  }

  useEffect(() => {
    const { current } = visorRef
    const observer = new IntersectionObserver(callBackFunction, options)
    if (current) observer.observe(current) //Sí tenemos al visor, lo observamos
    return () => {
      //desObservar si salimos del componente
      current && observer.disconnect()
    }
  }, [visorRef, options, isVisible])

  return [visorRef, isVisible, setIsVisible]
}

export default useElementOnScreeen
