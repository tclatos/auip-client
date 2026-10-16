import React, { useState } from 'react';
import { Wrench, CheckCircle2, ChevronDown, ChevronRight, Loader2 } from 'lucide-react';

interface ToolCallBadgeProps {
  toolName: string;
  args?: any;
  result?: any;
  isExecuting?: boolean;
}

export const ToolCallBadge: React.FC<ToolCallBadgeProps> = ({
  toolName,
  args,
  result,
  isExecuting = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formattedArgs = typeof args === 'string' ? args : JSON.stringify(args, null, 2);
  const formattedResult = typeof result === 'string' ? result : JSON.stringify(result, null, 2);

  return (
    <div className="my-2 border border-amber-500/20 bg-amber-950/20 rounded-xl overflow-hidden text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 text-amber-300 hover:bg-amber-900/20 transition-colors"
      >
        <div className="flex items-center gap-2">
          {isExecuting ? (
            <Loader2 className="w-4 h-4 text-amber-400 animate-spin" />
          ) : (
            <Wrench className="w-4 h-4 text-amber-400" />
          )}
          <span className="font-mono font-semibold">{toolName}</span>
          {result && !isExecuting && (
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" /> complete
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-3 border-t border-amber-500/10 space-y-2 bg-slate-950/40 font-mono text-[11px]">
          {args && (
            <div>
              <span className="text-slate-400 font-semibold block mb-1">Arguments:</span>
              <pre className="bg-slate-900 p-2 rounded-lg text-amber-200 overflow-x-auto whitespace-pre-wrap">
                {formattedArgs}
              </pre>
            </div>
          )}

          {result && (
            <div>
              <span className="text-slate-400 font-semibold block mb-1">Result:</span>
              <pre className="bg-slate-900 p-2 rounded-lg text-emerald-300 overflow-x-auto whitespace-pre-wrap max-h-48">
                {formattedResult}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
