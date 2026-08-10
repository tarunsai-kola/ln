const BorderedButton = ({ text, onClick, Icon }) => {
  return (
    <button
      className="border-2 shadow-lg border-[#7bb9ae] bg-white !cursor-pointer !text-[#7bb9ae] px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 min-h-[48px] rounded-full font-bold flex items-center justify-center gap-x-1.5 sm:gap-x-2 text-xs sm:text-sm md:text-base whitespace-nowrap shrink-0 transition-all hover:bg-[#7bb9ae]/10 active:scale-95"
      onClick={onClick}
    >
      {Icon && (
        <Icon className="inline-block !text-base sm:!text-lg md:!text-xl flex-shrink-0" />
      )}
      {text}
    </button>
  );
};

const BackgroundButton = ({ text, onClick, Icon }) => {
  return (
    
    <button
      className="bg-secondary !cursor-pointer shadow-lg text-white px-4 sm:px-5 py-2.5 sm:py-3 min-h-[48px] rounded-full font-bold flex items-center justify-center gap-x-1.5 sm:gap-x-2 text-xs sm:text-sm md:text-base whitespace-nowrap shrink-0 transition-all hover:bg-primary active:scale-95"
      onClick={onClick}
    >
      {Icon && ( 
        <Icon className="inline-block !text-base sm:!text-lg flex-shrink-0" />
      )}
      {text}
    </button>
  );
};

export { BorderedButton, BackgroundButton };
