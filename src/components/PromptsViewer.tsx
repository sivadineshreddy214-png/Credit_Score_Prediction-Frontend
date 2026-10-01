import React, { useState } from 'react';
import { DEV_PROMPTS } from '../data/promptsData';
import { Copy, Check, Download, BookOpen, Layers, Terminal, Sparkles } from 'lucide-react';

export const PromptsViewer: React.FC = () => {
  const [selectedPromptId, setSelectedPromptId] = useState<string>('prompt-1');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activePrompt = DEV_PROMPTS.find((p) => p.id === selectedPromptId) || DEV_PROMPTS[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadAll = () => {
    const combined = DEV_PROMPTS.map((p) => `========================================\n${p.title}\n========================================\n\n${p.content}`).join('\n\n\n');
    const blob = new Blob([combined], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'credit-score-development-prompts-1-2-3.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Developer Engineering Blueprints</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Generated Three-Stage Development Prompts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Precision instructions crafted for project setup, ML model REST integration on Render, and Firebase Authentication with protected access.
          </p>
        </div>

        <button
          onClick={handleDownloadAll}
          className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors flex items-center gap-2 shadow-2xs self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Download All Prompts (.md)</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl">
        {DEV_PROMPTS.map((prompt) => (
          <button
            key={prompt.id}
            onClick={() => setSelectedPromptId(prompt.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
              selectedPromptId === prompt.id
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <span>{prompt.badge}</span>
          </button>
        ))}
      </div>

      {/* Content Viewer */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        
        {/* Top bar of viewer */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono font-semibold text-indigo-600 uppercase tracking-wider">
              {activePrompt.badge}
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">{activePrompt.title}</h2>
            <p className="text-xs text-slate-500 mt-0.5">{activePrompt.subtitle}</p>
          </div>

          <button
            onClick={() => handleCopy(activePrompt.content, activePrompt.id)}
            className="px-3.5 py-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 self-start sm:self-auto shadow-2xs"
          >
            {copiedId === activePrompt.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full Prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Formatted Text Box */}
        <div className="p-6">
          <pre className="p-5 bg-slate-950 text-slate-100 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-indigo-600 selection:text-white border border-slate-800">
            {activePrompt.content}
          </pre>
        </div>

      </div>
    </div>
  );
};
