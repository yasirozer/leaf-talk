import { useConversationStore } from '@/store/conversation-store';
import { SettingsView } from '@/components/settings/SettingsView';
import { VoidTopBar } from './VoidTopBar';
import { VoidSidebar } from './VoidSidebar';
import { VoidOrbitColumn } from './VoidOrbitColumn';
import { VoidChatPanel } from './VoidChatPanel';

export function BranchingVoidLayout() {
  const activeView = useConversationStore(s => s.activeView);

  return (
    <div
      className="branching-void"
      style={{
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '280px 320px 1fr',
        gridTemplateRows: 'auto 1fr',
        background: 'var(--surface)',
        overflow: 'hidden',
      }}
    >
      <VoidTopBar />
      <VoidSidebar />
      {activeView === 'settings' ? (
        <div
          style={{
            gridColumn: '2 / span 2',
            gridRow: 2,
            overflow: 'auto',
            padding: 24,
            background: 'var(--surface-container-lowest)',
            borderRadius: '32px 0 0 0',
          }}
        >
          <SettingsView />
        </div>
      ) : (
        <>
          <div style={{ gridRow: 2, minHeight: 0, overflow: 'hidden' }}>
            <VoidOrbitColumn />
          </div>
          <div style={{ gridRow: 2, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <VoidChatPanel />
          </div>
        </>
      )}
    </div>
  );
}
