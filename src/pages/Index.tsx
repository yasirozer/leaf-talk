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

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <div className="flex-1 flex min-h-0">
            {activeView === 'chat' && <MainChat />}
            {activeView === 'tree' && <TreeView />}
            {activeView === 'settings' && <SettingsView />}
            {activeView === 'chat' && branchPanelOpen && <BranchPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
