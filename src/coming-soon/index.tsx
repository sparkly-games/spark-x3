import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useLanguage } from "../localisation/LanguageContext";
import { Hourglass, Key, Trash2 } from "lucide-react";
import "../global.css"
import { useNavigate } from "react-router-dom";

export default function ComingSoon() {
  const { language, lang } = useLanguage();
  const [showUnlock, setShowUnlock] = useState(false);
  const [unlockCode, setUnlockCode] = useState("");
  const [unlockError, setUnlockError] = useState("");
  const [ver, setVersion] = useState(". . .");
  const navigate = useNavigate();

  const idToPathMap: Record<string, string> = {
    calc: "/smart-calculator",
    // Add more mappings here:
    // notes: "/notes",
    // revision: "/revision",
  };

  useEffect(() => {
    const unlockExpiry = Number(
      localStorage.getItem("sparkx3:broken-games-unlock")
    );

    // No valid unlock? Stay on the coming-soon page.
    if (!unlockExpiry || unlockExpiry <= Date.now()) {
      localStorage.removeItem("sparkx3:broken-games-unlock");
      return;
    }

    // Extract the ID from /coming-soon/:id
    const id = window.location.pathname
      .replace(/\/+$/, "")
      .split("/")
      .pop();

    const destination = id ? idToPathMap[id] : undefined;

    if (destination) {
      navigate(destination, { replace: true });
    }
  }, [navigate]);

  function handleUnlock() {
    const code = unlockCode.trim();

    if (!code) {
      setUnlockError(lang.src.pages.home.unlockErrorNoCode);
      return;
    }

    // Replace this with your actual unlock code.
    if (code !== "CLE4N-SPRX3") {
      setUnlockError(lang.src.pages.home.unlockErrorInvalidCode);
      return;
    }

    // 6 hours from now.
    const expiresAt =
      Date.now() + 6 * 60 * 60 * 1000;

    localStorage.setItem(
      "sparkx3:broken-games-unlock",
      String(expiresAt)
    );

    setUnlockCode("");
    setUnlockError("");
    setShowUnlock(false);

    // Refresh so GameCards immediately see the unlock.
    window.location.reload();
  }

  const decodeIfBase64 = (text: string) => {
    try {
      return atob(text);
    } catch {
      return text;
    }
  };

  useEffect(() => {
      const fetchVersion = async () => {
        const versionFetched = await fetch("/version.txt")
        .then(data => data.text())
        .then(data => decodeIfBase64(data))
        .then(data => { if(data.length >= 60) data = "Unknown"; return data; })
        setVersion(versionFetched);
    };
    fetchVersion();
  }, []);
  if (language != "en") {
    return (
      <>
        <Navbar ver={ver} />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-4">{lang.src.notAvailableInYourLocale}</h1>
            <p className="text-lg">{lang.src.notAvailableInYourLocale}</p>
        </div>
      </>
    );
  }

  return (
    <>
      { showUnlock && (
        <div
          className="
            fixed
            inset-0
            z-[60]
            flex
            items-center
            justify-center
            bg-black/70
            p-5
          "
          onClick={() => setShowUnlock(false)}
        >
          <div
            className="
              w-full
              max-w-md
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              p-6
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  className="
                    mb-3
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    bg-zinc-800
                  "
                >
                  <Key
                    size={20}
                    className="text-zinc-300"
                  />
                </div>

                <h2 className="text-lg font-bold text-white">
                  {lang.src.pages.home.unlockBrokenGames}
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  {lang.src.pages.home.unlockBrokenGamesHelptext}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowUnlock(false)
                }
                className="
                  rounded-md
                  px-2
                  py-1
                  text-xl
                  leading-none
                  text-zinc-400
                  hover:bg-zinc-800
                  hover:text-white
                "
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <input
              type="text"
              value={unlockCode}
              onChange={(event) => {
                setUnlockCode(event.target.value);
                setUnlockError("");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleUnlock();
                }
              }}
              placeholder={lang.src.pages.home.brokenGamesTextInputPlaceholder}
              autoFocus
              className="
                mt-5
                w-full
                rounded-lg
                border
                border-zinc-700
                bg-zinc-950
                px-4
                py-3
                text-sm
                text-white
                outline-none
                placeholder:text-zinc-600
                focus:border-zinc-500
              "
            />

            {unlockError && (
              <p className="mt-2 text-sm text-red-400">
                {unlockError}
              </p>
            )}

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={handleUnlock}
                className="
                  flex-1
                  rounded-lg
                  bg-white
                  px-4
                  py-2
                  font-semibold
                  text-black
                  transition
                  hover:bg-zinc-200
                "
              >
                {lang.src.pages.home.unlockModalButtonText}
              </button>

              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem(
                    "sparkx3:broken-games-unlock"
                  );

                  setUnlockCode("");
                  setUnlockError("");
                  setShowUnlock(false);

                  window.location.reload();
                }}
                className="
                  flex
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-zinc-700
                  text-zinc-500
                  transition
                  hover:border-red-500/40
                  hover:bg-red-500/10
                  hover:text-red-400
                "
                aria-label="Revoke access"
                title="Revoke access"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
        <Navbar ver={ver} />
        <div className="absolute top-14 right-0 m-4 text-gray-400 text-sm">
            <Key className="w-6 h-6 inline-block mr-1" onClick={() => { setShowUnlock(true) }} />
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <Hourglass className="w-16 h-16 mb-4 hourglass-spin" />
            <h1 className="text-4xl font-bold mb-4">Hold your horses!</h1>
            <p className="text-lg">This is page is coming soon!</p>
        </div>
    </>
  );
}