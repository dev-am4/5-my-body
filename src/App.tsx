import { useCallback, useEffect, useMemo, useState, type CSSProperties } from 'react'
import { topics, type BodyTopic, type TopicId } from './data'

const IDLE_LINES = [
  'ร่างกายของเรากำลังทำอะไรอยู่ตลอดเวลา?',
  'แตะหนึ่งปุ่ม แล้วมองร่างกายให้ลึกกว่าเดิม',
  'จากสิ่งที่รู้สึกได้ ไปจนถึงสิ่งที่เล็กกว่าตาเห็น',
] as const

function App() {
  const debug = useMemo(() => new URLSearchParams(window.location.search).get('debug') === '1', [])
  const [selectedId, setSelectedId] = useState<TopicId | null>(null)
  const [idleLine, setIdleLine] = useState(0)
  const [videoFailed, setVideoFailed] = useState(false)

  const selectedTopic = useMemo(
    () => topics.find((topic) => topic.id === selectedId) ?? null,
    [selectedId],
  )

  const selectTopic = useCallback((topic: BodyTopic) => {
    setSelectedId(topic.id)
  }, [])

  const reset = useCallback(() => setSelectedId(null), [])

  useEffect(() => {
    if (selectedTopic) return
    const timer = window.setInterval(() => {
      setIdleLine((current) => (current + 1) % IDLE_LINES.length)
    }, 5200)
    return () => window.clearInterval(timer)
  }, [selectedTopic])

  useEffect(() => {
    if (!selectedTopic) return
    const timer = window.setTimeout(reset, 38000)
    return () => window.clearTimeout(timer)
  }, [selectedTopic, reset])

  useEffect(() => {
    const onKeyDown = async (event: KeyboardEvent) => {
      if (event.repeat) return

      const index = Number(event.key) - 1
      if (index >= 0 && index < topics.length) {
        event.preventDefault()
        selectTopic(topics[index])
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
          // Kiosk/browser policy may block fullscreen.
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [reset, selectTopic])

  const appStyle = {
    '--accent': selectedTopic?.accent ?? '#65e8e2',
  } as CSSProperties

  return (
    <main className={`exhibit ${selectedTopic ? 'is-active' : 'is-idle'} ${debug ? 'debug' : ''}`} style={appStyle}>
      <Ambient />

      <header className="exhibit-header">
        <div className="brand">
          <span className="brand-orbit" aria-hidden="true" />
          <div>
            <small>SCIENCE FOR HEALTH · KHON KAEN</small>
            <strong>5 MY BODY</strong>
          </div>
        </div>
        <div className="header-message">
          {selectedTopic ? `${String(selectedTopic.number).padStart(2, '0')} · ${selectedTopic.nameEn}` : 'ONE BODY · MANY SCIENCES'}
        </div>
      </header>

      <section className="main-stage">
        <BodyVideoStage
          active={Boolean(selectedTopic)}
          topic={selectedTopic}
          failed={videoFailed}
          onFail={() => setVideoFailed(true)}
        />

        {!selectedTopic ? (
          <IdleContent line={IDLE_LINES[idleLine]} />
        ) : (
          <KnowledgeContent topic={selectedTopic} />
        )}
      </section>

      <PhysicalButtonRail selectedId={selectedId} onSelect={selectTopic} />

      {debug && (
        <div className="debug-overlay" aria-hidden="true">
          <span>PROJECTOR SAFE</span>
          <span>PHYSICAL BUTTON ZONE</span>
          <span>KEY 1–5 · 0/ESC RESET · F FULLSCREEN</span>
        </div>
      )}
    </main>
  )
}

function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="mesh" />
      <div className="glow glow-a" />
      <div className="glow glow-b" />
      <div className="scan scan-a" />
      <div className="scan scan-b" />
      <div className="micro-dots">
        {Array.from({ length: 28 }).map((_, index) => (
          <i key={index} style={{ '--i': index } as CSSProperties} />
        ))}
      </div>
    </div>
  )
}

function IdleContent({ line }: { line: string }) {
  return (
    <div className="idle-copy" key={line}>
      <p>สุขภาพเริ่มจากการเข้าใจร่างกาย</p>
      <h1>{line}</h1>
      <div className="idle-instruction">
        <span className="pulse-dot" />
        <strong>กดปุ่มด้านล่างเพื่อเริ่มสำรวจ</strong>
      </div>
    </div>
  )
}

function BodyVideoStage({
  active,
  topic,
  failed,
  onFail,
}: {
  active: boolean
  topic: BodyTopic | null
  failed: boolean
  onFail: () => void
}) {
  return (
    <div className={`body-video-stage ${active ? 'rolled-aside' : ''}`}>
      <div className="body-orbit orbit-one" />
      <div className="body-orbit orbit-two" />
      <div className="body-floor" />

      {!failed ? (
        <video
          className="body-loop"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={onFail}
        >
          <source src="/media/body-loop.webm" type="video/webm" />
          <source src="/media/body-loop.mp4" type="video/mp4" />
        </video>
      ) : (
        <FallbackBody />
      )}

      {topic && (
        <div className="body-topic-tag" style={{ '--topic-accent': topic.accent } as CSSProperties}>
          <span>0{topic.number}</span>
          <div>
            <strong>{topic.nameTh}</strong>
            <small>{topic.nameEn}</small>
          </div>
        </div>
      )}

      {!topic && (
        <div className="body-center-label">
          <span>YOU</span>
          <small>หนึ่งร่างกาย · หลายระบบ</small>
        </div>
      )}
    </div>
  )
}

function FallbackBody() {
  return (
    <svg className="fallback-body" viewBox="0 0 360 640" aria-label="ภาพจำลองร่างกายมนุษย์">
      <defs>
        <linearGradient id="bodyGlass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#d8fffc" stopOpacity=".28" />
          <stop offset="1" stopColor="#55ddd7" stopOpacity=".04" />
        </linearGradient>
      </defs>
      <ellipse className="fallback-aura" cx="180" cy="320" rx="132" ry="286" />
      <circle className="fallback-fill" cx="180" cy="78" r="42" />
      <path className="fallback-fill" d="M139 132 Q180 116 221 132 L249 244 Q258 292 239 350 L222 414 L215 575 Q212 610 187 614 H173 Q148 610 145 575 L138 414 L121 350 Q102 292 111 244 Z" />
      <path className="fallback-line" d="M126 160 Q84 220 69 350 Q66 378 83 389 Q98 395 108 360 L135 256" />
      <path className="fallback-line" d="M234 160 Q276 220 291 350 Q294 378 277 389 Q262 395 252 360 L225 256" />
      <path className="fallback-line" d="M159 408 Q140 498 140 604 M201 408 Q220 498 220 604" />
      <g className="fallback-organs">
        <path className="brain" d="M153 78 C154 53 184 48 194 62 C213 61 218 86 203 97 C187 108 161 102 153 78Z" />
        <path className="heart" d="M180 231 C161 207 134 224 142 247 C150 270 180 287 180 287 C180 287 210 270 218 247 C226 224 199 207 180 231Z" />
        <path className="gut" d="M184 319 C209 314 219 335 205 353 C197 366 198 385 177 391 C154 398 139 381 146 362 C153 343 166 334 164 314" />
        <path className="dna" d="M241 423 C287 450 287 492 241 520 C195 548 195 590 241 617 M277 423 C231 450 231 492 277 520 C323 548 323 590 277 617" />
      </g>
    </svg>
  )
}

function KnowledgeContent({ topic }: { topic: BodyTopic }) {
  return (
    <article className="knowledge-panel" key={topic.id}>
      <div className="knowledge-heading">
        <div>
          <p className="eyebrow">กดแล้วรู้จริง · SCIENCE IN YOUR BODY</p>
          <h1>{topic.nameTh}</h1>
          <p className="field-name">{topic.fieldTh}</p>
        </div>
        <div className="big-stat">
          <strong>{topic.stat}</strong>
          <span>{topic.statLabel}</span>
        </div>
      </div>

      <p className="hook">{topic.hook}</p>

      <div className="knowledge-grid">
        <section className="knowledge-card">
          <span className="card-index">01</span>
          <div>
            <small>เกิดอะไรขึ้นในร่างกาย</small>
            <p>{topic.whatHappens}</p>
          </div>
        </section>
        <section className="knowledge-card">
          <span className="card-index">02</span>
          <div>
            <small>วิทยาศาสตร์สุขภาพช่วยอย่างไร</small>
            <p>{topic.scienceHelps}</p>
          </div>
        </section>
        <section className="knowledge-card try-card">
          <span className="card-index">TRY</span>
          <div>
            <small>ลองสังเกตตัวเอง</small>
            <p>{topic.tryThis}</p>
          </div>
        </section>
      </div>

      <div className="continue-path">
        <div>
          <small>จากจุดนี้ ไปเรียนรู้ต่อในนิทรรศการ</small>
          <div className="path-chips">
            {topic.nextPath.map((item, index) => (
              <span key={item}>
                {item}
                {index < topic.nextPath.length - 1 && <i>→</i>}
              </span>
            ))}
          </div>
        </div>
        <p className="source-note">{topic.sourceLabel}</p>
      </div>
    </article>
  )
}

function PhysicalButtonRail({
  selectedId,
  onSelect,
}: {
  selectedId: TopicId | null
  onSelect: (topic: BodyTopic) => void
}) {
  return (
    <nav className="button-rail" aria-label="ปุ่มเลือกเนื้อหา 5 จุด">
      {topics.map((topic) => {
        const active = selectedId === topic.id
        return (
          <button
            key={topic.id}
            type="button"
            className={`topic-button ${active ? 'active' : ''}`}
            style={{ '--button-accent': topic.accent } as CSSProperties}
            onClick={() => onSelect(topic)}
            aria-pressed={active}
          >
            <span className="button-number">0{topic.number}</span>
            <span className="button-copy">
              <strong>{topic.nameTh}</strong>
              <small>{topic.nameEn}</small>
            </span>
            <span className="physical-target" aria-hidden="true"><i /></span>
          </button>
        )
      })}
    </nav>
  )
}

export default App
