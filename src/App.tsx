import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { topics, type BodyTopic, type TopicId } from './data'

type Phase = 'idle' | 'entering' | 'active' | 'exiting'

type MediaSet = {
  in: string
  loop: string
  out: string
}

type Caption = {
  title: string
  fact: string
}

const IDLE_VIDEO = '/media/00_IDLE_LOOP.mp4'
const SEGMENT_OVERLAP_SECONDS = 0.16

const TOPIC_MEDIA: Record<TopicId, MediaSet> = {
  brain: {
    in: '/media/01_BRAIN_IN.mp4',
    loop: '/media/01_BRAIN_LOOP.mp4',
    out: '/media/01_BRAIN_OUT.mp4',
  },
  heart: {
    in: '/media/02_HEART_IN.mp4',
    loop: '/media/02_HEART_LOOP.mp4',
    out: '/media/02_HEART_OUT.mp4',
  },
  stomach: {
    in: '/media/03_DIGESTION_IN.mp4',
    loop: '/media/03_DIGESTION_LOOP.mp4',
    out: '/media/03_DIGESTION_OUT.mp4',
  },
  aura: {
    in: '/media/04_PUBLIC_HEALTH_IN.mp4',
    loop: '/media/04_PUBLIC_HEALTH_LOOP.mp4',
    out: '/media/04_PUBLIC_HEALTH_OUT.mp4',
  },
  dna: {
    in: '/media/05_DNA_IN.mp4',
    loop: '/media/05_DNA_LOOP.mp4',
    out: '/media/05_DNA_OUT.mp4',
  },
}

const VIDEO_CAPTIONS: Record<TopicId, Caption> = {
  brain: {
    title: 'สมองกำลังคุยกับทั้งร่างกาย',
    fact: 'การนอนที่เพียงพอช่วยให้สมองพร้อมเรียนรู้ จดจำ และจัดการอารมณ์',
  },
  heart: {
    title: 'ทุกจังหวะ ส่งชีวิตไปทั่วร่างกาย',
    fact: 'หัวใจสูบเลือดเพื่อนำออกซิเจนและสารอาหารไปยังเซลล์ทั่วร่างกาย',
  },
  stomach: {
    title: 'อาหารกำลังกลายเป็นพลังงาน',
    fact: 'สารอาหารจากอาหารถูกดูดซึมเข้าสู่ร่างกายส่วนใหญ่ที่ลำไส้เล็ก',
  },
  aura: {
    title: 'สุขภาพไม่ได้เกิดขึ้นจากเราคนเดียว',
    fact: 'มือ น้ำ อากาศ สิ่งแวดล้อม และคนรอบตัว ล้วนเชื่อมโยงกับสุขภาพของเรา',
  },
  dna: {
    title: 'จากร่างกาย สู่เซลล์ สู่ DNA',
    fact: 'DNA เก็บคำสั่งที่เซลล์ใช้สร้างโปรตีนและควบคุมการทำงานจำนวนมากในร่างกาย',
  },
}

function App() {
  const debug = useMemo(() => new URLSearchParams(window.location.search).get('debug') === '1', [])
  const [selectedId, setSelectedId] = useState<TopicId | null>(null)
  const [pendingId, setPendingId] = useState<TopicId | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')
  const [sessionKey, setSessionKey] = useState(0)

  const selectedTopic = useMemo(
    () => topics.find((topic) => topic.id === selectedId) ?? null,
    [selectedId],
  )

  const selectTopic = useCallback((topic: BodyTopic) => {
    setSessionKey((value) => value + 1)

    if (!selectedId) {
      setPendingId(null)
      setSelectedId(topic.id)
      setPhase('entering')
      return
    }

    if (selectedId === topic.id) {
      if (phase === 'exiting') setPhase('entering')
      return
    }

    // Never hard-cut from one body system to another.
    // Finish the current OUT clip first, then enter the next topic.
    setPendingId(topic.id)
    setPhase('exiting')
  }, [phase, selectedId])

  const requestReset = useCallback(() => {
    setPendingId(null)
    if (!selectedId) {
      setPhase('idle')
      return
    }
    setPhase('exiting')
  }, [selectedId])

  const finishSegment = useCallback(() => {
    if (phase === 'entering') {
      setPhase('active')
      return
    }

    if (phase === 'exiting') {
      if (pendingId) {
        const next = pendingId
        setPendingId(null)
        setSelectedId(next)
        setPhase('entering')
        setSessionKey((value) => value + 1)
      } else {
        setSelectedId(null)
        setPhase('idle')
      }
    }
  }, [pendingId, phase])

  useEffect(() => {
    if (phase !== 'active' || !selectedTopic) return
    const timer = window.setTimeout(requestReset, 36000)
    return () => window.clearTimeout(timer)
  }, [phase, requestReset, selectedTopic, sessionKey])

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
        requestReset()
        return
      }

      if (event.key.toLowerCase() === 'f') {
        event.preventDefault()
        try {
          if (document.fullscreenElement) await document.exitFullscreen()
          else await document.documentElement.requestFullscreen()
        } catch {
          // Fullscreen can be restricted by kiosk/browser policy.
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [requestReset, selectTopic])

  const appStyle = {
    '--accent': selectedTopic?.accent ?? '#65e8e2',
  } as CSSProperties

  return (
    <main
      className={`exhibit video-first phase-${phase} ${selectedTopic ? 'has-topic' : 'no-topic'} ${debug ? 'debug' : ''}`}
      style={appStyle}
    >
      <PreloadMediaLibrary />

      <SequencePlayer
        phase={phase}
        topic={selectedTopic}
        onSegmentEnd={finishSegment}
      />

      <MinimalBrand topic={selectedTopic} />
      <MinimalStory topic={selectedTopic} phase={phase} />
      <PhysicalButtonRail selectedId={selectedId} onSelect={selectTopic} />

      {debug && (
        <div className="debug-overlay" aria-hidden="true">
          <span>PROJECTOR SAFE</span>
          <span>VIDEO-FIRST · A/B DECK · 160ms OVERLAP</span>
          <span>SHARED REACH ZONE</span>
          <span>KEY 1–5 · 0/ESC RETURN · F FULLSCREEN</span>
        </div>
      )}
    </main>
  )
}

