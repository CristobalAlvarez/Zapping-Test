import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  imports: [CommonModule]
})
export class IndexComponent implements OnInit {

  public url: string | undefined;

  constructor() { }

  ngOnInit() {
    const token = localStorage.getItem('TEST_TOKEN');
    if (token) {
      this.url = `http://localhost:8080/streaming/segment.m3u8?token=${token}`;
    }
  }

}
