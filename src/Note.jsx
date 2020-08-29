import React from 'react';

export default function Note({
  autoFocus,
  data,
  deleteDisabled,
  moveUpDisabled,
  moveDownDisabled,
  onDelete,
  onMove,
  onChange,
}) {
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
        autoFocus={autoFocus}
        value={data.text}
        placeholder="Start typing..."
        onChange={({ target }) => onChange('text', target.value)}
      />
    </div>
  );
}
