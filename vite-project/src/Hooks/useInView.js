import { useEffect, useRef, useState } from 'react';
export default function useInView(options){
    const ref = useRef(null);
    const [inView,setInView] = useState(false);
    useEffect(()=>{
        const observer = new IntersectionObserver(([entry])=>{
            setInView(entry.isIntersecting);
        },options);
        const el = ref.current;
        if(el){
            observer.observe(el);
        }
        return()=>{
            if(el){
                observer.unobserve(el);
            }
        }
    },[options]);
    return [ref,inView];
}