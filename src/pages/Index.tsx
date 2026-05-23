import { Sidebar } from '@/components/layout/Sidebar';
import { TopBar } from '@/components/layout/TopBar';
import { MainChat } from '@/components/chat/MainChat';
import { BranchPanel } from '@/components/branch/BranchPanel';
import { TreeView } from '@/components/tree/TreeView';
import { SettingsView } from '@/components/settings/SettingsView';
import { useConversationStore } from '@/store/conversation-store';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const Index = () => {
  const activeView = useConversationStore(s => s.activeView);
  const branchPanelOpen = useConversationStore(s => s.branchPanelOpen);

  return (
    <div className="lt-base lt-grain flex h-screen flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <div
          className="flex min-w-0 flex-1 flex-col"
          style={{
            background: 'var(--surface)',
            borderLeft: '1px solid var(--outline-ghost)',
          }}
        >
          <TopBar />
          <div className="flex flex-1 min-h-0">
            {activeView === 'chat' && branchPanelOpen ? (
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={60} minSize={30}>
                  <MainChat />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40} minSize={20}>
                  <BranchPanel />
                </ResizablePanel>
              </ResizablePanelGroup>
            ) : (
              <>
                {activeView === 'chat' && <MainChat />}
                {activeView === 'tree' && <TreeView />}
                {activeView === 'settings' && <SettingsView />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
