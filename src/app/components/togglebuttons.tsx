'use client';

interface ToggleButtonsProps {
  selected: 'particulier' | 'entreprise';
  onClick: (value: 'particulier' | 'entreprise') => void;
}

export default function ToggleButtons({ selected, onClick }: ToggleButtonsProps) {
  return (
    <div className="flex items-center justify-center mt-7">
      <button
        onClick={() => onClick('particulier')}
        className={`px-8 py-3 text-2xl border-2 transition-all duration-200 tracking-tighter cursor-pointer
          ${selected === 'particulier'
            ? 'font-black text-white bg-[#bf983c] border-[#bf983c] hover:bg-[#a67f2d]'
            : 'font-light text-black bg-white border-[#bf983c] hover:bg-[#a67f2d] hover:text-white'}
        `}
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        Particulier
      </button>

      <button
        onClick={() => onClick('entreprise')}
        className={`px-8 py-3 text-2xl border-2 transition-all duration-200 tracking-tighter cursor-pointer
          ${selected === 'entreprise'
            ? 'font-black text-white bg-[#bf983c] border-[#bf983c] hover:bg-[#a67f2d]'
            : 'font-light text-black bg-white border-[#bf983c] hover:bg-[#a67f2d] hover:text-white'}
        `}
        style={{ fontFamily: 'var(--font-poppins)' }}
      >
        Entreprise
      </button>
    </div>
  );
}
