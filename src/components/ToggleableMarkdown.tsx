'use client'

import React, { useState } from 'react'

interface ToggleableMarkdownProps {
  children: string;
}

const ToggleableMarkdown: React.FC<ToggleableMarkdownProps> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lines = children.split('\n');
  const firstLine = lines[0];
  const restOfContent = lines.slice(1).join('\n');
  
  return (
    <div className="border rounded p-2 my-2">
      <div 
        className="cursor-pointer flex justify-between items-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{firstLine}</span>
        <span>{isExpanded ? '▲' : '▼'}</span>
      </div>
      {isExpanded && (
        <pre className="mt-2">
          <code>{restOfContent}</code>
        </pre>
      )}
    </div>
  );
};

export default ToggleableMarkdown;