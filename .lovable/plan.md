## LinkedIn Post Taslağı — Branchable AI Chat

Aşağıda projeyi tanıtmak için 3 farklı versiyon hazırladım. Hepsi LinkedIn'in "ilk 3 satır kuralına" göre yazıldı (kullanıcı "...daha fazla" demeden önce hook görmesi lazım).

---

### Format Önerisi (Genel Yapı)

LinkedIn'de iyi performans gösteren teknik post yapısı:

```text
[HOOK]        → 1-2 satırlık merak uyandırıcı açılış
[PROBLEM]     → Çözdüğün sorunu net anlat
[ÇÖZÜM]       → Projeyi tanıt (3-5 madde)
[STACK]       → Teknolojiler (kısa)
[CTA]         → Link + soru / geri bildirim isteği
[HASHTAG]     → 3-5 etiket (abartma)
```

**İpuçları:**
- Emoji ölçülü kullan (1-2 satırda 1 tane yeter)
- Cümleler kısa olsun, satır araları boş bırak (mobilde okunabilirlik)
- Görsel ekle: TreeView ekran görüntüsü veya kısa GIF (en çok etkileşim alır)
- İlk yorumda link paylaş (LinkedIn algoritması link'li postları daha az gösterir)

---

### Versiyon 1 — Teknik / Geliştirici Odaklı

```text
ChatGPT'de bir cevabın bir kısmı ilgini çekiyor ama konuyu dağıtmadan o kısmı 
derinleştirmek istiyorsun. Ne yapıyorsun? Yeni sohbet açıp context'i kopyalıyorsun.

Bu repetitive iş için bir hafta sonu projesi yaptım: Branchable AI Chat.

AI'ın cevabından bir metin seç → "Branch" de → o noktadan bağımsız bir konuşma 
dalı açılsın. Ana sohbet kirlenmesin, dal sadece fork edildiği ana kadarki 
context'i miras alsın. İstediğin kadar iç içe dallan.

→ Dalları React Flow ile ağaç olarak görselleştir
→ OpenAI, Anthropic, Google + tüm OpenRouter modelleri
→ %100 client-side: API key ve geçmiş sadece tarayıcında, backend yok
→ Mesaj düzenleme, streaming, favoriler
→ CIPHER_PROTOCOL teması (terminal estetiği sevenlere)

Stack: Vite + React 18 + TS, Tailwind, shadcn/ui, Zustand (persist), React Flow.

Lovable ile hızlıca prototipledim, kod açık. Deneyip geri bildirim verirseniz 
sevinirim — özellikle "branch" UX'i nasıl daha iyi olur fikirlerinize açığım.

Link yorumda 👇

#AI #React #TypeScript #OpenSource #BuildInPublic
```

---

### Versiyon 2 — Hikaye / Problem Odaklı (daha "insani")

```text
Bir AI cevabında 5 farklı konu açılıyor. Hepsini merak ediyorsun ama 
birini sorduğunda diğerleri unutuluyor.

Bu sinir bozucu döngüden çıkmak için küçük bir araç yaptım.

Branchable AI Chat — herhangi bir cevaptan bir cümle seçip o noktadan 
yeni bir "dal" açıyorsun. Dal kendi context'ini taşıyor, ana sohbet 
etkilenmiyor. İstediğin kadar derine inebiliyorsun, sonra ağaç görünümünden 
tüm haritayı görüyorsun.

Tamamen tarayıcıda çalışıyor — API key'in senin makinende kalıyor, 
hiçbir yere gönderilmiyor. OpenAI, Claude, Gemini, OpenRouter destekli.

Düşünme şeklim "lineer chat"ten "ağaç" yapısına geçince bambaşka oldu. 
Belki sizin de işinize yarar.

Repo + demo yorumda.

#AI #ProductDesign #Frontend #IndieHacker
```

---

### Versiyon 3 — Kısa & Vurucu

```text
ChatGPT'de "şu kısmı detaylandır" demek yerine direkt o cümleyi seçip 
oradan yeni bir konuşma dalı açabilseydin?

Hafta sonu tam olarak bunu yaptım: Branchable AI Chat.

▸ Mesajdan metin seç → branch aç
▸ Dal sadece o ana kadarki context'i bilir  
▸ Sınırsız iç içe dallanma
▸ React Flow ile ağaç görünümü
▸ %100 client-side, API key tarayıcıda kalır
▸ OpenAI / Anthropic / Google / OpenRouter

Stack: React + TS + Tailwind + Zustand + React Flow

Açık kaynak. Link yorumda. Ne düşünürsünüz?

#AI #React #OpenSource
```

---

### Görsel Önerisi

Posta mutlaka görsel ekle. En iyi seçenekler (etki sırasına göre):

1. **15-30 sn ekran kaydı (GIF/MP4)** — bir cevaptan branch açıp ağaca bakma akışı. En yüksek etkileşimi bu alır.
2. **TreeView ekran görüntüsü** — dallanmış bir konuşmanın görsel haritası. Hemen "ne işe yarıyor" anlaşılır.
3. **Yan yana 2 ekran** — solda normal chat, sağda branch panel. "Before/after" hissi verir.

### Yayınlama İpuçları

- **Saat:** Salı-Perşembe, 09:00-11:00 (TR saati) en iyi sonucu verir
- **Link stratejisi:** Repo/demo linkini ana posta değil, **ilk yoruma** koy (algoritma cezası yememek için)
- **İlk 1 saat kritik:** Postu attıktan sonra arkadaşlarına haber ver, erken etkileşim algoritmayı tetikler
- **Yorumlara cevap yaz:** İlk 2 saatte gelen yorumlara mutlaka cevap ver

---

Hangi versiyonu tercih edersin? Onaylarsan seçtiğin versiyonu README'ye veya `docs/` klasörüne kaydedebilirim, ya da istersen ekran görüntüsü/GIF için TreeView'da örnek bir dallı konuşma oluşturup hazır demo veri seed'leyebilirim.