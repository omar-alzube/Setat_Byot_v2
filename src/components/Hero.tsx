import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import type { CSSProperties } from 'react';
const adVideo = 'https://res.cloudinary.com/dn9hqkleo/video/upload/v1782544512/Settat_Byoot_Ad1_V1_1_elha8q.mp4';

type IOSFullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
};

export default function Hero() {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hideTimer  = useRef<ReturnType<typeof setTimeout>>();
  const unmuteOnce = useRef(false);

  const [playing,      setPlaying]      = useState(true);
  const [muted,        setMuted]        = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [viewH,        setViewH]        = useState('100svh');
  const userPaused = useRef(false);

  // Follow the visual viewport so browser bars on iOS/Android do not leave the
  // video cropped or create an oversized hero after they expand/collapse.
  useEffect(() => {
    const update = () => {
      const height = window.visualViewport?.height ?? window.innerHeight;
      setViewH(`${Math.round(height)}px`);
    };
    update();
    window.addEventListener('resize', update);
    window.visualViewport?.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      window.visualViewport?.removeEventListener('resize', update);
    };
  }, []);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  // Pause only when hero is completely out of view; resume when back.
  // Debounce the pause so scroll-momentum on iOS doesn't briefly trigger it.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let pauseTimer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!v) return;
        if (entry.isIntersecting) {
          clearTimeout(pauseTimer);
          if (!userPaused.current) {
            v.play()
              .then(() => setPlaying(true))
              .catch(() => setPlaying(false));
          }
        } else {
          pauseTimer = setTimeout(() => {
            if (!videoRef.current?.isConnected) return;
            videoRef.current.pause();
            setPlaying(false);
          }, 300);
        }
      },
      { threshold: 0 },
    );
    observer.observe(section);
    return () => { observer.disconnect(); clearTimeout(pauseTimer); };
  }, []);

  // Keep playing/paused icon in sync with whatever the browser actually does
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay  = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener('play',  onPlay);
    v.addEventListener('pause', onPause);
    return () => {
      v.removeEventListener('play',  onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, []);

  // Unmute + set medium volume on first interaction; re-play in case unmute paused it
  useEffect(() => {
    const doUnmute = () => {
      if (unmuteOnce.current) return;
      unmuteOnce.current = true;
      const v = videoRef.current;
      if (!v) return;
      v.muted  = false;
      v.volume = 0.5;
      setMuted(false);
      if (!userPaused.current) {
        v.play().catch(() => {});
      }
    };
    // Only 'click' and 'keydown' — 'touchstart'/'pointerdown' fire during scroll
    // and would unmute the video unintentionally on mobile.
    const events = ['click', 'keydown'] as const;
    events.forEach(e => window.addEventListener(e, doUnmute, { once: true, passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, doUnmute));
  }, []);


  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      userPaused.current = true;
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    unmuteOnce.current = true; // prevent double-fire from global listener
    if (v.muted || v.volume === 0) {
      v.muted  = false;
      v.volume = 0.5;
      setMuted(false);
    } else {
      v.muted = true;
      setMuted(true);
    }
  };

  const goFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    // iPhone Safari exposes native video fullscreen through this method rather
    // than the standard Fullscreen API used by other modern browsers.
    const iosVideo = video as IOSFullscreenVideo;
    if (typeof iosVideo.webkitEnterFullscreen === 'function') {
      try {
        iosVideo.webkitEnterFullscreen();
        return;
      } catch {
        // Fall through to the standard API when native fullscreen is refused.
      }
    }

    if (video.requestFullscreen) {
      void video.requestFullscreen().catch(() => {});
      return;
    }

    if (sectionRef.current?.requestFullscreen) {
      void sectionRef.current.requestFullscreen().catch(() => {});
    }
  };

  const revealControls = () => {
    setShowControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  const hideControls = () => {
    clearTimeout(hideTimer.current);
    setShowControls(false);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={revealControls}
      onMouseEnter={revealControls}
      onMouseLeave={hideControls}
      onTouchStart={revealControls}
      className="hero-video-section"
      style={{ position: 'relative', height: viewH, width: '100%', overflow: 'hidden' }}
    >
      <video
        ref={videoRef}
        src={adVideo}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="hero-video"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
        }}
      />

      {/* Controls overlay */}
      <div
        className="hero-controls"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          zIndex: 10,
          padding: '48px 32px 28px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      >
        <CtrlBtn onClick={togglePlay} label={playing ? 'Pause' : 'Play'}>
          {playing ? <Pause size={18} /> : <Play size={18} fill="white" />}
        </CtrlBtn>

        <CtrlBtn onClick={toggleMute} label={muted ? 'Unmute' : 'Mute'}>
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </CtrlBtn>

        <div style={{ flex: 1 }} />

        <CtrlBtn onClick={goFullscreen} label="Fullscreen">
          <Maximize size={18} />
        </CtrlBtn>
      </div>

      <style>{`
        .hero-video-section {
          background:
            radial-gradient(circle at center, rgba(10, 74, 74, 0.28), transparent 62%),
            #050909;
        }

        .hero-video {
          object-fit: cover;
          object-position: center;
        }

        .hero-control-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }

        /* Phones and tablets show the complete frame instead of cropping it. */
        @media (max-width: 900px) {
          .hero-video {
            object-fit: contain;
          }

          .hero-controls {
            opacity: 1 !important;
            pointer-events: auto !important;
            padding:
              52px max(18px, env(safe-area-inset-right))
              calc(18px + env(safe-area-inset-bottom))
              max(18px, env(safe-area-inset-left)) !important;
          }

          .hero-control-btn {
            width: 46px !important;
            height: 46px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-controls { transition: none !important; }
        }
      `}</style>
    </section>
  );
}

function CtrlBtn({
  onClick, label, children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const style: CSSProperties = {
    width: '42px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: hovered ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.45)',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '50%',
    color: '#fff',
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    transition: 'background 0.2s',
    flexShrink: 0,
  };
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="hero-control-btn"
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}
