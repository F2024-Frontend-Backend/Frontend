import { useState } from "react";

import "./ItemRabate.css";

interface ReabteProps {
    rebateQuantity: number;
    rebatePercent: number;
    count: number;
  }
  
  const Rebate: React.FC<ReabteProps> = ({
    rebatePercent,
    rebateQuantity,
    count,
  }) => {
    const [expanded, setExpanded] = useState(false);

    const expand = () => {
        setExpanded(true)
    }

    const compress = () => {
        setExpanded(false)
    }
  
    if (rebateQuantity > 0 && rebateQuantity > count ) {
      return (
        <div className="reabte" onMouseEnter={expand} onMouseLeave={compress}>
           {expanded && 
            <span>Buy {rebateQuantity} </span>
          } 
          <span >Save {rebatePercent}%</span>
        </div>
      )
      
    }
  }

  export default Rebate