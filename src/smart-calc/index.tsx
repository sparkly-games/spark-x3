import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useLanguage } from "../localisation/LanguageContext";

export default function SmartCalcHomepage() {
  const { language, lang } = useLanguage();
  const [ver, setVersion] = useState(". . .");

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
        <Navbar ver={ver} />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-4">Smart Calculator</h1>
            <p className="text-lg">This is the Smart Calculator homepage.</p>
        </div>
    </>
  );
}