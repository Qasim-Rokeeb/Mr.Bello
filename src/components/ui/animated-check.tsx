

'use client';

export function AnimatedCheck() {
  return (
    <svg
      className="h-8 w-8 text-primary"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        className="animate-check-draw-circle"
        style={{
          strokeDasharray: '31.4, 31.4',
          strokeDashoffset: '31.4',
        }}
      />
      <path
        d="M9 12l2 2 4-4"
        className="animate-check-draw-path"
        style={{
          strokeDasharray: '9, 9',
          strokeDashoffset: '9',
        }}
      />
    </svg>
  );
}
