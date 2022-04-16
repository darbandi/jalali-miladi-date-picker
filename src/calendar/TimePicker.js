import React, {useState,useEffect} from "react";
import PropTypes from "prop-types";
import {hourList, minuteList, normalizeTime} from "./utils";
import VerticalScrollList from "./VerticalScrollList";

const TimePicker=(props)=>{
    const { date, hour, minute, onChange} = props;
    const [visible, setVisible]=useState(false);
    const [tempHour, setTempHour]=useState();
    const [tempMinute,setTempMinute]=useState();

    const onMinuteChange=(minute)=>{
        setTempMinute(minute);
    }

    const onHoureChange=(hour)=>{
        setTempHour(hour);
    }

    useEffect(()=>{
        setTempHour(hour);
        setTempMinute(minute);
    },[hour, minute]);

    return (
        <>
            <bdi className="date-time" onClick={()=>{
                setVisible(true);
            }}>
                {date} {normalizeTime(hour,minute)}
            </bdi>
            { visible &&
                <div className="time-picker">
                    <bdi className="time">{tempHour}:{tempMinute}</bdi>
                    <bdi className="time-section">
                        <VerticalScrollList 
                            list={hourList} 
                            defaultValue={tempHour} 
                            onChange={onHoureChange} 
                        />
                        <VerticalScrollList 
                            list={minuteList} 
                            defaultValue={tempMinute} 
                            onChange={onMinuteChange} 
                        />
                    </bdi>
                    <bdi className="btn-container">
                        <span
                            className="btn-ok-cancel"
                            onClick={() => {
                                setTempHour(hour);
                                setTempMinute(minute);
                                setVisible(false);
                            }}
                        >
                            &times;
                        </span>
                        <span 
                            className="btn-ok-cancel"
                            onClick={()=>{
                                if(typeof onChange==="function"){
                                    onChange(tempHour,tempMinute);
                                }
                                setVisible(false);
                            }}
                        >
                            &#10003;
                        </span>
                    </bdi>
                </div>
            }
        </>
    );
};

TimePicker.propTypes={
    date:PropTypes.string, 
    hour:PropTypes.string, 
    minute:PropTypes.string,
    onChange:PropTypes.func,
}

export default TimePicker;