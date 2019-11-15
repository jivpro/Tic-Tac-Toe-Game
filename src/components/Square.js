import React from "react";

const Square = (props) => {
  return (
    <button 
      className="square border-dark font-weight-bold" 
      onClick={ props.onClick }
    >
      { props.value } 
    </button>
  );
}

export default Square;