import React, { useState } from 'react';


const Text = (props) => {
    const [text, setText] = useState( props.answer || '' );
  
    return (
      <div>
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={event => setText(event.target.value)}
          style={{ fontSize: "2rem" }}
        />
      </div>
      <div className="footer">
        {!props.first ? (<button className="btn-block" onClick={() => props.submit(text, -1)}>Back</button>) : null}
        <button className="btn-block" onClick={() => props.submit(text, 1)}>{props.last ? "Submit" : "Next"}</button>
      </div>
      </div>
    );
  };

  export default Text;