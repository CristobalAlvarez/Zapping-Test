import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import Hls from 'hls.js';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports: [CommonModule]
})
export class IndexComponent implements OnInit, AfterViewInit {

  public token = localStorage.getItem('TEST_TOKEN');
  public url: string | undefined;

  constructor() { }

  ngOnInit() {
    if (this.token) {
      this.url = `${environment.backend}/streaming/segment.m3u8?token=${this.token}`;
    }
  }

  ngAfterViewInit(): void {
    var video = document.getElementById('video') as HTMLMediaElement;
    if (!video || !this.url) return;
    if (Hls.isSupported()) {
      var hls = new Hls({
        xhrSetup: function (xhr, url) {
          const token = localStorage.getItem('TEST_TOKEN');
          if (url.includes('.ts')) {
            const separator = url.includes('?') ? '&' : '?';
            xhr.open('GET', `${url}${separator}token=${token}`, true);
          }
        },

        debug: true,
      });
      hls.loadSource(this.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        video.muted = true;
        video.play();
      });
    }
  }

}
