
## Problems

1. **Silinen konuşma sonrası branch paneli açık kalıyor.** `deleteConversation` sadece `activeConversationId`'yi sıfırlıyor; `branchPanelOpen` ve `activeBranchId` eski değerlerinde kalıyor. Üstelik silinen branch'e mesaj yazıldığında `sendMessage` `activeConversationId === null` olduğu için sessizce çıkıyor → cevap gelmiyor, hata da görünmüyor.
2. **Tree'de mesaj node'larına tıklayınca bir şey olmuyor.** Sadece `branch-*` node'ları tıklanabilir. İstenen: bir node'a **çift tıklayınca** ilgili chat'e (ana konuşma veya branch) atlamak.
3. **Branch chat için tam ekran modu yok.** Şu an her zaman split (resizable) görünüyor. İstenen: bir tuş → branch full-screen; tekrar bas → ikisi yan yana.

## Plan

### 1. Store fix (`src/store/conversation-store.ts`)
- `deleteConversation`: silinen konuşma aktifse `activeBranchId: null`, `branchPanelOpen: false`, `branchPanelFullscreen: false` da set et.
- Yeni state: `branchPanelFullscreen: boolean` (default `false`) + actions `toggleBranchFullscreen()`, `setBranchFullscreen(v)`.
- `closeBranchPanel` aynı zamanda fullscreen'i kapatsın.
- `setActiveBranch(null)` çağrılırsa fullscreen sıfırlansın.
- Persist'e dahil etme (UI state).

### 2. Branch full-screen mod (`src/pages/Index.tsx` + `src/components/branch/BranchPanel.tsx`)
- `Index.tsx`: `branchPanelOpen && branchPanelFullscreen` ise sadece `<BranchPanel />` render et (ResizablePanelGroup'u atla, MainChat gizli).
- `BranchPanel` header'ına yeni buton: Maximize/Minimize ikonu (lucide `Maximize2` / `Minimize2`), tıklayınca `toggleBranchFullscreen`.
- Kısayol: `Cmd/Ctrl + B` global listener (Index.tsx içinde `useEffect`) → branch paneli açıkken fullscreen toggle, kapalıysa no-op.

### 3. Tree çift tıklama navigasyon (`src/components/tree/TreeView.tsx`)
- ReactFlow `onNodeDoubleClick` handler ekle:
  - `node.id.startsWith('branch-')` → mevcut davranış (branch'i aç, chat view'a geç).
  - `node.id.startsWith('bmsg-')` → ait olduğu branch'i bul (node `data.branchId` taşıyalım), `setActiveBranch(branchId)` + chat view.
  - Diğer (ana mesaj) → `setActiveBranch(null)` + chat view (ana konuşmayı göster).
- Branch ve bmsg node `data`'sına `branchId` ekle ki lookup gerekmesin.
- Mevcut tek-tık handler'ı kaldır (yanlışlıkla branch açmayı önler) — sadece çift tık ile navigasyon olsun.

### 4. (Küçük) sendMessage guard (`src/hooks/use-chat-stream.ts`)
- `convId` null'sa kullanıcıya görünür şekilde no-op olmak yerine erken `return` aynen, fakat (1) düzeltmesi olunca tetiklenmeyecek. Ekstra değişiklik yapmıyoruz.

## Etkilenen dosyalar
- `src/store/conversation-store.ts`
- `src/pages/Index.tsx`
- `src/components/branch/BranchPanel.tsx`
- `src/components/tree/TreeView.tsx`

## Notlar
- `BranchingVoidLayout` ayrı bir view; bu plan klasik layout (`Index.tsx`) içindir, çünkü aktif `activeView === 'chat'` akışı oradan geçiyor.
- Fullscreen state persist EDİLMEYECEK — sayfa yenileyince normal split döner.
