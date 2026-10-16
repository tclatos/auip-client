import React from 'react';
import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
} from '@assistant-ui/react';
import ReactMarkdown from 'react-markdown';
import { User, Bot, Send, Square, Sparkles } from 'lucide-react';
import { ReasoningBlock } from './ReasoningBlock';
import { ToolCallBadge } from './ToolCallBadge';

const UserMessage: React.FC = () => {
  return (
    <div className="flex justify-end items-start gap-3 my-4 max-w-3xl ml-auto">
      <div className="bg-indigo-600 text-white px-4 py-3 rounded-2xl rounded-tr-sm shadow-md shadow-indigo-500/10 text-sm leading-relaxed max-w-[85%] break-words">
        <MessagePrimitive.Parts
          components={{
            Text: ({ text }) => <span className="whitespace-pre-wrap">{text}</span>,
          }}
        />
      </div>
      <div className="w-8 h-8 rounded-full bg-indigo-500/30 border border-indigo-400/40 flex items-center justify-center shrink-0 text-indigo-300">
        <User className="w-4 h-4" />
      </div>
    </div>
  );
};

const AssistantMessage: React.FC = () => {
  return (
    <div className="flex justify-start items-start gap-3 my-4 max-w-3xl mr-auto">
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shrink-0 shadow-sm shadow-cyan-500/20 text-white">
        <Bot className="w-4 h-4" />
      </div>

      <div className="flex-1 bg-slate-900/90 border border-slate-800 px-4 py-3.5 rounded-2xl rounded-tl-sm shadow-md text-sm text-slate-200 leading-relaxed max-w-[90%] break-words">
        <MessagePrimitive.Parts
          components={{
            Text: ({ text }) => (
              <div className="prose prose-invert prose-sm max-w-none space-y-2">
                <ReactMarkdown>{text}</ReactMarkdown>
              </div>
            ),
            Reasoning: ({ text }) => <ReasoningBlock text={text} />,
            tools: {
              Fallback: ({ toolName, args, result }: any) => (
                <ToolCallBadge toolName={toolName} args={args} result={result} />
              ),
            },
          }}
        />
      </div>
    </div>
  );
};

interface ChatThreadProps {
  agentName: string;
}

export const ChatThread: React.FC<ChatThreadProps> = ({ agentName }) => {
  return (
    <ThreadPrimitive.Root className="flex flex-col h-full bg-slate-950 text-slate-100 relative">
      <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-4">
        <ThreadPrimitive.Empty>
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center max-w-md mx-auto space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-xl">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-100">Ready to chat with {agentName}</h2>
              <p className="text-xs text-slate-400 mt-1">
                Powered by GenAI Toolkit AUIP & AG-UI streaming protocol.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full pt-4 text-left">
              <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl text-xs text-slate-300">
                <span className="font-semibold text-indigo-400 block mb-0.5">⚡ Real-time Token Streaming</span>
                Stream assistant output incrementally over Server-Sent Events.
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl text-xs text-slate-300">
                <span className="font-semibold text-cyan-400 block mb-0.5">🧠 Chain-of-Thought</span>
                Inspect agent thinking traces and subagent step transitions.
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 p-3 rounded-xl text-xs text-slate-300">
                <span className="font-semibold text-amber-400 block mb-0.5">🛠️ Tool & Sandbox Execution</span>
                Inspect tool names, execution parameters, and returned outcomes.
              </div>
            </div>
          </div>
        </ThreadPrimitive.Empty>

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />

        <ThreadPrimitive.If running>
          <div className="flex items-center gap-2 max-w-3xl mr-auto ml-11 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="animate-pulse">{agentName} is working… (the first response may take a few seconds while the agent starts)</span>
          </div>
        </ThreadPrimitive.If>
      </ThreadPrimitive.Viewport>

      {/* Composer Input Area */}
      <div className="p-4 md:px-8 border-t border-slate-800/80 bg-slate-950/90 backdrop-blur">
        <div className="max-w-3xl mx-auto">
          <ComposerPrimitive.Root className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-2 focus-within:border-indigo-500/80 focus-within:ring-1 focus-within:ring-indigo-500/40 transition-all shadow-lg">
            <ComposerPrimitive.Input
              placeholder={`Message ${agentName}...`}
              className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-500 px-3 py-2 text-sm resize-none"
              rows={1}
              autoFocus
            />

            <ComposerPrimitive.Send className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl transition-colors disabled:opacity-40 disabled:hover:bg-indigo-600 cursor-pointer">
              <Send className="w-4 h-4" />
            </ComposerPrimitive.Send>

            <ComposerPrimitive.Cancel className="bg-rose-600/80 hover:bg-rose-600 text-white p-2.5 rounded-xl transition-colors cursor-pointer">
              <Square className="w-4 h-4 fill-white" />
            </ComposerPrimitive.Cancel>
          </ComposerPrimitive.Root>

          <p className="text-[11px] text-slate-500 text-center mt-2 font-mono">
            Protocol: AG-UI 1.0 (SSE) • Backend: http://localhost:8000/agent
          </p>
        </div>
      </div>
    </ThreadPrimitive.Root>
  );
};
