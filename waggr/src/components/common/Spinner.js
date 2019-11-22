import React from 'react';
import spinner from './spinner.gif';

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: '120px', position: "absolute", margin: 'auto', top: '0', right: '0',  bottom: '0' , left: '0',  display: 'block' }}
        alt="Wagging..."
      />
    </div>
  );
};