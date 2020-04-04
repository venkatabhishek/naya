import React, { useState } from 'react';


const Number = (props) => {
  const [number, setNumber] = useState(props.answer || '');

  return (
    <div>
      <div className="input-group">
        <input
          type="number"
          value={number}
          onChange={event => setNumber(event.target.value)}
          style={{ fontSize: "2rem" }}
        />
      </div>
      <div className="footer">
        {!props.first ? (<button className="btn-block" onClick={() => props.submit(number, -1)}>Back</button>) : null}
        <button className="btn-block" onClick={() => props.submit(number, 1)}>{props.last ? "Submit" : "Next"}</button>
      </div>

    </div>
  );
};

export default Number;