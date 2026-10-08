const cards = [
    {
        ref: "sparxmaths",
        disabled: false
    },
    {
        ref: "classcharts",
        disabled: false
    },
    {
        ref: "senecalearning",
        disabled: false
    },
    {
        ref: "msword",
        disabled: false
    },
    {
        ref: "sparxscience",
        disabled: false,
        ign: true
    },
    {
        ref: "sparxreader",
        disabled: false,
        ign: true
    }
];

const errors = {
    1: {
        display: "No Websites",
        message:
            "No websites are available at this moment. Please check again in a few hours."
    }
};

const errorActive = (error) => {
    for (const errorDiv of document.querySelectorAll("#errorDiv")) {
        errorDiv.innerHTML = `
            <div class="max-w-6xl mx-auto px-6">
                <div class="rounded-xl border border-gray-700 bg-red-500 p-6 shadow-lg text-center">
                    <h3 class="text-2xl font-semibold text-white">
                        Error ${error}: ${errors[error].display}
                    </h3>

                    <p class="mt-4 text-sm text-gray-300">
                        ${errors[error].message}
                    </p>
                </div>
            </div>
        `;
    }
};

const host =
    window.location.hostname === "localhost"
        ? "spark.lgbt.sh"
        : window.location.hostname;

const addVersions = async (cards) => {
    await Promise.all(
        cards.map(async (card) => {
            try {

                if (card.ign) {
                    card.ver = "Unavailable";
                    return;
                }
                
                const response = await fetch(
                    `https://${card.ref}.${host}/version.txt`
                );

                if (response.ok) {
                    card.ver = await response.text();
                } else {
                    card.disabled = true;
                }
            } catch (error) {
                console.error(`Failed to fetch ${card.ref}:`, error);
                card.disabled = true;
            }
        })
    );
};

document.addEventListener("DOMContentLoaded", async () => {
    
    await addVersions(cards);

    if (cards.filter((card) => !card.disabled).length === 0) {
        errorActive(1);
    }

    const container = document.getElementById("card-container");

    cards.forEach((card) => {
        const html = `
            <a
                href="${
                    card.disabled
                        ? "#"
                        : `https://${card.ref}.${host}`
                }"
                target="_blank"
                rel="noopener noreferrer"
                ${card.disabled ? 'aria-disabled="true"' : ""}
                class="group rounded-xl border border-gray-700 bg-[#1C2128] p-6 shadow-lg transition
                    ${
                        card.disabled
                            ? "opacity-50 cursor-not-allowed pointer-events-none"
                            : "hover:-translate-y-1 hover:border-blue-500 hover:shadow-2xl"
                    }"
            >
                <div class="flex justify-between items-start">

                    <div>
                        <p class="text-xs uppercase tracking-widest text-gray-400">
                            Reference
                        </p>

                        <h3 class="mt-2 text-2xl font-semibold text-white">
                            ${card.ref}
                        </h3>

                        <p class="mt-4 text-sm font-medium text-gray-400">
                            VER: ${card.ver ?? "Unknown"}
                        </p>
                    </div>

                    <div
                        class="flex h-11 w-11 items-center justify-center rounded-full bg-[#161B22] text-white transition ${
                            card.disabled ? "" : "group-hover:bg-blue-600"
                        }"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2.5"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 6l6 6-6 6"
                            />
                        </svg>
                    </div>

                </div>
            </a>
        `;

        container.insertAdjacentHTML("beforeend", html);
    });
});