export function PakistanFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Green background */}
      <rect width="900" height="600" fill="#01411C" />
      {/* White stripe */}
      <rect width="225" height="600" fill="#FFFFFF" />
      {/* White crescent */}
      <g transform="translate(562.5, 300)">
        <circle r="120" fill="#FFFFFF" />
        <circle r="100" cx="30" fill="#01411C" />
      </g>
      {/* White star */}
      <g transform="translate(675, 300)">
        <path
          d="M 0,-50 L 11.8,-15.5 L 47.6,-15.5 L 19.1,6.5 L 29.4,41.3 L 0,19.1 L -29.4,41.3 L -19.1,6.5 L -47.6,-15.5 L -11.8,-15.5 Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );
}

export function SouthKoreaFlag({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 600"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White background */}
      <rect width="900" height="600" fill="#FFFFFF" />
      
      {/* Red and Blue Yin-Yang (Taegeuk) */}
      <g transform="translate(450, 300)">
        {/* Blue semicircle (bottom) */}
        <path d="M -75,0 A 75,75 0 0,0 75,0 A 37.5,37.5 0 0,0 0,0 A 37.5,37.5 0 0,1 -75,0 Z" fill="#0047A0" />
        {/* Red semicircle (top) */}
        <path d="M -75,0 A 75,75 0 0,1 75,0 A 37.5,37.5 0 0,1 0,0 A 37.5,37.5 0 0,0 -75,0 Z" fill="#CD2E3A" />
      </g>
      
      {/* Trigrams */}
      {/* Top-left: ☰ (Heaven - Geon) */}
      <g transform="translate(225, 150)">
        <rect x="-60" y="-30" width="120" height="15" fill="#000000" />
        <rect x="-60" y="0" width="120" height="15" fill="#000000" />
        <rect x="-60" y="30" width="120" height="15" fill="#000000" />
      </g>
      
      {/* Top-right: ☵ (Water - Gam) */}
      <g transform="translate(675, 150)">
        <rect x="-60" y="-30" width="50" height="15" fill="#000000" />
        <rect x="10" y="-30" width="50" height="15" fill="#000000" />
        <rect x="-60" y="0" width="120" height="15" fill="#000000" />
        <rect x="-60" y="30" width="50" height="15" fill="#000000" />
        <rect x="10" y="30" width="50" height="15" fill="#000000" />
      </g>
      
      {/* Bottom-left: ☲ (Fire - Ri) */}
      <g transform="translate(225, 450)">
        <rect x="-60" y="-30" width="120" height="15" fill="#000000" />
        <rect x="-60" y="0" width="50" height="15" fill="#000000" />
        <rect x="10" y="0" width="50" height="15" fill="#000000" />
        <rect x="-60" y="30" width="120" height="15" fill="#000000" />
      </g>
      
      {/* Bottom-right: ☷ (Earth - Gon) */}
      <g transform="translate(675, 450)">
        <rect x="-60" y="-30" width="50" height="15" fill="#000000" />
        <rect x="10" y="-30" width="50" height="15" fill="#000000" />
        <rect x="-60" y="0" width="50" height="15" fill="#000000" />
        <rect x="10" y="0" width="50" height="15" fill="#000000" />
        <rect x="-60" y="30" width="50" height="15" fill="#000000" />
        <rect x="10" y="30" width="50" height="15" fill="#000000" />
      </g>
    </svg>
  );
}
