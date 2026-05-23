// SettingsView — Leaf Talk UI Kit
function SettingsView({ settings, onSave }) {
  const [form, setForm] = React.useState(settings || {
    provider: 'openai', model: 'gpt-4o', apiKey: '', baseUrl: '',
  });
  const providers = [
    { id: 'openai', label: 'OpenAI' },
    { id: 'anthropic', label: 'Anthropic' },
    { id: 'google', label: 'Google' },
    { id: 'custom', label: 'Custom (OpenRouter, etc.)' },
  ];
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'hsl(220 14% 92%)', margin: '0 0 20px', fontFamily: 'Inter, sans-serif' }}>Settings</h2>

        <Section title="Provider">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {providers.map(p => (
              <button key={p.id} onClick={() => set('provider', p.id)} style={{
                padding: '8px 12px', borderRadius: 8, border: `1px solid ${form.provider === p.id ? 'hsl(142 60% 50% / 0.4)' : 'hsl(220 14% 18%)'}`,
                background: form.provider === p.id ? 'hsl(142 60% 50% / 0.10)' : 'hsl(220 14% 14%)',
                color: form.provider === p.id ? 'hsl(142 60% 50%)' : 'hsl(220 14% 70%)',
                cursor: 'pointer', fontSize: 12, fontFamily: 'Inter, sans-serif', fontWeight: 500,
                textAlign: 'left', transition: 'all 150ms',
              }}>{p.label}</button>
            ))}
          </div>
        </Section>

        <Section title="API Key">
          <SettingsInput
            type="password" placeholder="sk-..." value={form.apiKey}
            onChange={v => set('apiKey', v)}
          />
        </Section>

        <Section title="Model">
          <SettingsInput placeholder="e.g. gpt-4o" value={form.model} onChange={v => set('model', v)} mono />
        </Section>

        {form.provider === 'custom' && (
          <Section title="Base URL">
            <SettingsInput placeholder="https://openrouter.ai/api/v1" value={form.baseUrl} onChange={v => set('baseUrl', v)} mono />
          </Section>
        )}

        <button onClick={() => onSave && onSave(form)} style={{
          marginTop: 8, padding: '8px 20px', borderRadius: 8, border: 'none',
          background: 'hsl(142 60% 50%)', color: 'hsl(220 14% 6%)',
          cursor: 'pointer', fontSize: 12, fontWeight: 500, fontFamily: 'Inter, sans-serif',
          transition: 'opacity 150ms',
        }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >Save Settings</button>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'hsl(220 14% 45%)', marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );
}

function SettingsInput({ type = 'text', placeholder, value, onChange, mono }) {
  return (
    <input type={type} placeholder={placeholder} value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%', background: 'hsl(220 14% 14%)', border: '1px solid hsl(220 14% 18%)',
        borderRadius: 8, padding: '7px 10px', fontSize: 12, color: 'hsl(220 14% 92%)',
        fontFamily: mono ? 'JetBrains Mono, monospace' : 'Inter, sans-serif',
        outline: 'none', boxSizing: 'border-box', transition: 'border-color 150ms',
      }}
      onFocus={e => e.target.style.borderColor = 'hsl(142 60% 50% / 0.5)'}
      onBlur={e => e.target.style.borderColor = 'hsl(220 14% 18%)'}
    />
  );
}

Object.assign(window, { SettingsView, Section, SettingsInput });
