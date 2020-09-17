import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const MIN_BODY_HEIGHT = 150;

const NoteWrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0 0 6px 0 #00000080;
  margin: 30px auto;
  padding: 30px 15px;
  max-width: 1000px;
`;

const Title = styled.input`
  display: block;
  width: 100%;
  font-weight: bold;
  font-size: 18px;
`;

const Body = styled.textarea`
  font-family: 'Source Code Pro', Consolas, Monaco, monospace;
  display: block;
  width: 100%;
  margin-top: 10px;

  &:not(:focus) {
    height: ${MIN_BODY_HEIGHT}px !important;
  }
`;

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
    setTextHeight(Math.max(textRef.current.scrollHeight, MIN_BODY_HEIGHT));
  }, [data.text]);

  return (
    <NoteWrapper>
      <Title
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
      <Body
        // TODO: Autofocus first textarea on page load
        ref={textRef}
        style={{height: textHeight}}
        value={data.text}
        placeholder="Start typing..."
        onChange={({ target }) => onChange('text', target.value)}
      />
    </NoteWrapper>
  );
}

export default Note;