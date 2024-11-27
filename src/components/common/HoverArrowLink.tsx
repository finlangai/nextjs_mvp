import React, { useState } from 'react';
import Link from 'next/link';

interface HoverArrowLinkProps {
  href: string;
  label: string;
}

const HoverArrowLink: React.FC<HoverArrowLinkProps> = ({ href, label }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Link 
      href={href} 
      className="py-4 px-[24px] cursor-pointer text-fintown-txt-1 flex items-center gap-x-2.5 relative min-w-max"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div>{label}</div>

      <div className="relative w-5 h-5 overflow-hidden">
        {isVisible && (
          <i 
            className="
              bx bx-right-arrow-alt 
              text-[18px] 
              text-fintown-pr9 
              absolute 
              transition-all 
              duration-300 
              ease-in-out
              animate-slide-in-right
            "
          />
        )}
      </div>
    </Link>
  );
};

export default HoverArrowLink;