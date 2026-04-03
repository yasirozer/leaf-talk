

## Settings: Model Seçimi Geliştirmesi

Custom provider seçildiğinde Model ID alanına iki ek özellik ekliyoruz: popüler modeller listesi ve OpenRouter'a kısayol link.

### 1. Popüler Modeller Listesi
Model ID input'unun altına tıklanabilir popüler model butonları ekle. Hardcoded bir liste (haftalık güncelleme gerektirmemesi için en çok kullanılan modeller):

- `anthropic/claude-sonnet-4-20250514`
- `openai/gpt-4o`
- `google/gemini-2.5-pro`
- `deepseek/deepseek-r1`
- `meta-llama/llama-4-maverick`

Butona tıklayınca `customModelId` ve `model` otomatik dolar.

### 2. OpenRouter Kısayolu
Popüler modellerin altına "Browse all models on OpenRouter" linki ekle (ExternalLink ikonu ile). Yeni sekmede `https://openrouter.ai/models` açılır.

### Değişiklikler

**`src/components/settings/SettingsView.tsx`**
- Custom Model ID bölümüne popüler model chip'leri ekle (tıklanınca model ID'yi set eder)
- Altına OpenRouter dış link butonu ekle
- `ExternalLink` ve `Sparkles` ikonlarını import et

Tek dosya değişikliği, ek paket yok.

