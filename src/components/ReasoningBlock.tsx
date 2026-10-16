import React, { useState } from 'react';
import { Brain, ChevronDown, ChevronRight } from 'lucide-react';

interface ReasoningBlockProps {
  text: string;
}

export const ReasoningBlock: React.FC<ReasoningBlockProps> = ({ text }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!text) return null;

  return (
    <div className="my-2 border border-indigo-500/20 bg-indigo-950/20 rounded-xl overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-indigo-300 hover:bg-indigo-900/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Thought Process / Reasoning</span>
          <span className="text-[10px] text-slate-500 font-mono">({text.length} chars)</span>
        </div>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
        )}
      </button>

      {isOpen && (
        <div className="px-3.5 py-2.5 border-t border-indigo-500/10 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto bg-slate-950/40">
          {text}
        </div>
      )}
    </div>
  );
};
