         function poki_showBanner(vBanner) {
            PokiSDK.displayAd(document.getElementById(vBanner), "320x50");
         }

         function poki_showBigBanner(vBanner) {
            PokiSDK.displayAd(document.getElementById(vBanner), "728x90");
         }

         function poki_hideBanner(vBanner) {
            PokiSDK.destroyAd(document.getElementById(vBanner));
         }

         PokiSDK.gameLoadingStart();
         var data = {};
         var isLoadFinished = false;
         Progress.addListener(function (percentage) {
            data.percentageDone = percentage / 100;
            if (!isLoadFinished) PokiSDK.gameLoadingProgress(data);
            if (percentage == 100 && !isLoadFinished) {
               PokiSDK.gameLoadingFinished();
               isLoadFinished = true;
            }
         });
         Module["onRuntimeInitialized"] = function () {
            PokiSDK.init()
               .then(() => {
                  Module.runApp("canvas", extra_params);
               })
               .catch(() => {
                  Module.runApp("canvas", extra_params);
               });
         };