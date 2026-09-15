import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import { topics, type BodyTopic, type TopicId } from './data'

const IDLE_PROMPTS = [
  'แตะ 5 จุด แล้วค้นพบว่าวิทยาศาสตร์สุขภาพดูแลเราอย่างไร',
  'ร่างกายหนึ่งร่าง ดูแลด้วยวิทยาศาสตร์สุขภาพหลายสาขา',
  'เริ่มจากสิ่งที่เรารู้สึก ไปจนถึงสิ่งที่มองไม่เห็นด้วยตาเปล่า',
] as const

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

function App() {
  const debug = useMemo(() => new URLSearchParams(window.location.search).get('debug') === '1', [])
  const [selectedId, setSelectedId] = useState<TopicId | null>(null)
  const [runKey, setRunKey] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [idlePromptIndex, setIdlePromptIndex] = useState(0)

  const selectedTopic = useMemo(
    () => topics.find((topic) => topic.id === selectedId) ?? null,
    [selectedId],
  )

  const reset = useCallback(() => {
    setSelectedId(null)
    setElapsed(0)
  }, [])

  const selectTopic = useCallback((topic: BodyTopic) => {
    setSelectedId(topic.id)
    setElapsed(0)
    setRunKey((value) => value + 1)
  }, [])

  useEffect(() => {
    if (selectedTopic) return
    const timer = window.setInterval(() => {
      setIdlePromptIndex((value) => (value + 1) % IDLE_PROMPTS.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [selectedTopic])

  useEffect(() => {
    if (!selectedTopic) return

    const startedAt = performance.now()
    const timer = window.setInterval(() => {
      const seconds = (performance.now() - startedAt) / 1000
      setElapsed(Math.min(seconds, selectedTopic.duration))

      if (seconds >= selectedTopic.duration + 2.5) {
        window.clearInterval(timer)
        reset()
      }
    }, 100)

    return () => window.clearInterval(timer)
  }, [selectedTopic, runKey, reset])

  useEffect(() => {
    const onKeyDown = async (event: KeyboardEvent) => {
      if (event.repeat) return

      const numeric = Number(event.key)
      if (numeric >= 1 && numeric <= 5) {
        event.preventDefault()
        selectTopic(topics[numeric - 1])
        return
      }

      if (event.key === 'Escape' || event.key === '0' || event.code === 'Numpad0') {
        event.preventDefault()
        reset()
        return
      }

      if (event.key.toLowerCase() === 'f') {
        event.preventDefault()
        try {
          if (document.fullscreenElement) await document.exitFullscreen()
          else await document.documentElement.requestFullscreen()
        } catch {
          // Fullscreen can be blocked by browser kiosk policy.
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [reset, selectTopic])

  const stepIndex = useMemo(() => {
    if (!selectedTopic) return -1
    const index = selectedTopic.steps.findIndex((step) => elapsed >= step.start && elapsed < step.end)
    return index === -1 ? selectedTopic.steps.length - 1 : index
  }, [elapsed, selectedTopic])

  const currentStep = selectedTopic && stepIndex >= 0 ? selectedTopic.steps[stepIndex] : null
  const progress = selectedTopic ? clamp((elapsed / selectedTopic.duration) * 100, 0, 100) : 0

  const appStyle = {
    '--accent': selectedTopic?.accent ?? '#61e9e3',
  } as CSSProperties

  return (
    <main className={`projection-shell ${debug ? 'debug' : ''}`} style={appStyle}>
      <AmbientBackground />

      <section className="safe-frame">
        <Header selectedTopic={selectedTopic} progress={progress} elapsed={elapsed} />

        <div className="experience-grid">
          <InfoPanel topic={selectedTopic} />

          <BodyStage
            selectedTopic={selectedTopic}
            onSelect={selectTopic}
            currentStep={stepIndex}
          />

          <StoryPanel
            topic={selectedTopic}
            currentStep={currentStep}
            stepIndex={stepIndex}
            elapsed={elapsed}
            idlePrompt={IDLE_PROMPTS[idlePromptIndex]}
          />
        </div>

        <TopicSelector selectedId={selectedId} onSelect={selectTopic} />

        {debug && (
          <div className="debug-tag">
            SAFE AREA 4:3 · KEY 1–5 · ESC RESET · F FULLSCREEN
          </div>
        )}
      </section>
    </main>
  )
}

function Header({ selectedTopic, progress, elapsed }: { selectedTopic: BodyTopic | null; progress: number; elapsed: number }) {
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div>
          <p>SCIENCE FOR HEALTH</p>
          <h1>5 MY BODY</h1>
        </div>
      </div>

      <div className="topbar-center">
        <span className="micro-label">INTERACTIVE PROJECTION</span>
        <strong>{selectedTopic ? selectedTopic.fieldEn : 'สุขภาพสำคัญอย่างไร'}</strong>
      </div>

      <div className="sequence-status">
        {selectedTopic ? (
          <>
            <div className="timecode">{elapsed.toFixed(1)} / {selectedTopic.duration}s</div>
            <div className="top-progress"><span style={{ width: `${progress}%` }} /></div>
          </>
        ) : (
          <div className="idle-status"><span /> READY TO TOUCH</div>
        )}
      </div>
    </header>
  )
}

function InfoPanel({ topic }: { topic: BodyTopic | null }) {
  if (!topic) {
    return (
      <aside className="side-panel info-panel idle-info">
        <p className="eyebrow">ONE BODY · FIVE SCIENCES</p>
        <h2>ร่างกายหนึ่งร่าง<br />มองได้หลายมิติ</h2>
        <p className="body-copy">
          เข้าใจ ดูแล ป้องกัน วินิจฉัย รักษา และฟื้นฟู ผ่าน 5 มุมมองของวิทยาศาสตร์สุขภาพ
        </p>
        <div className="science-stack">
          {topics.map((item) => (
            <div key={item.id} className="science-line" style={{ '--line-accent': item.accent } as CSSProperties}>
              <span>{String(item.number).padStart(2, '0')}</span>
              <div><strong>{item.fieldTh}</strong><small>{item.fieldEn}</small></div>
            </div>
          ))}
        </div>
      </aside>
    )
  }

  return (
    <aside className="side-panel info-panel active-info" key={topic.id}>
      <div className="topic-number">0{topic.number}</div>
      <p className="eyebrow">{topic.nameEn}</p>
      <h2>{topic.nameTh}</h2>
      <div className="field-chip">{topic.fieldEn}</div>
      <h3>{topic.fieldTh}</h3>
      <p className="body-copy">{topic.learningGoal}</p>
      <div className="duration-card">
        <span>SEQUENCE</span>
        <strong>{topic.duration} SEC</strong>
      </div>
      <div className="closing-card">
        <span>KEY MESSAGE</span>
        <p>{topic.closing}</p>
      </div>
    </aside>
  )
}

function StoryPanel({
  topic,
  currentStep,
  stepIndex,
  elapsed,
  idlePrompt,
}: {
  topic: BodyTopic | null
  currentStep: BodyTopic['steps'][number] | null
  stepIndex: number
  elapsed: number
  idlePrompt: string
}) {
  if (!topic || !currentStep) {
    return (
      <aside className="side-panel story-panel idle-story">
        <p className="eyebrow">HOW TO PLAY</p>
        <div className="touch-orbit" aria-hidden="true"><span>✦</span></div>
        <h2 key={idlePrompt}>{idlePrompt}</h2>
        <p>แตะจุดบนร่างกาย หรือเลือกปุ่มด้านล่าง</p>
        <div className="hint-row">
          <span>TOUCH</span><i />
          <span>LEARN</span><i />
          <span>DISCOVER</span>
        </div>
      </aside>
    )
  }

  return (
    <aside className="side-panel story-panel active-story" key={`${topic.id}-${stepIndex}`}>
      <div className="story-head">
        <div>
          <p className="eyebrow">LIVE SEQUENCE</p>
          <strong>STEP {stepIndex + 1} / {topic.steps.length}</strong>
        </div>
        <div className="step-time">{Math.floor(elapsed)}s</div>
      </div>

      <div className="step-label">{currentStep.label}</div>
      <h2>{currentStep.narration}</h2>
      <p className="visual-note"><span>VISUAL</span>{currentStep.visual}</p>

      <div className="timeline-list">
        {topic.steps.map((step, index) => {
          const active = index === stepIndex
          const completed = elapsed >= step.end
          return (
            <div key={`${topic.id}-${index}`} className={`timeline-item ${active ? 'active' : ''} ${completed ? 'completed' : ''}`}>
              <span className="timeline-dot" />
              <div>
                <small>{step.start}–{step.end}s</small>
                <strong>{step.label}</strong>
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

function BodyStage({
  selectedTopic,
  onSelect,
  currentStep,
}: {
  selectedTopic: BodyTopic | null
  onSelect: (topic: BodyTopic) => void
  currentStep: number
}) {
  return (
    <section className={`body-stage ${selectedTopic ? `mode-${selectedTopic.id}` : 'mode-idle'}`}>
      <div className="body-halo halo-one" />
      <div className="body-halo halo-two" />
      <div className="floor-ring" />

      <svg className="human-visual" viewBox="0 0 420 650" role="img" aria-label="ภาพร่างกายมนุษย์สำหรับเลือก 5 จุดเรียนรู้">
        <defs>
          <linearGradient id="bodyFill" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#d9fffb" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#56c9d3" stopOpacity="0.05" />
          </linearGradient>
          <filter id="softGlow"><feGaussianBlur stdDeviation="8" /></filter>
        </defs>

        <ellipse className="svg-aura aura-outer" cx="210" cy="322" rx="158" ry="292" />
        <ellipse className="svg-aura aura-inner" cx="210" cy="322" rx="132" ry="270" />

        <circle className="body-fill" cx="210" cy="82" r="45" />
        <path className="body-fill" d="M165 135 Q210 118 255 135 L286 252 Q292 292 274 340 L254 420 L245 578 Q242 616 216 620 L210 620 L204 620 Q178 616 175 578 L166 420 L146 340 Q128 292 134 252 Z" />
        <path className="limb-line" d="M154 162 Q104 226 84 346 Q78 380 93 391 Q108 398 120 365 L153 264" />
        <path className="limb-line" d="M266 162 Q316 226 336 346 Q342 380 327 391 Q312 398 300 365 L267 264" />
        <path className="limb-line" d="M188 405 Q166 500 166 604" />
        <path className="limb-line" d="M232 405 Q254 500 254 604" />
        <path className="body-centerline" d="M210 132 L210 600" />

        <g className="organ brain-organ">
          <ellipse cx="210" cy="80" rx="31" ry="24" />
          <path d="M185 80 C192 54 228 52 236 77 C242 98 222 105 210 99 C194 108 180 97 185 80Z" />
          <path className="signal" d="M176 83 Q150 72 130 88 T88 82" />
          <path className="signal" d="M244 82 Q271 67 292 86 T334 77" />
        </g>

        <g className="organ heart-organ">
          <path d="M210 230 C186 198 150 222 160 252 C169 281 210 302 210 302 C210 302 251 281 260 252 C270 222 234 198 210 230Z" />
          <path className="pulse-line" d="M102 255 H158 L175 231 L193 278 L210 245 L225 258 H320" />
        </g>

        <g className="organ stomach-organ">
          <path d="M217 320 C246 313 253 336 241 355 C232 370 232 392 208 398 C183 405 163 386 170 365 C177 344 190 335 190 311 C190 300 205 302 210 311Z" />
          <path className="digest-line" d="M198 401 C176 420 188 444 212 443 C238 442 242 466 219 480 C195 495 174 478 183 459" />
        </g>

        <g className="organ dna-organ">
          <path className="dna-left" d="M290 420 C342 448 342 500 290 528 C238 556 238 608 290 630" />
          <path className="dna-right" d="M334 420 C282 448 282 500 334 528 C386 556 386 608 334 630" />
          <path d="M299 435 H325 M286 462 H338 M282 490 H342 M290 518 H334 M300 545 H324 M286 574 H338 M289 603 H335" />
        </g>

        <g className="micro-particles">
          {Array.from({ length: 12 }).map((_, index) => {
            const x = 55 + ((index * 73) % 320)
            const y = 120 + ((index * 97) % 430)
            const r = 2 + (index % 3)
            return <circle key={index} cx={x} cy={y} r={r} />
          })}
        </g>
      </svg>

      <div className="body-caption">
        <span>{selectedTopic ? `0${selectedTopic.number}` : '05'}</span>
        <div>
          <strong>{selectedTopic ? selectedTopic.nameTh : 'จุดแตะ'}</strong>
          <small>{selectedTopic ? selectedTopic.nameEn : 'TOUCH POINTS'}</small>
        </div>
      </div>

      {topics.map((topic) => {
        const active = selectedTopic?.id === topic.id
        return (
          <button
            className={`hotspot hotspot-${topic.id} ${active ? 'active' : ''}`}
            key={topic.id}
            style={{
              left: `${topic.hotspot.x}%`,
              top: `${topic.hotspot.y}%`,
              '--topic-accent': topic.accent,
            } as CSSProperties}
            onClick={() => onSelect(topic)}
            aria-label={`จุดที่ ${topic.number} ${topic.nameTh}`}
          >
            <span className="hotspot-ripple" />
            <span className="hotspot-core">{topic.number}</span>
            <span className="hotspot-label"><b>{topic.nameTh}</b><small>{topic.nameEn}</small></span>
          </button>
        )
      })}

      {selectedTopic && (
        <div className="step-orbit" key={`${selectedTopic.id}-${currentStep}`}>
          <span>{currentStep + 1}</span>
        </div>
      )}
    </section>
  )
}

function TopicSelector({ selectedId, onSelect }: { selectedId: TopicId | null; onSelect: (topic: BodyTopic) => void }) {
  return (
    <nav className="topic-selector" aria-label="เลือก 5 จุดเรียนรู้">
      {topics.map((topic) => {
        const active = selectedId === topic.id
        return (
          <button
            key={topic.id}
            type="button"
            className={`topic-button ${active ? 'active' : ''}`}
            style={{ '--topic-accent': topic.accent } as CSSProperties}
            onClick={() => onSelect(topic)}
            aria-pressed={active}
          >
            <span className="topic-index">0{topic.number}</span>
            <span className="topic-copy">
              <strong>{topic.nameTh}</strong>
              <small>{topic.fieldEn}</small>
            </span>
            <span className="button-led" />
          </button>
        )
      })}
    </nav>
  )
}

function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="grid-plane" />
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <div className="scan sweep-one" />
      <div className="scan sweep-two" />
      <div className="ambient-particles">
        {Array.from({ length: 28 }).map((_, index) => <i key={index} style={{ '--i': index } as CSSProperties} />)}
      </div>
    </div>
  )
}

export default App
