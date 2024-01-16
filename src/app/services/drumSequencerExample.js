AudioContext = window.AudioContext || webkitAudioContext;
OfflineAudioContext = window.OfflineAudioContext || webkitOfflineAudioContext;

var drumMachineApp = angular.module("drumMachineApp", []);

// A global AudioContext services + controllers can reach
drumMachineApp.service('contextService', function() {
  this.context = new AudioContext();
});

// Something to hold this rhythm
// TODO: investigate using objects instead of numbers for beats
drumMachineApp.service('rhythmService', function() {
  // Lets make it shorter for smaller screens
  if (window.innerWidth < 700) {
    this.rhythm = {
      patterns: [{
        sound: "hat",
        beats: [0, 0, 1, 0, 0, 0, 1, 0]
      }, {
        sound: "snare",
        beats: [0, 0, 0, 0, 1, 0, 0, 0]
      }, {
        sound: "kick",
        beats: [1, 0, 0, 0, 1, 0, 0, 0]
      }]
    };
  } else {
    this.rhythm = {
      patterns: [{
        sound: "hat",
        beats: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]
      }, {
        sound: "snare",
        beats: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]
      }, {
        sound: "kick",
        beats: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]
      }]
    };
  }
});

// Place for some audio-specific code
drumMachineApp.service('audioService', function(contextService, $q) {
  this.context = contextService.context;

  this.loadBuffer = function(url) {
    var context = new OfflineAudioContext(2, 1, 44100);
    return $q(function(resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = function() {
        context.decodeAudioData(request.response, resolve, reject);
      };
      request.onerror = reject;
      request.send();
    });
  };

  this._buffers = {};
  // Retrieve a pre-loaded buffer
  this.getBuffer = function(name) {
    return this._buffers[name];
  };

  // Load up the sounds... app will fail in an ugly way if this doesn't work.
  this.loadBuffer("snare.wav").then(function(buffer) {
    this._buffers["snare"] = buffer;
  }.bind(this));
  this.loadBuffer("kick.wav").then(function(buffer) {
    this._buffers["kick"] = buffer;
  }.bind(this));
  this.loadBuffer("hat.wav").then(function(buffer) {
    this._buffers["hat"] = buffer;
  }.bind(this));

});

