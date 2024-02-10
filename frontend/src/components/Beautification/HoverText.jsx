import React from "react";

const HoverText = ({ children, tooltip }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div className="absolute z-10 whitespace-nowrap bg-black p-2 text-white font-mono">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default HoverText;