function PreloadMediaLibrary() {
  useEffect(() => {
    const critical = [IDLE_VIDEO, ...topics.map((topic) => TOPIC_MEDIA[topic.id].in)]
    const secondary = topics.flatMap((topic) => [TOPIC_MEDIA[topic.id].loop, TOPIC_MEDIA[topic.id].out])
    const keepAlive: HTMLVideoElement[] = []

    const preload = (src: string) => {
      const video = document.createElement('video')
      video.preload = 'auto'
      video.muted = true
      video.playsInline = true
      video.src = src
      video.load()
      keepAlive.push(video)
    }

    critical.forEach(preload)
    const timer = window.setTimeout(() => secondary.forEach(preload), 700)

    return () => {
      window.clearTimeout(timer)
      keepAlive.forEach((video) => {
        video.pause()
        video.removeAttribute('src')
        video.load()
      })
    }
  }, [])

  return null
}

function SequencePlayer({
  phase,
  topic,
  onSegmentEnd,
}: {
  phase: Phase
  topic: BodyTopic | null
  onSegmentEnd: () => void
}) {
  const deckA = useRef<HTMLVideoElement>(null)
  const deckB = useRef<HTMLVideoElement>(null)
  const frontDeckRef = useRef<0 | 1>(0)
  const [frontDeck, setFrontDeck] = useState<0 | 1>(0)
  const [mediaVisible, setMediaVisible] = useState(false)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  const clip = useMemo(() => {
    if (!topic || phase === 'idle') return { src: IDLE_VIDEO, loop: true }
    const media = TOPIC_MEDIA[topic.id]
    if (phase === 'entering') return { src: media.in, loop: false }
    if (phase === 'exiting') return { src: media.out, loop: false }
    return { src: media.loop, loop: true }
  }, [phase, topic])

  useEffect(() => {
    const refs = [deckA.current, deckB.current] as const
    const currentDeck = frontDeckRef.current
    const nextDeck: 0 | 1 = currentDeck === 0 ? 1 : 0
    const incoming = refs[nextDeck]
    const outgoing = refs[currentDeck]
    if (!incoming) return

    let cancelled = false
    let fallbackTimer = 0
    let advanced = false

    incoming.pause()
    incoming.loop = clip.loop
    incoming.muted = true
    incoming.playsInline = true
    incoming.preload = 'auto'
    incoming.src = clip.src
    incoming.currentTime = 0

    const advanceBeforeEnd = () => {
      if (cancelled || clip.loop || advanced) return
      if (!Number.isFinite(incoming.duration) || incoming.duration <= 0) return

      const remaining = incoming.duration - incoming.currentTime
      if (remaining <= SEGMENT_OVERLAP_SECONDS) {
        advanced = true
        onSegmentEnd()
      }
    }

    const reveal = async () => {
      if (cancelled) return
      try {
        await incoming.play()
        if (cancelled) return

        setFailedSrc(null)
        setMediaVisible(true)
        frontDeckRef.current = nextDeck
        setFrontDeck(nextDeck)

        // Keep both decoders alive briefly so segment boundaries overlap instead of flashing black.
        window.setTimeout(() => outgoing?.pause(), 260)
      } catch {
        setFailedSrc(clip.src)
        setMediaVisible(false)
        if (!clip.loop) fallbackTimer = window.setTimeout(onSegmentEnd, 650)
      }
    }

    const fail = () => {
      if (cancelled) return
      setFailedSrc(clip.src)
      setMediaVisible(false)
      if (!clip.loop) fallbackTimer = window.setTimeout(onSegmentEnd, 650)
    }

    const ended = () => {
      if (!cancelled && !clip.loop && !advanced) {
        advanced = true
        onSegmentEnd()
      }
    }

    incoming.addEventListener('canplay', reveal, { once: true })
    incoming.addEventListener('timeupdate', advanceBeforeEnd)
    incoming.addEventListener('error', fail, { once: true })
    incoming.addEventListener('ended', ended, { once: true })
    incoming.load()

    return () => {
      cancelled = true
      window.clearTimeout(fallbackTimer)
      incoming.removeEventListener('canplay', reveal)
      incoming.removeEventListener('timeupdate', advanceBeforeEnd)
      incoming.removeEventListener('error', fail)
      incoming.removeEventListener('ended', ended)
    }
  }, [clip.loop, clip.src, onSegmentEnd])

  return (
    <div className={`cinema-layer ${mediaVisible ? 'media-visible' : 'media-fallback'}`}>
      <video ref={deckA} className={`video-deck ${frontDeck === 0 && mediaVisible ? 'front' : ''}`} />
      <video ref={deckB} className={`video-deck ${frontDeck === 1 && mediaVisible ? 'front' : ''}`} />
      <div className="video-vignette" />
      {!mediaVisible && <FallbackBody active={Boolean(topic)} topic={topic} />}
      {failedSrc && <span className="media-missing" aria-hidden="true">MEDIA PLACEHOLDER</span>}
    </div>
  )
}

