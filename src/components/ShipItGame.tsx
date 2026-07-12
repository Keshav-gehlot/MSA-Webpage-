import { useEffect, useRef, useState } from "react";
import { X as CloseIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ShipItGameProps {
  onClose: () => void;
}

const GRAVITY = 0.6;
const JUMP_VELOCITY = -10;
const GAME_SPEED = 5;
const GROUND_HEIGHT = 50;

export default function ShipItGame({ onClose }: ShipItGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const requestRef = useRef<number>();
  
  // Game state refs (to avoid stale closures in rAF)
  const state = useRef({
    player: { x: 50, y: 0, width: 30, height: 30, velocityY: 0, isJumping: false },
    obstacles: [] as { x: number, y: number, width: number, height: number, type: string, passed: boolean }[],
    score: 0,
    speed: GAME_SPEED,
    frames: 0,
    isGameOver: false,
  });

  const OBSTACLE_TYPES = [
    { label: "duplicate render" },
    { label: "dead dependency" },
    { label: "sed -i 💀" },
    { label: "merge conflict" },
  ];

  useEffect(() => {
    const savedHighScore = localStorage.getItem("msa-shipit-highscore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Focus the modal wrapper on mount
    if (modalRef.current) {
      modalRef.current.focus();
    }
    
    // Simple focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleTab);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleTab);
      document.body.style.overflow = '';
    };
  }, []);

  const startGame = () => {
    state.current = {
      player: { x: 50, y: 0, width: 30, height: 30, velocityY: 0, isJumping: false },
      obstacles: [],
      score: 0,
      speed: GAME_SPEED,
      frames: 0,
      isGameOver: false,
    };
    setScore(0);
    setIsGameOver(false);
    
    if (canvasRef.current) {
       // Reset player Y based on canvas
       state.current.player.y = canvasRef.current.height - GROUND_HEIGHT - state.current.player.height;
    }

    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const jump = () => {
    if (state.current.isGameOver) return;
    if (!state.current.player.isJumping) {
      state.current.player.velocityY = JUMP_VELOCITY;
      state.current.player.isJumping = true;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      }
      if (e.code === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resize canvas
    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      state.current.player.y = canvas.height - GROUND_HEIGHT - state.current.player.height;
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    startGame();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const gameLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    if (state.current.isGameOver) {
      return;
    }

    const { player, obstacles } = state.current;
    
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background grid/scanlines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
       ctx.beginPath();
       ctx.moveTo(i, 0);
       ctx.lineTo(i, canvas.height);
       ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
       ctx.beginPath();
       ctx.moveTo(0, i);
       ctx.lineTo(canvas.width, i);
       ctx.stroke();
    }

    // Update Player
    player.velocityY += GRAVITY;
    player.y += player.velocityY;

    const groundY = canvas.height - GROUND_HEIGHT;
    if (player.y + player.height >= groundY) {
      player.y = groundY - player.height;
      player.velocityY = 0;
      player.isJumping = false;
    }

    // Draw Player (MSA X Mark approximation)
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(player.x, player.y);
    ctx.lineTo(player.x + player.width, player.y + player.height);
    ctx.moveTo(player.x + player.width, player.y);
    ctx.lineTo(player.x, player.y + player.height);
    ctx.stroke();

    // Draw Ground
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.beginPath();
    ctx.moveTo(0, groundY);
    ctx.lineTo(canvas.width, groundY);
    ctx.stroke();

    // Spawn Obstacles
    state.current.frames++;
    if (state.current.frames % (Math.max(60, 150 - Math.floor(state.current.score * 2))) === 0) {
      const type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
      obstacles.push({
        x: canvas.width,
        y: groundY - 40,
        width: 120, // Approximate width for text
        height: 40,
        type: type.label,
        passed: false
      });
    }

    // Update & Draw Obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.x -= state.current.speed;

      // Draw obstacle
      ctx.fillStyle = "rgba(0, 217, 255, 0.1)"; // accent-blue transparent
      ctx.strokeStyle = "#A855F7";
      ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
      ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
      
      ctx.fillStyle = "#A855F7";
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(obs.type, obs.x + obs.width / 2, obs.y + obs.height / 2);

      // Check Collision (AABB)
      const pRect = { left: player.x, right: player.x + player.width, top: player.y, bottom: player.y + player.height };
      const oRect = { left: obs.x, right: obs.x + obs.width, top: obs.y, bottom: obs.y + obs.height };
      
      // slightly smaller hitbox for fairness
      const padding = 5;
      
      if (
        pRect.right - padding > oRect.left &&
        pRect.left + padding < oRect.right &&
        pRect.bottom - padding > oRect.top &&
        pRect.top + padding < oRect.bottom
      ) {
        // Game Over
        state.current.isGameOver = true;
        setIsGameOver(true);
        if (state.current.score > highScore) {
           setHighScore(state.current.score);
           localStorage.setItem("msa-shipit-highscore", state.current.score.toString());
        }
        break;
      }

      // Check Passed
      if (!obs.passed && obs.x + obs.width < player.x) {
        obs.passed = true;
        state.current.score += 1;
        setScore(state.current.score);
        state.current.speed += 0.2; // gradually increase speed
      }

      // Remove off-screen
      if (obs.x + obs.width < 0) {
        obstacles.splice(i, 1);
      }
    }

    // Draw Live Score
    ctx.fillStyle = "white";
    ctx.font = "20px Inter, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`Commits Shipped: ${state.current.score}`, 20, 20);

    if (!state.current.isGameOver) {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-canvas/95 backdrop-blur-sm flex flex-col"
        onClick={jump} // Tap to jump anywhere
      >
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue"
          aria-label="Close Game"
        >
          <CloseIcon size={24} />
        </button>

        <canvas
          ref={canvasRef}
          className="w-full h-full block"
        />

        {isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10" onClick={(e) => e.stopPropagation()}>
            <div className="bg-surface-1 border border-white/10 p-8 rounded-2xl text-center max-w-md w-full mx-4 shadow-2xl">
              <h2 className="text-3xl font-display font-medium text-red-400 mb-2">build failed ❌</h2>
              <p className="text-text-muted mb-6">You survived {score} production incidents.</p>
              
              <div className="flex justify-between items-center mb-8 bg-surface-2 p-4 rounded-lg border border-white/5">
                 <div className="text-left">
                    <span className="text-xs text-text-dim block mb-1 uppercase tracking-wider">Score</span>
                    <span className="text-2xl font-mono text-white">{score}</span>
                 </div>
                 <div className="text-right">
                    <span className="text-xs text-text-dim block mb-1 uppercase tracking-wider">High Score</span>
                    <span className="text-2xl font-mono text-accent-blue">{highScore}</span>
                 </div>
              </div>

              <button 
                onClick={(e) => { e.stopPropagation(); startGame(); }}
                style={{ color: "#000" }} className="w-full py-3 px-6 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-surface-1"
              >
                Run it back
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
