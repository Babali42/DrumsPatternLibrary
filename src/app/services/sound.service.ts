import {Injectable} from '@angular/core';
import {Sample} from '../models/sample';
import {Track} from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  index: number;
  bpm: number = 120;
  isPlaying: boolean = false;

  private samples: Sample[] = [];
  private audioContext: AudioContext;
  private tracks: Track[] = [];
  private ms: number = this.getMillisStepFromBpm();

  constructor() {
    this.audioContext = new AudioContext();
    this.index = 0;
    this.scheduler();
  }

  playPause() {
    this.isPlaying = !this.isPlaying;
  }

  scheduler() {
    if (this.isPlaying) {
      this.playSamples(this.index);
      //this.index < 15 ? this.index++ : this.index = 0;
    }

    setTimeout(() => {
      this.scheduler();
    }, this.ms);
  }

  private getMillisStepFromBpm(): number {
    let beat = 60000 / this.bpm;
    let quaterBeat = beat / 4;
    quaterBeat = Math.min(quaterBeat, 1000);
    quaterBeat = Math.max(quaterBeat, 10);
    return quaterBeat;
  }

  playSamples(index: number) {
    let recordingBuffer = this.audioContext.createBuffer(2, this.audioContext.sampleRate * 10, this.audioContext.sampleRate);
    const offlineContext = new OfflineAudioContext(2, recordingBuffer.length, recordingBuffer.sampleRate);


    let channelMerger = this.audioContext.createChannelMerger(this.tracks.length);

    this.tracks.forEach(track => {
      //if (track.steps[index]) {
        let audioBuffer =  this.samples.find(x => x.fileName === track.fileName)!.sample!;
        let audioBufferSourceNode = this.audioContext.createBufferSource();
        audioBufferSourceNode.buffer = audioBuffer;
        let gain = this.audioContext.createGain();
        audioBufferSourceNode.connect(gain);
        gain.connect(channelMerger, 0, 0);

      // Create a final gain node to control the overall volume
      const masterGain = this.audioContext.createGain();
      channelMerger.connect(masterGain);

      // Connect the master gain to the recording buffer
      masterGain.connect(offlineContext.destination);

        audioBufferSourceNode.start();
        setTimeout(() => {
          audioBufferSourceNode.stop();
        }, 7000);
      //}


    });

      // Get an AudioBufferSourceNode.
      // This is the AudioNode to use when we want to play an AudioBuffer
      const source = this.audioContext.createBufferSource();
      source.buffer = recordingBuffer;
      source.connect(this.audioContext.destination);
      source.start();
  }

  playSound(buffer: AudioBuffer): void {
    let source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start(0);
  }


  reset(): void {
    this.isPlaying = false;
    this.index = 0;
  }

  setBpm(bpm: number): void {
    this.bpm = bpm;
    this.ms = this.getMillisStepFromBpm();
  }

  setTracks(tracks: Track[]) {
    this.tracks = tracks;
    let trackNames = tracks.map(x => x.fileName);
    this.loadTracks(trackNames);
  }

  private loadTracks(trackNames: string[]) {
    trackNames.forEach(x => this.samples.push(new Sample(x)))
    this.samples.forEach((sample) => {
      this.getAudioBuffer(sample.fileName).then(arrayBuffer => {
        sample.sample = arrayBuffer;
      });
    });
  }

  private async getAudioBuffer(soundName: String): Promise<AudioBuffer> {
    let myRequest = new Request(`assets/sounds/${soundName}`);
    const response = await fetch(myRequest);
    const arrayBuffer = await response.arrayBuffer();
    return await this.audioContext.decodeAudioData(arrayBuffer).then((data) => {
      return data
    });
  }
}