function MinimalBrand({ topic }: { topic: BodyTopic | null }) {
  return (
    <header className="minimal-brand" aria-hidden="true">
      <span>SCIENCE FOR HEALTH · KHON KAEN</span>
      <i />
      <strong>{topic ? topic.nameEn : 'INSIDE YOUR BODY'}</strong>
    </header>
  )
}

function MinimalStory({ topic, phase }: { topic: BodyTopic | null; phase: Phase }) {
  if (!topic) {
    return (
      <div className="minimal-idle-copy">
        <h1>แตะหนึ่งปุ่ม แล้วมองเข้าไปในร่างกาย</h1>
        <p>ร่างกายหนึ่งร่าง · หลายระบบที่ทำงานพร้อมกัน</p>
      </div>
    )
  }

  if (phase !== 'active') {
    return (
      <div className="transition-caption">
        <span>0{topic.number}</span>
        <strong>{phase === 'exiting' ? 'ทุกระบบเชื่อมถึงกัน' : topic.nameTh}</strong>
      </div>
    )
  }

  const caption = VIDEO_CAPTIONS[topic.id]

  return (
    <div className="minimal-caption" key={topic.id}>
      <small>{topic.nameTh}</small>
      <h2>{caption.title}</h2>
      <p>{caption.fact}</p>
      <span className="minimal-stat">{topic.stat}</span>
    </div>
  )
}

function FallbackBody({ active, topic }: { active: boolean; topic: BodyTopic | null }) {
  return (
    <div className={`fallback-stage ${active ? 'active' : ''}`}>
      <div className="body-orbit orbit-one" />
      <div className="body-orbit orbit-two" />
      <svg className="fallback-body" viewBox="0 0 360 640" aria-label="ภาพจำลองร่างกายมนุษย์">
        <defs>
          <linearGradient id="bodyGlass" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#d8fffc" stopOpacity=".3" />
            <stop offset="1" stopColor="#55ddd7" stopOpacity=".035" />
          </linearGradient>
        </defs>
        <ellipse className="fallback-aura" cx="180" cy="320" rx="132" ry="286" />
        <circle className="fallback-fill" cx="180" cy="78" r="42" />
        <path className="fallback-fill" d="M139 132 Q180 116 221 132 L249 244 Q258 292 239 350 L222 414 L215 575 Q212 610 187 614 H173 Q148 610 145 575 L138 414 L121 350 Q102 292 111 244 Z" />
        <path className="fallback-line" d="M126 160 Q84 220 69 350 Q66 378 83 389 Q98 395 108 360 L135 256" />
        <path className="fallback-line" d="M234 160 Q276 220 291 350 Q294 378 277 389 Q262 395 252 360 L225 256" />
        <path className="fallback-line" d="M159 408 Q140 498 140 604 M201 408 Q220 498 220 604" />
        <g className="fallback-organs">
          <path className={topic?.id === 'brain' ? 'brain selected' : 'brain'} d="M153 78 C154 53 184 48 194 62 C213 61 218 86 203 97 C187 108 161 102 153 78Z" />
          <path className={topic?.id === 'heart' ? 'heart selected' : 'heart'} d="M180 231 C161 207 134 224 142 247 C150 270 180 287 180 287 C180 287 210 270 218 247 C226 224 199 207 180 231Z" />
          <path className={topic?.id === 'stomach' ? 'gut selected' : 'gut'} d="M184 319 C209 314 219 335 205 353 C197 366 198 385 177 391 C154 398 139 381 146 362 C153 343 166 334 164 314" />
          <path className={topic?.id === 'dna' ? 'dna selected' : 'dna'} d="M241 423 C287 450 287 492 241 520 C195 548 195 590 241 617 M277 423 C231 450 231 492 277 520 C323 548 323 590 277 617" />
        </g>
      </svg>
      <div className="fallback-floor" />
    </div>
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
    <nav className="button-rail minimal-button-rail" aria-label="ปุ่มเลือกเนื้อหา 5 จุด">
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