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
    <div className="h-screen flex flex-col bg-background">
      {/* Protocol header */}
      <div className="h-10 border-b border-border surface-1 flex items-center justify-between px-4">
        <h1 className="text-[12px] font-bold tracking-[0.2em] uppercase text-primary">
          CIPHER_PROTOCOL_V1.0
        </h1>
        <div className="flex items-center gap-4 text-[8px] text-dim tracking-widest uppercase font-mono">
          <span>LATENCY: 12ms</span>
          <span>ENCRYPTION: AES-512</span>
        </div>
      </div>
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <div className="flex-1 flex min-h-0">
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