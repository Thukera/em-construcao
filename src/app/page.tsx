export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden flex items-center justify-center">
      {/* Animated caution tape - top */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <div className="caution-tape"></div>
      </div>

      {/* Animated caution tape - bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <div className="caution-tape"></div>
      </div>

      {/* Main content */}
      <main className="construction-sign-container z-10">
        {/* Diamond warning sign */}
        <div className="construction-sign">
          {/* Top border glow */}
          <div className="absolute inset-0 rounded-[3rem] border-8 border-yellow-400 blur-sm opacity-50"></div>
          
          {/* Main sign */}
          <div className="relative bg-yellow-400 w-80 h-80 rotate-45 flex items-center justify-center border-8 border-gray-900 rounded-[3rem] shadow-2xl">
            <div className="-rotate-45 flex flex-col items-center justify-center gap-6 px-8">
              {/* Text */}
              <h1 className="text-gray-900 font-bold text-2xl text-center leading-tight tracking-tight">
                PÁGINA EM<br />DESENVOLVIMENTO
              </h1>
              
              {/* Laptop icon */}
              <div className="relative">
                {/* Screen */}
                <div className="w-24 h-16 bg-gray-900 border-4 border-gray-900 rounded-t-lg relative overflow-hidden">
                  <div className="absolute inset-2 bg-yellow-400 rounded-sm flex items-center justify-start px-2">
                    <span className="cursor-blink text-gray-900 font-bold text-xl">|</span>
                  </div>
                </div>
                {/* Base */}
                <div className="w-28 h-2 bg-gray-900 rounded-b-lg mx-auto"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-yellow-400 text-center mt-12 text-lg font-semibold animate-pulse">
          Em breve algo incrível!
        </p>
      </main>
    </div>
  );
}
