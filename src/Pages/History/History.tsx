/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

export default function History(props:{gameId:number, close: ()=>void}) {
  const { gameId, close } = props;
  return (
    <div onClick={() => close()} style={{ fontSize: '30rem' }}>
      {gameId}
    </div>
  );
}
