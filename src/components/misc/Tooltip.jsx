import React, { useState, useEffect, useRef } from "react";
import "./../../css/misc/Tooltip.css";

const Tooltip = (props) => {
  const [active, setActive] = useState(false);
  const timeout = useRef();

  useEffect(() => {
    let cancelled = false;
    if (!cancelled && props.shared != null && !props.shared) setActive(false);
    return () => {
      cancelled = true;
    };
  }, [active, props.shared]);

  const showTip = () => {
    timeout.current = setTimeout(() => {
      setActive(true);
    }, props.delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout.current);
    setActive(props.shared ? true : false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`}>
          {props.content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
