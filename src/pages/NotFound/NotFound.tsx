import { useEffect, useState, useRef } from "react";

export default function NotFound() {
  const [message, setMessage] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    if ( window.top == window.self ) {
        const text = "you are being redirected...";
        indexRef.current = 0;

        const interval = setInterval(() => {
        if (indexRef.current <= text.length) {
            setMessage(text.slice(0, indexRef.current));
            indexRef.current += 1;
        } else {
            clearInterval(interval);
        }
        }, 70);

        const redirect = setTimeout(() => {
        window.location.href = "/";
        }, 3500);

        return () => {
        clearInterval(interval);
        clearTimeout(redirect);
        };
    };
  }, []);

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center shadow-2xl">
        <div className="inline-flex items-center rounded-md border border-red-500/20 bg-red-500/10 px-3 py-1">
          <span className="text-xs font-semibold tracking-wider text-red-400">
            ERROR 404
          </span>
        </div>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-white">
          Page not found
        </h1>

        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-6 border-t border-zinc-800 pt-5 min-h-[32px] flex items-center justify-center">
          <code className="font-mono text-xs text-zinc-400">
            {message}
            <span className="ml-1 animate-pulse text-red-400 font-bold">
              _
            </span>
          </code>
        </div>
      </div>
    </main>
  );
}