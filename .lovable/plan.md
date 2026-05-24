Sorun: Branch panel fullscreen butonu mevcut layout içinde kalıyor; bu yüzden gerçek tüm ekranı kapatmıyor ve sağda boşluk bırakıyor. Ayrıca branch açılınca ana chat paneli bölünüyor, bu da mesaj input’unu yukarı taşıyor.

Plan:

1. `src/pages/Index.tsx` layout’unu değiştir
   - `ResizablePanelGroup`, `ResizablePanel`, `ResizableHandle` kullanımını kaldır.
   - Ana chat her zaman tam genişlikte render edilecek.
   - Branch panel normal modda sağdan overlay/drawer olarak açılacak.
   - Fullscreen modda branch panel `fixed inset-0 z-50` ile tüm viewport’u kaplayacak; sidebar ve topbar dahil hiçbir boşluk kalmayacak.

2. `src/components/branch/BranchPanel.tsx` kök kapsayıcısını tam alan dolduracak hale getir
   - Root class `h-full w-full flex flex-col ...` olacak.
   - Header ve input sabit, mesaj alanı kalan yüksekliği düzgün kullanacak.
   - Büyüt/küçült butonu aynı store state’i ile çalışmaya devam edecek.

3. `src/components/chat/MainChat.tsx` panel yüksekliğini stabilize et
   - Ana chat branch açıldığında bölünmeyeceği için input artık yukarı taşınmayacak.
   - Gerekirse root container `h-full w-full flex flex-col min-w-0` yapılarak input altta kalacak.

4. Kontrol
   - Branch normal mod: sağdan overlay olarak görünür, ana chat yerinde kalır.
   - Fullscreen: branch tüm ekranı kaplar, sağ boşluk kalmaz.
   - Küçült: tekrar sağ overlay moduna döner.
   - Kapat: branch panel kapanır ve ana chat normal kalır.