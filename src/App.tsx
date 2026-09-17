import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { topics, type BodyTopic, type TopicId } from './data'

type Clip = {
  src: string
  loop: boolean
  topicId: TopicId | null
}

type IdleHook = {
  title: string
  subtitle: string
}

type VisibleClipTopic = TopicId | null | undefined

const IDLE_VIDEO = '/media/00_IDLE_LOOP.mp4'
const STORY_END_OVERLAP_SECONDS = 0.34
const DECK_RELEASE_DELAY_MS = 380
const IDLE_HOOK_DURATION_MS = 5600

const IDLE_HOOKS: IdleHook[] = [
  {
    title: 'ในร่างกายของคุณ… กำลังเกิดอะไรขึ้นอยู่ตอนนี้?',
    subtitle: 'แตะเพื่อค้นพบ',
  },
  {
    title: 'ทุกลมหายใจ ทุกความคิด ทุกจังหวะหัวใจ มีวิทยาศาสตร์อยู่เบื้องหลัง',
    subtitle: 'แตะหนึ่งจุดเพื่อเริ่มสำรวจ',
  },
  {
    title: 'สมอง หัวใจ ลำไส้ และเซลล์ กำลังทำงานพร้อมกันเสมอ',
    subtitle: 'ลองแตะดูว่าระบบไหนทำงานอย่างไร',
  },
  {
    title: 'สุขภาพ ไม่ได้มีแค่สิ่งที่มองเห็น',
    subtitle: 'แตะเพื่อมองลึกเข้าไปข้างใน',
  },
  {
    title: 'ร่างกายของเรา ซับซ้อนกว่าที่คิด',
    subtitle: 'เลือกหนึ่งจุด แล้วเริ่มเรียนรู้',
  },
  {
    title: 'ลองแตะ แล้วดูว่าข้างในร่างกายมีอะไรซ่อนอยู่',
    subtitle: 'เริ่มได้เลยด้านล่าง',
  },
]

const STORY_MEDIA: Record<TopicId, string> = {
  brain: '/media/01_BRAIN.mp4',
  heart: '/media/02_HEART.mp4',
  stomach: '/media/03_DIGESTION.mp4',
  aura: '/media/04_PUBLIC_HEALTH.mp4',
  dna: '/media/05_DNA.mp4',
}

function App() {
  const debug = useMemo(() => new URLSearchParams(window.location.search).get('debug') === '1', [])
  const [selectedId, setSelectedId] = useState<TopicId | null>(null)
  const [playKey, setPlayKey] = useState(0)
  // Start in idle even before media is available. This keeps the prototype usable
  // while the six final MP4 files are still missing from /public/media.
  const [visibleClipTopicId, setVisibleClipTopicId] = useState<VisibleClipTopic>(null)

  const selectedTopic = useMemo(
    () => topics.find((topic) => topic.id === selectedId) ?? null,
    [selectedId],
  )

  const idleUiVisible = selectedId === null && visibleClipTopicId === null
  const filmVisible = visibleClipTopicId !== undefined && visibleClipTopicId !== null
  const switching = selectedId !== visibleClipTopicId

  const selectTopic = useCallback((topic: BodyTopic) => {
    setSelectedId((current) => (current === topic.id ? null : topic.id))
    setPlayKey((value) => value + 1)
  }, [])

  const returnToIdle = useCallback(() => {
    setSelectedId(null)
    setPlayKey((value) => value + 1)
  }, [])

  const handleStoryEnd = useCallback((topicId: TopicId) => {
    setSelectedId((current) => (current === topicId ? null : current))
  }, [])

  const handleClipVisible = useCallback((topicId: TopicId | null) => {
    setVisibleClipTopicId(topicId)
  }, [])

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
        returnToIdle()
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
  }, [returnToIdle, selectTopic])

  const appStyle = {
    '--accent': selectedTopic?.accent ?? '#65e8e2',
  } as CSSProperties

  return (
    <main
      className={`exhibit video-first ${selectedTopic ? 'has-topic' : 'no-topic'} ${filmVisible ? 'film-active' : ''} ${idleUiVisible ? 'idle-ui-visible' : ''} ${switching ? 'is-switching' : ''} ${debug ? 'debug' : ''}`}
      style={appStyle}
    >
      <PreloadMediaLibrary />

      <SequencePlayer
        topic={selectedTopic}
        playKey={playKey}
        onStoryEnd={handleStoryEnd}
        onClipVisible={handleClipVisible}
      />

      <div className={`idle-ui-layer ${idleUiVisible ? 'visible' : 'hidden'}`} aria-hidden={!idleUiVisible}>
        <MinimalBrand />
        <IdleHookStory active={idleUiVisible} />
      </div>

      <PhysicalButtonRail
        selectedId={selectedId}
        visualsVisible={idleUiVisible}
        onSelect={selectTopic}
      />

      {debug && (
        <div className="debug-overlay" aria-hidden="true">
          <span>PROJECTOR SAFE</span>
          <span>1 IDLE LOOP + 5 FULLSCREEN FILMS</span>
          <span>{filmVisible ? 'FILM FULLSCREEN · TOUCH ZONES HIDDEN' : 'IDLE · 5 TOUCH ZONES VISIBLE'}</span>
          <span>VISIBLE DECK: {visibleClipTopicId === undefined ? 'BOOT' : visibleClipTopicId ?? 'IDLE'}</span>
          <span>KEY 1–5 TOGGLE · 0/ESC IDLE · F FULLSCREEN</span>
        </div>
      )}
    </main>
  )
}

