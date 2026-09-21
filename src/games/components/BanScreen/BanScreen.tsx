import { useLanguage } from "../../../localisation/LanguageContext";

interface Props {
  deviceId: string;
  reason?: string;
  expiresAt?: number | null;
}

function formatDate(timestamp: number | null | undefined) {
  if (timestamp === null || timestamp === undefined) {
    return "Permanent";
  }

  return new Date(timestamp).toLocaleString();
}

export default function BanScreen({
  deviceId,
  reason,
  expiresAt,
}: Props) {

  const strings = useLanguage().lang.src;

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-5 text-white">
      <section className="w-full max-w-lg">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl sm:p-8">
          {/* Branding */}
          <div className="mb-8">
            <div className="text-lg font-extrabold tracking-tight">
              {strings.pages.banScreen.title}
            </div>

            <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
              {strings.pages.banScreen.subtitle}
            </div>
          </div>

          {/* Heading */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {strings.pages.banScreen.accessRestricted}
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {strings.pages.banScreen.accessRestrictedSublineText}
            </p>
          </div>

          {/* Details */}
          <div className="mt-7 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950">
            <div className="border-b border-zinc-800 px-4 py-4">
              <div className="text-xs font-medium text-zinc-600">
                {strings.pages.banScreen.deviceReference}
              </div>

              <code className="mt-2 block break-all text-sm text-zinc-300">
                {deviceId}
              </code>
            </div>

            {reason && (
              <div className="border-b border-zinc-800 px-4 py-4">
                <div className="text-xs font-medium text-zinc-600">
                  {strings.pages.banScreen.reason}
                </div>

                <div className="mt-1 text-sm text-zinc-300">
                  {strings.meta?.flag == "🇬🇧" ? reason : strings.pages.banScreen.reasonNotAvailable}
                </div>
              </div>
            )}

            <div className="px-4 py-4">
              <div className="text-xs font-medium text-zinc-600">
                {strings.pages.banScreen.expiresAt}
              </div>

              <div className="mt-1 text-sm text-zinc-300">
                {formatDate(expiresAt)}
              </div>
            </div>
          </div>

          {/* Help */}
          <div className="mt-6 rounded-lg border border-zinc-800 bg-zinc-900/50 p-4">
            <p className="text-xs leading-5 text-zinc-500">
              {strings.pages.banScreen.errorHelptextLong}
            </p>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-700">
          {strings.pages.banScreen.baselineBranding}
        </p>
      </section>
    </main>
  );
}