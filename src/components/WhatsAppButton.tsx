const WhatsAppButton = () => {
  const phoneNumber = "917411747404";
  const url = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 top-[20%] md:top-1/2 -translate-y-1/2 z-50 group flex items-center"
    >
      {/* Tooltip */}
      <span className="absolute right-full mr-3 whitespace-nowrap bg-white text-gray-800 text-sm font-semibold px-4 py-2 rounded-lg shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-300">
        Chat on WhatsApp
      </span>

      {/* Button */}
      <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-[#25D366]/40 transition-all duration-300">
        <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
          <path d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.502 1.13 6.746 3.048 9.382L1.06 31.372l6.188-1.962A15.91 15.91 0 0 0 16.004 32C24.826 32 32 24.826 32 16S24.826 0 16.004 0zm9.302 22.602c-.388 1.094-1.938 2.002-3.164 2.266-.84.178-1.938.32-5.632-1.212-4.726-1.96-7.77-6.754-8.006-7.068-.228-.314-1.876-2.498-1.876-4.764s1.186-3.382 1.608-3.844c.388-.424.916-.618 1.222-.618.148 0 .282.008.402.014.422.018.634.042.912.708.348.832 1.2 2.924 1.304 3.138.106.214.208.498.068.792-.132.3-.248.434-.462.682-.214.248-.418.44-.632.708-.196.234-.416.484-.178.912.238.422 1.058 1.746 2.272 2.828 1.562 1.394 2.878 1.826 3.288 2.028.31.152.682.128.928-.132.312-.334.698-.888 1.092-1.434.28-.388.634-.44.976-.3.348.134 2.192 1.034 2.568 1.222.376.19.626.282.718.44.09.156.09.908-.298 2.002z" />
        </svg>
      </div>
    </a>
  );
};

export default WhatsAppButton;
