import React, { useState, useEffect } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { ChevronIcon } from './icons/ChevronIcon';
import { MonitoringPanel } from './MonitoringPanel';
import { TaskManager } from './TaskManager';

interface CodeExplorerProps {
  code: string;
}

type AccordionPanel = 'explorer' | 'monitor' | 'tasks';

export const CodeExplorer: React.FC<CodeExplorerProps> = ({ code }) => {
  const [copyStatus, setCopyStatus] = useState('Copy Code');
  const [activePanel, setActivePanel] = useState<AccordionPanel>('explorer');

  useEffect(() => {
    if (copyStatus === 'Copied!') {
      const timer = setTimeout(() => setCopyStatus('Copy Code'), 2000);
      return () => clearTimeout(timer);
    }
  }, [copyStatus]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (code) {
      navigator.clipboard.writeText(code);
      setCopyStatus('Copied!');
    }
  };

  const isPanelOpen = (panel: AccordionPanel) => activePanel === panel;

  const handleToggle = (panel: AccordionPanel) => {
    setActivePanel(panel);
  };

  const AccordionSection: React.FC<{
    title: string;
    panelId: AccordionPanel;
    children: React.ReactNode;
    headerContent?: React.ReactNode;
  }> = ({ title, panelId, children, headerContent }) => {
    const isOpen = isPanelOpen(panelId);
    return (
      <div
        className={`flex flex-col bg-slate-800/50 rounded-lg border border-slate-700 transition-all duration-500 ease-in-out ${
          isOpen ? 'flex-1 min-h-0' : 'flex-none'
        }`}
      >
        <button
          onClick={() => handleToggle(panelId)}
          aria-expanded={isOpen}
          className="flex justify-between items-center w-full p-3 text-left bg-slate-800 hover:bg-slate-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500/50"
        >
          <h2 className="text-lg font-semibold text-slate-200">{title}</h2>
          <div className="flex items-center gap-4">
            {headerContent}
            <ChevronIcon isOpen={isOpen} />
          </div>
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'flex-1' : 'max-h-0 invisible'
          }`}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/50 p-4 space-y-3">
      <AccordionSection
        title="Terraform Explorer"
        panelId="explorer"
        headerContent={
          isPanelOpen('explorer') && (
            <button
              onClick={handleCopy}
              disabled={!code}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-sky-600 text-white rounded-md hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
              <CopyIcon className="w-4 h-4" />
              {copyStatus}
            </button>
          )
        }
      >
        <div className="h-full overflow-auto">
          {code ? (
            <pre className="p-4 text-sm text-slate-200 selection:bg-sky-500/30">
              <code className="language-hcl whitespace-pre-wrap break-words font-mono">{code}</code>
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 p-4">
              <p>Your generated Terraform code will appear here.</p>
            </div>
          )}
        </div>
      </AccordionSection>

      <AccordionSection title="Infrastructure Health" panelId="monitor">
        <div className="h-full">
          <MonitoringPanel />
        </div>
      </AccordionSection>

      <AccordionSection title="Task Manager" panelId="tasks">
        <div className="h-full">
          <TaskManager />
        </div>
      </AccordionSection>
    </div>
  );
};
