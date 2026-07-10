document.addEventListener("DOMContentLoaded", function() {
    const header = document.createElement("header");
    header.className = "m-6 bg-gradient-to-r to-blue-500 from-purple-600 text-white rounded-xl shadow-lg sticky top-10 z-50";
    header.innerHTML = `
        <div class="flex items-center justify-between px-8 py-6">
            <div class="flex items-center gap-4">
                <img src="spark.png" alt="Spark Logo" class="w-12 h-12">
                <h1 class="text-3xl font-bold">Spark X3</h1>
            </div>

            <nav class="flex gap-6 text-lg">
                <a href="/" class="hover:underline">Home</a>
            </nav>
        </div>
    `;
    document.body.prepend(header);
});