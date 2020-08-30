import React, { useRef, useEffect, useState } from 'react';

interface ComponentProps {
  data: {
    title: string;
    text: string;
  };
  deleteDisabled?: boolean;
  moveUpDisabled?: boolean;
  moveDownDisabled?: boolean;
  onDelete?: (event: React.MouseEvent) => void;
  onMove: (delta: number) => void;
  onChange: (parameter: string, newValue: string) => void;
}

const Note: React.FC<ComponentProps> = ({
  data,
  deleteDisabled,
  moveUpDisabled,
  moveDownDisabled,
  onDelete,
  onMove,
  onChange,
}) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [textHeight, setTextHeight] = useState<number>(150);

  useEffect(() => {
    if (!textRef.current) return;

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

export default Note;