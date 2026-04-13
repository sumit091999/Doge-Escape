import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const UnityGameFrame = ({ isExpanded = false, onToggleExpanded }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const unityInstanceRef = useRef(null);

  // R2 Bucket URL - set this in your .env file
  const UNITY_BUILD_URL = import.meta.env.VITE_UNITY_BUILD_URL || 'https://your-r2-bucket.r2.dev';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `${UNITY_BUILD_URL}/Build/Game.loader.js`;
    
    script.onload = () => {
      const canvas = document.querySelector("#unity-canvas");
      
      createUnityInstance(canvas, {
        dataUrl: `${UNITY_BUILD_URL}/Build/Game.data`,
        frameworkUrl: `${UNITY_BUILD_URL}/Build/Game.framework.js`,
        codeUrl: `${UNITY_BUILD_URL}/Build/Game.wasm`,
        streamingAssetsUrl: `${UNITY_BUILD_URL}/StreamingAssets`,
        companyName: "BIG BLOCK CREW",
        productName: "BLOCK PIXEL",
        productVersion: "1.0.5",
      }, (progress) => {
        setLoadingProgress(Math.round(progress * 100));
      }).then((unityInstance) => {
        unityInstanceRef.current = unityInstance;
        setIsLoading(false);
        console.log("✅ Unity loaded from R2!");
      }).catch((error) => {
        console.error("❌ Unity loading error:", error);
        setIsLoading(false);
      });
    };

    script.onerror = () => {
      console.error("❌ Failed to load Unity loader from R2");
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      if (unityInstanceRef.current) {
        unityInstanceRef.current.Quit();
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [UNITY_BUILD_URL]);

  return (
    <div
      className={`unity-stage-frame relative w-full overflow-hidden bg-doge-coal ${
        isExpanded
          ? 'h-[100svh] max-w-none rounded-none'
          : 'max-w-[960px] aspect-[16/10] rounded-lg'
      }`}
    >
      

      {onToggleExpanded && (
        <button
          type="button"
          onClick={onToggleExpanded}
          className="game-screen-toggle"
          aria-label={isExpanded ? 'Reduce game screen' : 'Make game full screen'}
          title={isExpanded ? 'Reduce game screen' : 'Make game full screen'}
        >
          <span
            className={`screen-size-icon ${isExpanded ? 'screen-size-icon--shrink' : 'screen-size-icon--expand'}`}
            aria-hidden="true"
          >
            <span />
            <span />
          </span>
        </button>
      )}

      {/* Loading Screen */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="unity-loading-scene absolute inset-0 flex flex-col items-center justify-center bg-doge-coal z-10"
        >
          <div className="text-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="text-5xl"
            >
              🚤
            </motion.div>
            
            <h3 className="text-lg text-doge-gold">Loading Game...</h3>
            
            <div className="w-56 max-w-[70vw] md:w-64">
              <div className="stat-bar h-4">
                <motion.div
                  animate={{ width: `${loadingProgress}%` }}
                  className="stat-bar-fill bg-doge-gold"
                />
              </div>
              <p className="text-xs text-doge-iron mt-2">{loadingProgress}%</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Unity Canvas - Fixed 960x600 */}
      <canvas 
        id="unity-canvas"
        width="960"
        height="600"
        style={{ 
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default UnityGameFrame;
