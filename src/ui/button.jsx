const button = () => {
  return (
    <button
      type="button"
      className=" relative min-w-[10em] px-2 pb-3 bg-transparent cursor-pointer select-none
      "
    >
      {/* TOP */}
      <div
        className=" relative z-10 flex items-center justify-center px-4 py-2 text-white transition-transform duration-200 active:translate-y-1.5
        "
      >
        Admin
        {/* Top background (was ::after) */}
        <div
          className="absolute inset-0 -z-10 rounded-sm bg-[radial-gradient(#cd3f64,#9d3656)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),0_1px_2px_1px_rgba(255,255,255,0.2)] transition-all duration-200 active:rounded-md active:px-0.5
          "
        />
      </div>

      {/* BOTTOM */}
      <div
        className=" absolute -z-10 bottom-1 left-1 w-[calc(100%-8px)] h-[calc(100%-10px)] pt-1.5 rounded-[8px/16px_16px_8px_8px] bg-[#803] shadow-[0_2px_3px_rgba(0,0,0,0.5),inset_0_-1px_3px_3px_rgba(0,0,0,0.4)] transition-all duration-200 active:pt-0 active:rounded-[10px_10px_8px_8px/8px]
        "
        style={{
          backgroundImage: ` radial-gradient(4px 8px at 4px calc(100% - 8px), rgba(255,255,255,.25), transparent), radial-gradient(4px 8px at calc(100% - 4px) calc(100% - 8px), rgba(255,255,255,.25), transparent), radial-gradient(16px at -4px 0, white, transparent), radial-gradient(16px at calc(100% + 4px) 0, white, transparent)
          `,
        }}
      />

      {/* BASE */}
      <div
        className="absolute -z-20 top-1 left-0 w-full h-[calc(100%-4px)] rounded-xl bg-[rgba(0,0,0,0.15)] shadow-[0_1px_1px_rgba(255,255,255,0.75),inset_0_2px_2px_rgba(0,0,0,0.25)]
        "
      />
    </button>
  );
};
export default button;
