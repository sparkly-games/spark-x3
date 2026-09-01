const cards = [
    {
        ref: "sparxscience",
        description: "Explore the wonders of science and how it shapes our world.",
        disabled: false,
        type: "trdp"
    },
    {
        ref: "sparxreader",
        description: "Dive into a world of literature and enhance your reading experience.",
        disabled: false,
        type: "trdp"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("card-container");

    cards.forEach(card => {
        const html = `
            <a
                href="${card.disabled ? "#" : `http://${card.ref}.${window.location.hostname}`}"
                target="_blank"
                rel="noopener noreferrer"
                ${card.disabled ? 'aria-disabled="true"' : ""}
                class="group rounded-xl border border-gray-700 bg-[#1C2128] p-6 shadow-lg transition
                    ${card.disabled
                        ? "opacity-50 cursor-not-allowed pointer-events-none"
                        : "hover:-translate-y-1 hover:border-blue-500 hover:shadow-2xl"}"
            >
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-xs uppercase tracking-widest text-gray-400">
                            Reference
                        </p>

                        <h3 class="mt-2 text-2xl font-semibold text-white">
                            ${card.ref}
                        </h3>

                        <p class="mt-4 text-sm text-gray-300">
                            ${card.description}
                        </p>

                        <p class="mt-4 text-sm font-medium text-gray-400">
                            TYPE: ${card.type}
                        </p>
                    </div>

                    <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#161B22] text-white transition ${
                        card.disabled ? "" : "group-hover:bg-blue-600"
                    }">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="h-5 w-5"
                             fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor"
                             stroke-width="2.5">
                            <path stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M9 6l6 6-6 6"/>
                        </svg>
                    </div>
                </div>
            </a>
        `;

        container.insertAdjacentHTML("beforeend", html);
    });
});