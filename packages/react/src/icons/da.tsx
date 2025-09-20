import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

/**
 * Department of Agriculture (DA) Icon
 * 
 * Official logo of the Department of Agriculture of the Philippines
 * 
 * @param props - Icon properties
 * @returns React component
 */
export const DA: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  className = '',
  style = {},
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ph-icon ph-icon-da ${className}`}
      style={style}
      role="img"
      aria-label="Department of Agriculture (DA)"
      {...props}
    >
      <title>Department of Agriculture (DA)</title>
      <desc>Official logo of the Department of Agriculture of the Philippines</desc>
      
      <circle cx="12" cy="12" r="10" fill="#1B5E20" stroke="#0033A0" strokeWidth="2"/>
      <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" fill="white"/>
      
      <path d="M6 6l2 2M18 6l-2 2M6 18l2-2M18 18l-2-2" stroke="#1B5E20" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

DA.displayName = 'DA';

export default DA;
