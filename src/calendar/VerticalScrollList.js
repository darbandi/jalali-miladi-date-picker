import React, {useRef ,useState, useEffect} from "react";
import PropTypes from "prop-types";

const VerticalScrollList=(props)=>{
    const {list, defaultValue, onChange}=props;
    const listRef=useRef(null);
    const elementRef=useRef(null);
    const [value,setValue]=useState();
    useEffect(() => {
        setValue(defaultValue);
        
    }, [defaultValue]);

    const decreament=()=>{
        const max=Math.max(...list);
        const min=Math.min(...list);

        setValue((prev)=>{
            let val;
            if(+prev <= +min) val= +max;
            else val= +prev - 1;

            return (`${(val<10)?"0":""}${val}`);
        })
    }

    const increament=()=>{
        const max=Math.max(...list);
        const min=Math.min(...list);

        setValue((prev)=>{
            let val;
            if(+prev >= +max) val= +min;
            else val= +prev + 1;

            return (`${(val<10)?"0":""}${val}`);
        })
    }

    useEffect(() => {
        if(value!==undefined) onChange(value);
        if(!elementRef.current) return;
        if(!listRef.current) return;
        listRef.current.scroll({
            top: +value * elementRef.current.offsetHeight-36, 
            left: 0, 
            behavior: 'smooth'
          });
    }, [value])
    return (
        <div className="vertical-scroll-list">
            <div className="arrow-btn" onClick={decreament}>
                <bdi>&#9650;</bdi>
            </div>
            <ul ref={listRef}>
                {list?.map((name, index) => 
                {
                    const val=(value!==undefined)?value:defaultValue;
                    return(
                        <li
                            ref={+val=== +name ? elementRef : null}
                            key={index}
                            className={
                                +name === +val ? "active" : ""
                            }
                            onClick={() => {
                                setValue(name);
                            }}
                        >
                            {name}
                        </li>
                    );
                }
                )}
            </ul>
            <div className="arrow-btn" onClick={increament}>
                <bdi>&#9660;</bdi>
            </div>
        </div>
    );
};

VerticalScrollList.propTypes={
    list:PropTypes.array,
    defaultValue:PropTypes.number,
    onChange:PropTypes.func, 
}

export default VerticalScrollList;