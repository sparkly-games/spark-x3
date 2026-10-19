(function() {
  // Store the original eval function
  const originalEval = window.eval;

  // Override the eval function
  window.eval = function(code) {
    code = code.replace("window.location[_0xcdc9('0x1')] = _0x3296f7;", 'return;')
    return originalEval(code);
  };
})();



  var extra_params = {
    archive_location_filter: function( path ) {
      return ("archive" + path + "");
    },
    engine_arguments: ["--verify-graphics-calls=false",],
    custom_heap_size: 134217728,
    full_screen_container: "#canvas-container",
    disable_context_menu: true
  }

  Module['INITIAL_MEMORY'] = extra_params.custom_heap_size;

  Module['onRuntimeInitialized'] = function() {
    Module.runApp("canvas", extra_params);
  };

  Module["locateFile"] = function(path, scriptDirectory)
  {
    // dmengine*.wasm is hardcoded in the built JS loader for WASM,
    // we need to replace it here with the correct project name.
    if (path == "dmengine.wasm" || path == "dmengine_release.wasm" || path == "dmengine_headless.wasm") {
      path = "assets/MonkeyMart.wasm";
    }
    return scriptDirectory + path;
  };

  var is_iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  var buttonHeight = 0;
  var prevInnerWidth = -1;
  var prevInnerHeight = -1;


  function resize_game_canvas() {
    // Hack for iOS when exit from Fullscreen mode
    if (is_iOS) {
      window.scrollTo(0, 0);
    }

    var app_container = document.getElementById('app-container');
    var game_canvas = document.getElementById('canvas');
    var progress_bar_root = document.getElementById('progress-bar-root');
    var progress_bar_fg = document.getElementById('progress-bar-fg');
    var progress_bar_bg = document.getElementById('progress-bar-bg');
    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight - buttonHeight;
    if (prevInnerWidth == innerWidth && prevInnerHeight == innerHeight)
    {
      return;
    }
    prevInnerWidth = innerWidth;
    prevInnerHeight = innerHeight;
    var width = 960;
    var height = 640;
    var targetRatio = width / height;
    var actualRatio = innerWidth / innerHeight;
  
  
    //Stretch
    width = innerWidth;
    height = innerHeight;
  
  
  
    app_container.style.width = width + "px";
    app_container.style.height = height + buttonHeight + "px";
    game_canvas.width = width;
    game_canvas.height = height;

    // progress bar
    var bar_h = width < height ? width:height;
    progress_bar_bg.width = Math.min(Math.ceil(bar_h * 0.06 * 300/24),width * 0.8);

    progress_bar_bg.style.marginLeft = - progress_bar_bg.width/2 + "px";
    progress_bar_fg.width =  Math.ceil(progress_bar_bg.width * 1);

    progress_bar_fg.style.marginTop = (progress_bar_bg.width * 0) * (0)/2 + "px";
    progress_bar_fg.style.marginLeft = -progress_bar_bg.width/2 - progress_bar_fg.width/2 + "px";

    // progress_bar_text.style.fontSize = Math.ceil(bar_h * 0.10) + "px";
    progress_bar_root.style.bottom = Math.ceil(height*0.08 + buttonHeight) + "px";
  }
  resize_game_canvas();
  window.addEventListener('resize', resize_game_canvas, false);
  window.addEventListener('orientationchange', resize_game_canvas, false);
  // window.addEventListener('wheel', e => e.preventDefault(), { passive: false });
  window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);
  window.addEventListener('focus', resize_game_canvas, false);
  
            // 
            // HashSHA1 implementation
            !function(){var r=function(r){for(var n="",t=7;t>=0;t--)n+="0123456789abcdef".charAt(r>>4*t&15);return n},n=function(r,n){var t=(65535&r)+(65535&n);return(r>>16)+(n>>16)+(t>>16)<<16|65535&t},e=function(r,n){return r<<n|r>>>32-n},o=function(r,n,t,e){return r<20?n&t|~n&e:r<40?n^t^e:r<60?n&t|n&e|t&e:n^t^e},u=function(r){return r<20?1518500249:r<40?1859775393:r<60?-1894007588:-899497514};window._HashSHA1=function(f){for(var a=function(r){for(var n=1+(r.length+8>>6),t=new Array(16*n),e=0;e<16*n;e++)t[e]=0;for(e=0;e<r.length;e++)t[e>>2]|=r.charCodeAt(e)<<24-e%4*8;return t[e>>2]|=128<<24-e%4*8,t[16*n-1]=8*r.length,t}(f),c=new Array(80),i=1732584193,h=-271733879,v=-1732584194,A=271733878,g=-1009589776,l=0;l<a.length;l+=16){for(var w=i,d=h,y=v,H=A,b=g,s=0;s<80;s++)c[s]=s<16?a[l+s]:e(c[s-3]^c[s-8]^c[s-14]^c[s-16],1),t=n(n(e(i,5),o(s,h,v,A)),n(n(g,c[s]),u(s))),g=A,A=v,v=e(h,30),h=i,i=t;i=n(i,w),h=n(h,d),v=n(v,y),A=n(A,H),g=n(g,b)}return r(i)+r(h)+r(v)+r(A)+r(g)}}();
            // 

            var old_preloadAndCallMain = Module._preloadAndCallMain;
            Module._preloadAndCallMain = function () {
                // 
                // Delete all LiveUpdate files stored in IDBFS
                var dir = DMSYS.GetUserPersistentDataRoot();
                var resDir = _HashSHA1("MonkeyMart");
                try {
                    FS.unlink(dir + "/." + resDir + "/liveupdate.arcd");
                } catch (e) {}
                try {
                    FS.unlink(dir + "/." + resDir + "/liveupdate.arci");
                } catch (e) {}
                try {
                    FS.unlink(dir + "/." + resDir + "/liveupdate.arci.tmp");
                } catch (e) {}
                try {
                    FS.unlink(dir + "/." + resDir + "/liveupdate.mounts");
                } catch (e) {}
                // 

                if (Module._archiveLoaded) {
                    // 
                }
                old_preloadAndCallMain();
            };