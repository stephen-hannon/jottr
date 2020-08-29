import React, { useRef, useEffect, useState } from 'react';

export default function Note({
  data,
  deleteDisabled,
  moveUpDisabled,
  moveDownDisabled,
  onDelete,
  onMove,
  onChange,
}) {
  const textRef = useRef(null);
  const [textHeight, setTextHeight] = useState(150);

  useEffect(() => {
    console.log(textRef.current.scrollHeight)
    setTextHeight(Math.max(textRef.current.scrollHeight, 150));
  }, [data.text]);

  return (
    <div className="Note">
      <input
        value={data.title}
        onChange={({ target }) => onChange('title', target.value)}
        placeholder="Title"
      />
      <button disabled={moveUpDisabled} onClick={() => onMove(-1)}>
        ↑
      </button>
      <button disabled={moveDownDisabled} onClick={() => onMove(1)}>
        ↓
      </button>
      <button disabled={deleteDisabled} onClick={onDelete}>
        delete
      </button>
      <textarea
        // TODO: Autofocus first textarea on page load
        ref={textRef}
        style={{height: textHeight}}
        value={data.text}
        placeholder="Start typing..."
        onChange={({ target }) => onChange('text', target.value)}
      />
    </div>
  );
}