function PreloadMediaLibrary() {
  useEffect(() => {
    const sources = [IDLE_VIDEO, ...topics.map((topic) => STORY_MEDIA[topic.id])]
    const keepAlive: HTMLVideoElement[] = []

    sources.forEach((src) => {
      const video = document.createElement('video')
      video.preload = 'auto'
      video.muted = true
      video.playsInline = true
      video.src = src
      video.load()
      keepAlive.push(video)
    })

    return () => {
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
  topic,
  playKey,
  onStoryEnd,
  onClipVisible,
}: {
  topic: BodyTopic | null
  playKey: number
  onStoryEnd: (topicId: TopicId) => void
  onClipVisible: (topicId: TopicId | null) => void
}) {
  const deckA = useRef<HTMLVideoElement>(null)
  const deckB = useRef<HTMLVideoElement>(null)
  const frontDeckRef = useRef<0 | 1>(0)
  const [frontDeck, setFrontDeck] = useState<0 | 1>(0)
  const [mediaVisible, setMediaVisible] = useState(false)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)

  const clip = useMemo<Clip>(() => {
    if (!topic) return { src: IDLE_VIDEO, loop: true, topicId: null }
    return { src: STORY_MEDIA[topic.id], loop: false, topicId: topic.id }
  }, [topic])

  useEffect(() => {
    const refs = [deckA.current, deckB.current] as const
    const currentDeck = frontDeckRef.current
    const nextDeck: 0 | 1 = currentDeck === 0 ? 1 : 0
    const incoming = refs[nextDeck]
    const outgoing = refs[currentDeck]
    if (!incoming) return

    let cancelled = false
    let advanced = false
    let releaseTimer: number | undefined

    incoming.pause()
    incoming.loop = clip.loop
    incoming.muted = true
    incoming.playsInline = true
    incoming.preload = 'auto'
    incoming.src = clip.src
    incoming.currentTime = 0

    const showFallbackForClip = () => {
      setFailedSrc(clip.src)
      setMediaVisible(false)
      // Treat the fallback as the currently visible clip so the rest of the
      // interaction state behaves exactly like it will with final videos.
      onClipVisible(clip.topicId)
    }

    const switchToIncoming = async () => {
      if (cancelled) return
      try {
        await incoming.play()
        if (cancelled) return

        setFailedSrc(null)
        setMediaVisible(true)
        frontDeckRef.current = nextDeck
        setFrontDeck(nextDeck)
        onClipVisible(clip.topicId)

        releaseTimer = window.setTimeout(() => {
          outgoing?.pause()
        }, DECK_RELEASE_DELAY_MS)
      } catch {
        if (cancelled) return
        showFallbackForClip()
      }
    }

    const advanceBeforeEnd = () => {
      if (cancelled || clip.loop || !clip.topicId || advanced) return
      if (!Number.isFinite(incoming.duration) || incoming.duration <= 0) return

      if (incoming.duration - incoming.currentTime <= STORY_END_OVERLAP_SECONDS) {
        advanced = true
        onStoryEnd(clip.topicId)
      }
    }

    const ended = () => {
      if (cancelled || clip.loop || !clip.topicId || advanced) return
      advanced = true
      onStoryEnd(clip.topicId)
    }

    const fail = () => {
      if (cancelled) return
      showFallbackForClip()
    }

    incoming.addEventListener('canplay', switchToIncoming, { once: true })
    incoming.addEventListener('timeupdate', advanceBeforeEnd)
    incoming.addEventListener('ended', ended, { once: true })
    incoming.addEventListener('error', fail, { once: true })
    incoming.load()

    return () => {
      cancelled = true
      if (releaseTimer !== undefined) window.clearTimeout(releaseTimer)
      incoming.removeEventListener('canplay', switchToIncoming)
      incoming.removeEventListener('timeupdate', advanceBeforeEnd)
      incoming.removeEventListener('ended', ended)
      incoming.removeEventListener('error', fail)
    }
  }, [clip.loop, clip.src, clip.topicId, onClipVisible, onStoryEnd, playKey])

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

function MinimalBrand() {
  return (
    <header className="minimal-brand" aria-hidden="true">
      <span>SCIENCE FOR HEALTH · KHON KAEN</span>
      <i />
      <strong>INSIDE YOUR BODY</strong>
    </header>
  )
}

function IdleHookStory({ active }: { active: boolean }) {
  const [hookIndex, setHookIndex] = useState(0)
  const hook = IDLE_HOOKS[hookIndex]

  useEffect(() => {
    if (!active) {
      setHookIndex(0)
      return
    }

    const timer = window.setInterval(() => {
      setHookIndex((current) => (current + 1) % IDLE_HOOKS.length)
    }, IDLE_HOOK_DURATION_MS)

    return () => window.clearInterval(timer)
  }, [active])

  return (
    <div className="minimal-idle-copy idle-hook-copy" key={`${active ? 'on' : 'off'}-${hookIndex}`}>
      <h1>{hook.title}</h1>
      <p>
        <span className="idle-hook-dot" aria-hidden="true" />
        {hook.subtitle}
      </p>
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
  visualsVisible,
  onSelect,
}: {
  selectedId: TopicId | null
  visualsVisible: boolean
  onSelect: (topic: BodyTopic) => void
}) {
  return (
    <nav
      className={`button-rail minimal-button-rail ${visualsVisible ? 'interaction-visible' : 'interaction-concealed'}`}
      aria-label="ปุ่มเลือกเนื้อหา 5 จุด"
    >
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
            aria-label={active ? `${topic.nameTh} — แตะซ้ำเพื่อกลับหน้าหลัก` : `เปิด ${topic.nameTh}`}
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