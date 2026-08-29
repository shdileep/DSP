import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Video, 
  RotateCw, 
  Sliders, 
  Grid, 
  Timer, 
  Download, 
  Trash2, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Contrast, 
  Palette, 
  Film, 
  Image as ImageIcon,
  X,
  Volume2,
  VolumeX,
  Zap,
  ZapOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import camImg from '../assets/images/cam.png';

export type CameraFilter = 'normal' | 'vivid' | 'noir' | 'cyberpunk' | 'vintage' | 'sunset' | 'arctic' | 'sepia' | 'glow';
export type GridMode = 'none' | 'rule-of-thirds' | 'golden' | 'crosshair';

interface CapturedMedia {
  id: string;
  type: 'photo' | 'video';
  url: string;
  timestamp: string;
  filter: CameraFilter;
}

export default function CameraApp() {
  const [mode, setMode] = useState<'photo' | 'video'>('photo');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isRequestingPermission, setIsRequestingPermission] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  
  // Effects & Settings
  const [filter, setFilter] = useState<CameraFilter>('normal');
  const [gridMode, setGridMode] = useState<GridMode>('none');
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [flashEnabled, setFlashEnabled] = useState<boolean>(false);
  const [isShutterFlashing, setIsShutterFlashing] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  
  // Pro Adjustments
  const [showProPanel, setShowProPanel] = useState<boolean>(false);
  const [brightness, setBrightness] = useState<number>(100);
  const [contrast, setContrast] = useState<number>(100);
  const [saturation, setSaturation] = useState<number>(100);

  // Video Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  // Gallery & Preview (In-Memory React State only - resets upon page refresh)
  const [gallery, setGallery] = useState<CapturedMedia[]>([]);
  const [previewMedia, setPreviewMedia] = useState<CapturedMedia | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Function to explicitly request realtime webcam
  const requestCameraAccess = async () => {
    setIsRequestingPermission(true);
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Stop any old stream
        if (stream) {
          stream.getTracks().forEach(t => t.stop());
        }

        let mediaStream: MediaStream | null = null;
        try {
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: facingMode,
              width: { ideal: 1280 },
              height: { ideal: 720 }
            },
            audio: false
          });
        } catch (strictErr) {
          // Fallback to basic unconstrained video if resolution/facingMode is overconstrained
          console.warn("Strict constraints failed, trying basic video:", strictErr);
          mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });
        }

        if (mediaStream) {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().catch(e => console.log("Video playback error:", e));
            };
          }
        }
      } else {
        setCameraError("Webcam API not supported in this browser. Please use Chrome, Edge or Firefox.");
      }
    } catch (err: any) {
      console.warn("Camera permission error:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError("Camera permission blocked in browser. Click the lock/settings icon beside http://localhost:3000 in your browser address bar and set Camera to 'Allow', then refresh.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError("No webcam hardware detected on this PC.");
      } else {
        setCameraError(err.message || "Unable to access realtime camera.");
      }
    } finally {
      setIsRequestingPermission(false);
    }
  };

  // Initialize WebCam stream on mount or facingMode change
  useEffect(() => {
    requestCameraAccess();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  // Keep videoRef srcObject assigned whenever stream changes
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(e => console.log("Play error:", e));
    }
  }, [stream]);

  // Video recording timer
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Shutter Sound synthesis
  const playShutterSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      // Audio fallback
    }
  };

  // Get combined CSS filter string
  const getFilterStyle = (): string => {
    let base = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
    switch (filter) {
      case 'vivid':
        return `${base} saturate(160%) contrast(115%)`;
      case 'noir':
        return `${base} grayscale(100%) contrast(140%)`;
      case 'cyberpunk':
        return `${base} hue-rotate(190deg) saturate(180%) contrast(120%)`;
      case 'vintage':
        return `${base} sepia(45%) contrast(110%) brightness(95%)`;
      case 'sunset':
        return `${base} sepia(30%) saturate(140%) hue-rotate(-20deg)`;
      case 'arctic':
        return `${base} hue-rotate(40deg) saturate(110%) brightness(105%)`;
      case 'sepia':
        return `${base} sepia(90%)`;
      case 'glow':
        return `${base} brightness(115%) contrast(95%) saturate(110%)`;
      default:
        return base;
    }
  };

  // Take photo action
  const executeCapture = () => {
    playShutterSound();
    setIsShutterFlashing(true);
    setTimeout(() => setIsShutterFlashing(false), 200);

    const video = videoRef.current;
    const canvas = canvasRef.current;

    let photoUrl = '';

    if (video && canvas) {
      const w = video.videoWidth || 1280;
      const h = video.videoHeight || 720;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.filter = getFilterStyle();
        if (facingMode === 'user') {
          ctx.translate(w, 0);
          ctx.scale(-1, 1);
        }
        ctx.drawImage(video, 0, 0, w, h);
        photoUrl = canvas.toDataURL('image/png');
      }
    }

    const newMedia: CapturedMedia = {
      id: `capture-${Date.now()}`,
      type: 'photo',
      url: photoUrl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      filter: filter
    };

    setGallery(prev => [newMedia, ...prev]);
  };

  // Handle capture button with optional timer
  const handleCaptureClick = () => {
    if (mode === 'video') {
      toggleVideoRecording();
      return;
    }

    if (timerSeconds > 0) {
      let count = timerSeconds;
      setCountdown(count);
      const interval = setInterval(() => {
        count -= 1;
        if (count > 0) {
          setCountdown(count);
        } else {
          clearInterval(interval);
          setCountdown(null);
          executeCapture();
        }
      }, 1000);
    } else {
      executeCapture();
    }
  };

  // Video recording handler
  const toggleVideoRecording = () => {
    if (!isRecording) {
      // Start recording
      playShutterSound();
      if (stream && window.MediaRecorder) {
        try {
          recordedChunksRef.current = [];
          const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
          recorder.ondataavailable = e => {
            if (e.data.size > 0) {
              recordedChunksRef.current.push(e.data);
            }
          };
          recorder.onstop = () => {
            const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
            const videoUrl = URL.createObjectURL(blob);
            const newMedia: CapturedMedia = {
              id: `video-${Date.now()}`,
              type: 'video',
              url: videoUrl,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              filter: filter
            };
            setGallery(prev => [newMedia, ...prev]);
          };
          recorder.start();
          mediaRecorderRef.current = recorder;
        } catch (e) {
          console.warn("Recording codec error, simulated recording active", e);
        }
      }
      setIsRecording(true);
    } else {
      // Stop recording
      playShutterSound();
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      setIsRecording(false);
    }
  };

  // Download media to PC
  const downloadMedia = (item: CapturedMedia) => {
    const a = document.createElement('a');
    a.href = item.url;
    a.download = `HP_Camera_${item.id}.${item.type === 'photo' ? 'png' : 'webm'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Delete from gallery
  const deleteMedia = (id: string) => {
    setGallery(prev => prev.filter(m => m.id !== id));
    if (previewMedia?.id === id) {
      setPreviewMedia(null);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#050914] select-none text-slate-100 overflow-hidden font-sans">
      
      {/* ─────────────────────────────────────────────────────────── */}
      {/* TOP CAMERA CONTROL BAR                                      */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="h-10 bg-slate-950/90 border-b border-slate-800 px-3 flex items-center justify-between shrink-0 z-30 backdrop-blur-md">
        {/* Left: Device Info */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-sky-950 border border-sky-500/40 flex items-center justify-center p-0.5 shadow-sm">
            <img src={camImg} alt="Camera" className="w-full h-full object-contain" />
          </div>
          <div className="leading-tight">
            <span className="text-[10px] font-bold text-white font-mono flex items-center gap-1.5">
              HP TrueVision FHD IR Camera
              <span className={`w-1.5 h-1.5 rounded-full ${stream ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            </span>
            <span className="text-[7.5px] text-slate-400 font-mono block">1080p • 60 FPS • Auto-Exposure</span>
          </div>
          {!stream && (
            <button
              onClick={requestCameraAccess}
              disabled={isRequestingPermission}
              className="p-1 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sky-400 text-[7.5px] font-mono flex items-center gap-1 cursor-pointer ml-1"
              title="Connect Webcam"
            >
              <RotateCw className={`w-2.5 h-2.5 ${isRequestingPermission ? 'animate-spin' : ''}`} />
              <span>Connect</span>
            </button>
          )}
        </div>

        {/* Center: Mode Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-[8px] font-mono">
          <button
            onClick={() => { setMode('photo'); if (isRecording) toggleVideoRecording(); }}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
              mode === 'photo' ? 'bg-sky-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Camera className="w-3 h-3" />
            <span>PHOTO</span>
          </button>
          <button
            onClick={() => setMode('video')}
            className={`px-2.5 py-1 rounded-md flex items-center gap-1 transition-all cursor-pointer ${
              mode === 'video' ? 'bg-rose-600 text-white font-bold shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3 h-3" />
            <span>VIDEO</span>
          </button>
        </div>

        {/* Right: Quick Toggles */}
        <div className="flex items-center gap-1.5">
          {/* Flash */}
          <button
            onClick={() => setFlashEnabled(prev => !prev)}
            title="Screen Flash"
            className={`p-1.5 rounded-lg border text-[8px] transition-colors cursor-pointer ${
              flashEnabled 
                ? 'bg-amber-500/20 border-amber-500/60 text-amber-300' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {flashEnabled ? <Zap className="w-3.5 h-3.5" /> : <ZapOff className="w-3.5 h-3.5" />}
          </button>

          {/* Timer */}
          <button
            onClick={() => {
              const next = timerSeconds === 0 ? 3 : timerSeconds === 3 ? 5 : timerSeconds === 5 ? 10 : 0;
              setTimerSeconds(next);
            }}
            title="Countdown Timer"
            className={`px-2 py-1 rounded-lg border text-[8px] font-mono flex items-center gap-1 transition-colors cursor-pointer ${
              timerSeconds > 0 
                ? 'bg-sky-500/20 border-sky-500/60 text-sky-300 font-bold' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Timer className="w-3 h-3" />
            <span>{timerSeconds === 0 ? 'Off' : `${timerSeconds}s`}</span>
          </button>

          {/* Grid Mode */}
          <button
            onClick={() => {
              const next = gridMode === 'none' ? 'rule-of-thirds' : gridMode === 'rule-of-thirds' ? 'golden' : gridMode === 'golden' ? 'crosshair' : 'none';
              setGridMode(next);
            }}
            title="Viewfinder Grid"
            className={`p-1.5 rounded-lg border text-[8px] transition-colors cursor-pointer ${
              gridMode !== 'none' 
                ? 'bg-sky-500/20 border-sky-500/60 text-sky-300' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          {/* Pro Tuning Panel */}
          <button
            onClick={() => setShowProPanel(prev => !prev)}
            title="Pro Image Controls"
            className={`p-1.5 rounded-lg border text-[8px] transition-colors cursor-pointer ${
              showProPanel 
                ? 'bg-purple-500/20 border-purple-500/60 text-purple-300' 
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
          </button>

          {/* Audio Shutter Sound */}
          <button
            onClick={() => setSoundEnabled(prev => !prev)}
            title="Shutter Sound"
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* MAIN VIEWFINDER VIEWPORT                                    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
        
        {/* Shutter Flash Animation */}
        <AnimatePresence>
          {isShutterFlashing && (
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-white z-50 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Screen Flash Simulation (Ambient) */}
        {flashEnabled && (
          <div className="absolute inset-0 bg-white/20 z-20 pointer-events-none" />
        )}

        {/* Real Live Video Feed */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover transition-transform duration-200 ${
            facingMode === 'user' ? 'scale-x-[-1]' : ''
          }`}
          style={{
            filter: getFilterStyle(),
            transform: `${facingMode === 'user' ? 'scaleX(-1)' : 'scaleX(1)'} scale(${zoomLevel})`
          }}
        />

        {/* Clean subtle standby when camera is waiting for stream */}
        {!stream && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070b14] pointer-events-none select-none">
            <div className="w-14 h-14 rounded-full border border-slate-800 flex items-center justify-center">
              <Camera className="w-6 h-6 text-slate-700" />
            </div>
            <span className="text-[9px] font-mono text-slate-600 mt-2">HP TrueVision Camera Standby</span>
          </div>
        )}

        {/* Hidden Canvas for High-Resolution Capture Processing */}
        <canvas ref={canvasRef} className="hidden" />

        {/* ── Viewfinder Grid Overlays ── */}
        {gridMode === 'rule-of-thirds' && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none z-20 border border-white/20">
            <div className="border-r border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="" />
          </div>
        )}

        {gridMode === 'golden' && (
          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
            <div className="w-[61.8%] h-[61.8%] border-2 border-amber-400/40 rounded-full" />
            <div className="absolute w-[38.2%] h-[38.2%] border border-amber-400/30" />
          </div>
        )}

        {gridMode === 'crosshair' && (
          <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
            <div className="w-10 h-10 border border-sky-400/60 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
            </div>
            <div className="absolute w-24 h-[1px] bg-sky-400/30" />
            <div className="absolute h-24 w-[1px] bg-sky-400/30" />
          </div>
        )}

        {/* ── Countdown Timer Overlay ── */}
        <AnimatePresence>
          {countdown !== null && (
            <motion.div
              key={countdown}
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none bg-black/40 backdrop-blur-sm"
            >
              <span className="text-7xl font-black text-white font-mono drop-shadow-[0_0_20px_rgba(56,189,248,0.8)]">
                {countdown}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Video Recording Duration Indicator ── */}
        {isRecording && (
          <div className="absolute top-4 left-4 bg-rose-950/90 border border-rose-500/80 px-3 py-1 rounded-full text-white text-[9px] font-mono font-bold flex items-center gap-2 shadow-lg z-30 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>REC {Math.floor(recordingDuration / 60).toString().padStart(2, '0')}:{(recordingDuration % 60).toString().padStart(2, '0')}</span>
          </div>
        )}

        {/* ── Zoom Controls Overlay ── */}
        <div className="absolute bottom-4 right-4 bg-slate-950/80 border border-slate-800 rounded-xl p-1 flex items-center gap-1 z-30 backdrop-blur-md">
          <button 
            onClick={() => setZoomLevel(prev => Math.max(1, +(prev - 0.25).toFixed(2)))}
            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          <span className="text-[8px] font-mono font-bold px-1 text-sky-400 min-w-[28px] text-center">
            {zoomLevel}x
          </span>
          <button 
            onClick={() => setZoomLevel(prev => Math.min(3, +(prev + 0.25).toFixed(2)))}
            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
        </div>

        {/* ── Pro Tuning Floating Drawer ── */}
        <AnimatePresence>
          {showProPanel && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="absolute top-3 right-3 w-56 bg-slate-950/95 border border-purple-500/40 rounded-2xl p-3 shadow-2xl z-40 backdrop-blur-xl text-left space-y-2.5 text-[8px] font-mono"
            >
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="font-bold text-white flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-purple-400" />
                  Pro Image Controls
                </span>
                <button onClick={() => setShowProPanel(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* Brightness */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1"><Sun className="w-2.5 h-2.5" /> Brightness</span>
                  <span>{brightness}%</span>
                </div>
                <input 
                  type="range" min="50" max="150" value={brightness} 
                  onChange={e => setBrightness(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Contrast */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1"><Contrast className="w-2.5 h-2.5" /> Contrast</span>
                  <span>{contrast}%</span>
                </div>
                <input 
                  type="range" min="50" max="150" value={contrast} 
                  onChange={e => setContrast(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              {/* Saturation */}
              <div className="space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1"><Palette className="w-2.5 h-2.5" /> Saturation</span>
                  <span>{saturation}%</span>
                </div>
                <input 
                  type="range" min="0" max="200" value={saturation} 
                  onChange={e => setSaturation(Number(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <button
                onClick={() => { setBrightness(100); setContrast(100); setSaturation(100); }}
                className="w-full py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-center transition-colors cursor-pointer border border-slate-800"
              >
                Reset Calibration
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* FILTER REEL PRESETS (SWIPEABLE / CLICKABLE)                */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="h-10 bg-slate-950 border-t border-slate-800 px-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 z-30">
        <span className="text-[7.5px] font-mono text-slate-400 font-bold uppercase tracking-wider shrink-0 pr-1">
          Effects:
        </span>
        {[
          { id: 'normal', name: 'Original' },
          { id: 'vivid', name: 'Vivid HD' },
          { id: 'noir', name: 'B&W Noir' },
          { id: 'cyberpunk', name: 'Cyber Neon' },
          { id: 'vintage', name: 'Retro 90s' },
          { id: 'sunset', name: 'Sunset Warm' },
          { id: 'arctic', name: 'Arctic Cool' },
          { id: 'sepia', name: 'Sepia' },
          { id: 'glow', name: 'Soft Glow' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setFilter(item.id as CameraFilter)}
            className={`px-2.5 py-1 rounded-full text-[7.5px] font-mono shrink-0 transition-all cursor-pointer ${
              filter === item.id 
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-[0_0_10px_rgba(56,189,248,0.5)] scale-105' 
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* BOTTOM SHUTTER CONTROLS & GALLERY STRIP                     */}
      {/* ─────────────────────────────────────────────────────────── */}
      <div className="h-16 bg-slate-950/95 border-t border-slate-800 px-4 flex items-center justify-between shrink-0 z-30">
        
        {/* Left: Gallery Thumbnail Reel */}
        <div className="flex items-center gap-2">
          {gallery.length > 0 ? (
            <button
              onClick={() => setPreviewMedia(gallery[0])}
              className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-sky-500 shadow-md group cursor-pointer"
              title="Open Recent Capture"
            >
              {gallery[0].type === 'photo' ? (
                <img src={gallery[0].url} alt="Recent" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              ) : (
                <div className="w-full h-full bg-slate-900 flex items-center justify-center text-rose-400">
                  <Film className="w-4 h-4" />
                </div>
              )}
              <span className="absolute bottom-0 right-0 px-1 rounded-tl bg-black/80 text-[6px] font-mono text-white">
                {gallery.length}
              </span>
            </button>
          ) : (
            <div className="w-10 h-10 rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-slate-600">
              <ImageIcon className="w-4 h-4" />
            </div>
          )}
          <span className="hidden sm:inline text-[7.5px] font-mono text-slate-400">
            {gallery.length} Media Saved
          </span>
        </div>

        {/* Center: Main Shutter Trigger Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleCaptureClick}
            className={`relative rounded-full p-1 transition-transform cursor-pointer active:scale-95 shadow-2xl ${
              mode === 'photo' 
                ? 'w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-600 border-4 border-slate-900 shadow-[0_0_20px_rgba(56,189,248,0.6)]' 
                : isRecording 
                ? 'w-12 h-12 bg-rose-600 border-4 border-slate-900 animate-pulse shadow-[0_0_25px_rgba(244,63,94,0.8)]' 
                : 'w-12 h-12 bg-rose-500 border-4 border-slate-900'
            }`}
            title={mode === 'photo' ? 'Take Photo' : isRecording ? 'Stop Recording' : 'Start Video'}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center bg-white/20">
              {mode === 'photo' ? (
                <div className="w-6 h-6 rounded-full bg-white shadow" />
              ) : isRecording ? (
                <div className="w-4 h-4 rounded-sm bg-white" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-rose-600" />
              )}
            </div>
          </button>
        </div>

        {/* Right: Camera Facing Mode Flip Switch */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFacingMode(prev => prev === 'user' ? 'environment' : 'user')}
            className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-sky-400 flex flex-col items-center justify-center transition-colors cursor-pointer"
            title="Switch Camera (Front/Rear)"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span className="text-[6.5px] font-mono mt-0.5">{facingMode === 'user' ? 'Front' : 'Rear'}</span>
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────── */}
      {/* FULLSCREEN PHOTO/VIDEO PREVIEW LIGHTBOX MODAL               */}
      {/* ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {previewMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col p-4"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-left">
                <span className="text-xs font-bold text-white font-mono">
                  {previewMedia.type === 'photo' ? 'Captured Photograph' : 'Recorded Video File'}
                </span>
                <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                  {previewMedia.timestamp} • Filter: {previewMedia.filter.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadMedia(previewMedia)}
                  className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-[9px] font-bold font-mono flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
                >
                  <Download className="w-3 h-3" />
                  <span>Save to PC</span>
                </button>
                <button
                  onClick={() => deleteMedia(previewMedia.id)}
                  className="p-1.5 rounded-lg bg-rose-950 hover:bg-rose-900 border border-rose-800 text-rose-300 hover:text-white cursor-pointer transition-colors"
                  title="Delete Media"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPreviewMedia(null)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white cursor-pointer transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Media Canvas Viewport */}
            <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
              {previewMedia.type === 'photo' ? (
                <img 
                  src={previewMedia.url} 
                  alt="Preview" 
                  className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl border border-slate-800" 
                />
              ) : (
                <video 
                  src={previewMedia.url} 
                  controls 
                  autoPlay 
                  className="max-h-full max-w-full rounded-2xl shadow-2xl border border-slate-800 bg-black" 
                />
              )}
            </div>

            {/* Gallery Thumbnail Strip at Bottom of Preview */}
            <div className="h-14 flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-slate-800">
              {gallery.map(item => (
                <button
                  key={item.id}
                  onClick={() => setPreviewMedia(item)}
                  className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    previewMedia.id === item.id ? 'border-sky-400 scale-105 shadow-[0_0_10px_#38bdf8]' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  {item.type === 'photo' ? (
                    <img src={item.url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center text-rose-400">
                      <Film className="w-4 h-4" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}