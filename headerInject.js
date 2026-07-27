document.addEventListener("DOMContentLoaded", () => {
    const header = document.createElement("header");

    header.className =
        "mx-6 mt-6 sticky top-6 z-50 rounded-xl border border-gray-700 bg-[#1C2128]/90 backdrop-blur shadow-lg";

    header.innerHTML = `
        <div class="flex items-center justify-between px-8 py-5">
            <div class="flex items-center gap-4">
                <img src="spark.png" alt="Spark Logo" class="w-12 h-12">
                <h1 class="text-3xl font-bold text-white">Spark X3</h1>
            </div>

            <nav class="flex gap-6 text-lg">
                <a href="/" class="text-slate-300 hover:text-blue-400 transition-colors">
                    Home
                </a>
            </nav>
        </div>

        <div class="h-1 w-full rounded-b-xl bg-gradient-to-r from-blue-500 to-purple-500"></div>
    `;

    document.body.prepend(header);
});