drumMachineApp.controller("RhythmCtrl", function($scope, $q, contextService, audioService, rhythmService) {

  $scope.context = contextService.context;

  // stackoverflow.com/questions/12740329/math-functions-in-angular-bindings
  $scope.Math = Math;

  // Where the playhead is
  $scope.cursor = 0;

  // Beats per minute
  $scope.tempo = 128;

  // Our actual rhythm pattern
  $scope.rhythm = rhythmService.rhythm;

  $scope.rhythmLength = $scope.rhythm.patterns[0].beats.length;

  // Process a change to a pattern
  $scope.patternClick = function(sound, index) {
    $scope.rhythm.patterns.some(function(pattern) {
      if (pattern.sound === sound) {
        originalVal = pattern.beats[index];
        console.log(originalVal);
        if (originalVal > 0) {
          pattern.beats[index] = 0;
        } else {
          // We could put velocity here, perhaps based on the cmd key
          pattern.beats[index] = 1;
        }
        return true;
      }
    });
    $scope.refreshAudio();
  };

  // Process a change to the tempo.
  $scope.tempoChange = function() {
    if ($scope.tempo > 1000) {
      $scope.tempo = 1000;
    } else if ($scope.tempo < 10) {
      $scope.tempo = 10;
    }
    $scope.refreshAudio();
  };

  // If playing, pause and re-play
  // to generate a new audio loop.
  $scope.refreshAudio = function() {
    if ($scope.playing) {
      $scope.pause();
      $scope.play();
    }
  };

  // Begin the pattern running
  $scope.play = function() {
    // Remember where we started this play (to keep track of where the
    // actual cursor is)
    $scope.startedPlaying = $scope.context.currentTime;
    // Determine when the last tick would have occurred,
    // in order to know when to increment the cursor.
    $scope.lastTick = $scope.context.currentTime - ($scope.cursor % 1) * $scope.getTickLength();
    // Remember where the cursor was when playback began.
    $scope.cursorAtPlay = $scope.cursor;
    $scope.startPlayback();
  };

  // Initiate audio playback, then set playing flag to true.
  $scope.startPlayback = function() {
    $scope.renderPattern().then($scope.playLoop).then(function() {
      $scope.playing = true;
    });
  };

  // Stop audio playback
  $scope.stopPlayback = function() {
    $scope.playbackSource.stop($scope.context.currentTime);
  };

  // Initiate playback of the rendered loop buffer, setting
  // it to $scope.playbackSource for later stop()ing
  $scope.playLoop = function(loopBuffer) {
    var source = $scope.context.createBufferSource();
    source.buffer = loopBuffer;
    source.connect($scope.context.destination);
    source.loop = true;
    source.start($scope.context.currentTime, $scope.cursor * $scope.getTickLength());
    if ($scope.playbackSource) {
      $scope.playbackSource.stop($scope.context.currentTime);
    }
    $scope.playbackSource = source;
  };

  /*
   * Return the time length of a tick on the drum machine (1/16th note)
   */
  $scope.getTickLength = function() {
    return 60 / $scope.tempo / 4;
  };

  /*
   * Return a Promise that resolves with an audio buffer
   * of the current loop.
   * TODO: Refactoring thoughts:
   *  - Moving out of controller, simply pass scope state in as args
   */
  $scope.renderPattern = function() {
    var startTime = $scope.context.currentTime;
    return $q(function(resolve, reject) {
      var tickLength = $scope.getTickLength();
      var context = new OfflineAudioContext(1, $scope.rhythmLength * tickLength * 44100, 44100);
      $scope.rhythm.patterns.forEach(function(pattern) {
        var buffer = audioService.getBuffer(pattern.sound);
        pattern.beats.forEach(function(beat, i) {
          if (beat > 0) {
            var source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(context.destination);
            var when = i * tickLength;
            source.start(when);
          }
        });
      });
      context.startRendering();
      context.oncomplete = function(e) {
        console.log("Render took " + ($scope.context.currentTime - startTime).toFixed(3) + "s.");
        resolve(e.renderedBuffer);
      };
    });
  };

  // Pause the pattern
  $scope.pause = function() {
    if (!$scope.playing) {
      return;
    }
    $scope.stopPlayback();
    $scope.updateCursor();
    $scope.playing = false;
  };


  /* Update cursor on pause
   * TODO: better name?
   *
   * Adjusts the cursor position in order to maintain
   * sub-tick precision.
   */
  $scope.updateCursor = function() {
    // Loop ran for this long
    var playedTime = $scope.context.currentTime - $scope.startedPlaying;
    var playedTicks = playedTime / $scope.getTickLength();
    $scope.cursor = ($scope.cursorAtPlay + playedTicks) % $scope.rhythmLength;
  };

  // Pause and return to beginning
  $scope.stop = function() {
    $scope.pause();
    $scope.cursor = 0;
  };

  /* Instead of setInterval, run a continuous loop
   * on requestAnimationFrame, referencing the
   * (reliable) context.currentTime
   */
  $scope.update = function() {
    if ($scope.playing) {
      var tickLength = $scope.getTickLength();
      // Add ticks that have passed since last check.
      while ($scope.context.currentTime > ($scope.lastTick + tickLength)) {
        $scope.lastTick = $scope.lastTick + tickLength;
        $scope.cursor++;
        $scope.cursor = $scope.cursor % $scope.rhythmLength;
        $scope.$apply();
      }
    }
    requestAnimationFrame($scope.update);
  };
  // Begin animation loop.
  $scope.update();
});
