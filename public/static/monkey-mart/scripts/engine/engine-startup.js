         var currentPercentage = 0;

         Progress.updateProgress = function (percentage) {
            Progress.notifyListeners(percentage);
            if (currentPercentage > percentage) {
               percentage = currentPercentage;
            }
            currentPercentage = percentage;
            // var progress_bar_text = document.getElementById('progress-bar-text');
            // progress_bar_text.innerHTML  = "<b>" +  Math.ceil(percentage) + "%</b>";

            var fg = document.getElementById("progress-bar-fg");
            fg.style.clip =
               "rect(0px," +
               (fg.width * percentage) / 100 +
               "px," +
               fg.height +
               "px," +
               "0px)";

            if (isNaN(percentage)) {
               var progress_bar_root =
                  document.getElementById("progress-bar-root");
               progress_bar_root.style.visibility = "hidden";
            }
         };
         Progress.addProgress = function () {
            var progress_bar_root =
               document.getElementById("progress-bar-root");
            progress_bar_root.style.visibility = "visible";
         };
         Progress.removeProgress = function () {
            var progress_bar_root =
               document.getElementById("progress-bar-root");
            progress_bar_root.style.visibility = "hidden";
            // Remove any background/splash image that was set in runApp().
            // Workaround for Safari bug DEF-3061.
            Module.canvas.style.background = "";
         };

         EngineLoader.stream_wasm = "false" === "true";
         EngineLoader.load("canvas", "MonkeyMart");