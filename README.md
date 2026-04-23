# Branchable AI Chat — CIPHER_PROTOCOL_V1.0

Dallanabilir (branchable) bir AI sohbet arayüzü. Klasik lineer chat akışının ötesine geçerek, herhangi bir AI cevabının içinden bir metin parçası seçip o noktadan **bağımsız bir konuşma dalı** açmanı sağlar. Her dal yalnızca fork edildiği ana kadarki bağlamı miras alır, böylece ana konuşmayı kirletmeden alternatif fikirleri, "what-if" senaryolarını veya derinlemesine araştırmaları paralel olarak yürütebilirsin.

Tamamen **client-side** çalışır: API anahtarın ve tüm konuşma geçmişin sadece tarayıcının `localStorage`'ında durur, hiçbir backend'e gönderilmez.

## ✨ Özellikler

- 🌿 **Branching** — Herhangi bir mesajdan metin seç, o noktadan yeni bir dal başlat. Yan panelde açılır, istediğin kadar iç içe dallanabilir.
- 🌳 **Tree View** — Tüm konuşma ve dallarını React Flow ile görsel bir ağaç olarak gör.
- 🔌 **Çoklu Provider** — OpenAI, Anthropic, Google ve OpenRouter gibi tüm OpenAI-uyumlu custom endpoint'ler desteklenir.
- 🔑 **Sıfır Backend** — API key'in ve sohbetlerin tarayıcında kalır, sunucumuza hiçbir şey gitmez.
- ⌨️ **CIPHER_PROTOCOL Teması** — Yüksek kontrastlı, monospaced, neon yeşil hacker terminal estetiği.
- 💾 **Kalıcı Depolama** — Zustand + localStorage ile sohbetler oturum boyu korunur, favorilere ekleyebilirsin.
- ✏️ **Mesaj Düzenleme & Streaming** — Cevaplar token-by-token akar, kendi mesajlarını sonradan düzenleyebilirsin.

## 🛠 Teknoloji

- **Vite + React 18 + TypeScript**
- **Tailwind CSS** + **shadcn/ui** (semantic design tokens)
- **Zustand** (persist middleware ile state)
- **React Flow** (ağaç görselleştirme)
- **Lucide Icons**

## 🚀 Başlangıç

```bash
npm install
npm run dev
```

Sonra **Settings**'e gidip provider seç ve API key gir. Custom seçersen OpenRouter gibi OpenAI-uyumlu herhangi bir endpoint'i kullanabilirsin.

## 🧠 Nasıl Kullanılır

1. **Yeni Konuşma** — Sidebar'dan başlat, mesajını yaz.
2. **Dal Aç** — AI cevabında ilgilendiğin bir kısmı seç → çıkan popup'tan "Branch" tuşuna bas.
3. **Bağlamı Anla** — Açılan dal sadece seçim noktasına kadarki konuşmayı bilir; geri kalan ana konuşma onu etkilemez.
4. **Ağacı Gör** — Top bar'dan Tree View'a geç, tüm yapının haritasını incele.
