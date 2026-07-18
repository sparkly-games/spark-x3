const cards = [
    {
        ref: "sparxscience",
        description: "Explore the wonders of science and how it shapes our world.",
        disabled: true
    },
    {
        ref: "sparxreader",
        description: "Dive into a world of literature and enhance your reading experience."
    },
    {
        ref: "sparxmaths",
        description: "Visit the world of mathematics and discover its beauty and logic.",
        disabled: true
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("card-container");

    cards.forEach(card => {
        const html = `
            <a
                href="${card.disabled ? "#" : `http://${card.ref}.${window.location.hostname}`}"
                ${card.disabled ? 'aria-disabled="true"' : ""}
                class="group bg-white rounded-xl shadow p-6 transition
                    ${card.disabled
                        ? "opacity-50 cursor-not-allowed pointer-events-none"
                        : "hover:shadow-xl hover:-translate-y-1"}"
            >
                <div class="flex justify-between items-start">
                    <div>
                        <p class="text-xs uppercase tracking-widest text-gray-400">
                            Reference
                        </p>

                        <h3 class="text-2xl font-semibold mt-2">
                            ${card.ref}
                        </h3>

                        <p class="mt-4 text-gray-500 text-sm">
                            ${card.description}
                        </p>
                    </div>

                    <div class="w-11 h-11 rounded-full bg-gray-900 text-white flex items-center justify-center transition ${card.disabled ? "" : "group-hover:bg-blue-600"}">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             class="w-5 h-5"
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