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
    <div className="h-screen flex flex-col bg-background p-2 gap-2">
      <div className="flex flex-1 min-h-0 gap-2">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 gap-2">
          <TopBar />
          <div className="flex-1 flex min-h-0 gap-2">
            {activeView === 'chat' && branchPanelOpen ? (
              <ResizablePanelGroup direction="horizontal" className="gap-2">
                <ResizablePanel defaultSize={60} minSize={30}>
                  <div className="h-full card-glass overflow-hidden">
                    <MainChat />
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={40} minSize={20}>
                  <div className="h-full card-glass overflow-hidden">
                    <BranchPanel />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            ) : (
              <div className="flex-1 card-glass overflow-hidden">
                {activeView === 'chat' && <MainChat />}
                {activeView === 'tree' && <TreeView />}
                {activeView === 'settings' && <SettingsView />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
