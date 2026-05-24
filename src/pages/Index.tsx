import { useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { MainChat } from '@/components/chat/MainChat';
import { BranchPanel } from '@/components/branch/BranchPanel';
import { TreeView } from '@/components/tree/TreeView';
import { SettingsView } from '@/components/settings/SettingsView';
import { useConversationStore } from '@/store/conversation-store';

const Index = () => {
  const activeView = useConversationStore(s => s.activeView);
  const branchPanelOpen = useConversationStore(s => s.branchPanelOpen);
  const branchPanelFullscreen = useConversationStore(s => s.branchPanelFullscreen);
  const toggleBranchFullscreen = useConversationStore(s => s.toggleBranchFullscreen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
        if (useConversationStore.getState().branchPanelOpen) {
          e.preventDefault();
          toggleBranchFullscreen();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleBranchFullscreen]);

  const showBranchOverlay = activeView === 'chat' && branchPanelOpen && !branchPanelFullscreen;
  const showBranchFullscreen = activeView === 'chat' && branchPanelOpen && branchPanelFullscreen;

  return (
    <div className="lt-base lt-grain flex h-screen flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <div
          className="relative flex min-w-0 flex-1 flex-col"
          style={{
            background: 'var(--surface)',
            borderLeft: '1px solid var(--outline-ghost)',
          }}
        >
          <TopBar />
          <div className="relative flex flex-1 min-h-0">
            {activeView === 'chat' && <MainChat />}
            {activeView === 'tree' && <TreeView />}
            {activeView === 'settings' && <SettingsView />}

            {showBranchOverlay && (
              <div
                className="absolute right-0 top-0 h-full w-[44%] min-w-[420px] max-w-[720px] z-30 border-l shadow-2xl"
                style={{ borderColor: 'var(--outline-ghost)', background: 'var(--surface)' }}
              >
                <BranchPanel />
              </div>
            )}
          </div>
        </div>
      </div>

      {showBranchFullscreen && (
        <div className="fixed inset-0 z-50" style={{ background: 'var(--surface)' }}>
          <BranchPanel />
        </div>
      )}
    </div>
  );
};

export default Index;
