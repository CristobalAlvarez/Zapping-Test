import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import Hls from 'hls.js';
import { AuthService } from '../../auth/auth-service/auth.service';
import { FormsModule } from '@angular/forms';

export interface UserInfo {
  name: string;
  email: string;
}
interface ChatMessage {
  userId: number;
  message: string;
}
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports: [CommonModule, FormsModule]
})
export class IndexComponent implements OnInit, AfterViewInit, OnDestroy {

  public token = localStorage.getItem('TEST_TOKEN');
  public url: string | undefined;

  public messageInput = '';
  public chatMessages: ChatMessage[] = [];
  public exampleMessages = [
    'Me gusta mucho esta película!',
    '¡Qué divertido es el conejo grande!',
    '¡Los animalitos pequeños son muy traviesos!',
    '¿Por qué molestan tanto al pobre Buck?',
    '¡Buck Bunny es tan fuerte y valiente!',
    '¡Me encantó cuando Buck les dio una lección!',
    '¿Alguien más quiere un conejo como mascota ahora?',
    '¡Las ardillas voladoras son muy graciosas!',
    '¡Los efectos especiales son increíbles!',
    '¿Cuál es tu parte favorita de la película?',
    '¡La música es muy alegre y divertida!',
    '¡El bosque se ve tan bonito y colorido!',
    '¡Buck Bunny es el mejor superhéroe conejo!',
    '¿Habrá una segunda parte de la película?',
    '¡Mi personaje favorito es Buck!',
    '¡Las mariposas son muy lindas también!',
    '¡Me reí mucho con las bromas!',
    '¿A alguien más le dio hambre de zanahorias?',
    '¡Quiero ver esta película otra vez!'
  ]

  public userInfo: UserInfo | undefined;

  public intervalId: any = 0;

  constructor(
    public AuthService: AuthService
  ) { }

  ngOnInit() {
    if (this.token) this.url = `${environment.backend}/streaming/segment.m3u8?token=${this.token}`;
    this.AuthService.getCurrentUser().then((res) => {
      if (!res) return;
      this.userInfo = res.user;
    }).catch((err) => {
      console.error(err)
    })

  }

  ngAfterViewInit(): void {
    this.initializeLivestream();
    this.initChatSimulation();
  }

  initializeLivestream() {
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

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  initChatSimulation() {
    this.intervalId = setInterval(() => {
      const randomId = Math.floor(Math.random() * 1000);
      const randomMessage = this.exampleMessages[Math.floor(Math.random() * this.exampleMessages.length)];
      this.chatMessages.push({
        userId: randomId,
        message: randomMessage
      })
    }, 6000)
  }

  logout() {
    this.AuthService.logout();
  }

  sendMessage() {
    if (this.messageInput) {
      this.chatMessages.push({
        userId: 0,
        message: this.messageInput
      })
      this.messageInput = '';
    }
  }

}
