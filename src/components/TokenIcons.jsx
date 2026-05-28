export function SuiTokenIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} text-[#4ca2ff] inline-block`}>
      <path d="M50 12C31.5 30.5 19 46.5 19 62C19 77.5 32.5 88 50 88C67.5 88 81 77.5 81 62C81 46.5 68.5 30.5 50 12ZM50 78C39.5 78 31 71.5 31 62C31 52.5 40 37.5 50 25.5C60 37.5 69 52.5 69 62C69 71.5 60.5 78 50 78Z" fill="currentColor"/>
      <path d="M50 35C44 44.5 37 54.5 37 62C37 69 42.5 74 50 74C57.5 74 63 69 63 62C63 54.5 56 44.5 50 35Z" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

export function UsdcTokenIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} inline-block`}>
      <circle cx="50" cy="50" r="50" fill="#2775CA" />
      <path d="M61.2 57.6C61.2 51.5 57.5 49.4 50.1 48.5C44.8 47.8 43.7 46.6 43.7 43.9C43.7 41.2 45.7 39.5 49.7 39.5C53.3 39.5 55.2 40.7 56.2 43.6C56.4 44.2 57 44.6 57.6 44.6H60.5C61.3 44.6 61.9 44 61.7 43.1C60.9 38.8 57.5 35.6 52.8 35.1V30.8C52.8 30.1 52.2 29.5 51.4 29.5H48.6C47.9 29.5 47.3 30.1 47.3 30.8V35C41.2 35.8 37.4 39.8 37.4 44.7C37.4 50.4 40.9 53 48 53.9C53 54.6 54.9 55.6 54.9 58.7C54.9 61.8 52.2 63.9 48.5 63.9C43.5 63.9 41.6 61.8 41 59.1C40.9 58.4 40.3 57.9 39.6 57.9H36.6C35.8 57.9 35.1 58.6 35.3 59.4C36.2 64.1 39.5 67.4 47.2 68.3V72.6C47.2 73.3 47.8 73.9 48.5 73.9H51.3C52 73.9 52.6 73.3 52.6 72.6V68.2C58.8 67.1 61.2 62.6 61.2 57.6Z" fill="white" />
      <path d="M32.4 32.5C22.7 42.8 22.3 58.4 31.2 69.2" stroke="white" strokeWidth="5.5" strokeLinecap="round" opacity="0.9" />
      <path d="M67.6 32.5C77.3 42.8 77.7 58.4 68.8 69.2" stroke="white" strokeWidth="5.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

export function TokenPairIcon({ left, right }) {
  return (
    <div className="flex -space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#08111c] shadow-[0_0_16px_rgba(76,162,255,0.12)]">
        {left}
      </div>
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-[#08111c] shadow-[0_0_16px_rgba(56,182,255,0.12)]">
        {right}
      </div>
    </div>
  );
}
