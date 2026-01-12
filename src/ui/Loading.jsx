const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Inline animation */}
      <style>
        {`
          @keyframes rotation_51512 {
            70% {
              box-shadow: 0px 0px 10px 50px rgba(241, 57, 57, 0.526);
            }
            90% {
              box-shadow: 0px 0px 10px 50px rgba(241, 57, 57, 0.04);
            }
            100% {
              opacity: 0.5;
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div
        className="
          w-25 h-25
          border-4 border-transparent
          border-t-[5px] border-t-red-500
          rounded-full
          transition-all duration-500
        "
        style={{
          animation:
            "rotation_51512 1.2s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86)",
        }}
      ></div>
    </div>
  );
};
export default Loading;
