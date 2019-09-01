import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
videos: any[] = [];
videloSel: any;
  constructor( public service: YoutubeService) { 

    this.service.getVideos().subscribe(videos=>{

      this.videos = videos;
       console.log(this.videos);
    });
  }

  ngOnInit() {
  }

  verVideo(video: any) {
      this.videloSel = video;
      $('#myModal').modal();
  }
  cerrarModal(){
    this.videloSel = null;
    $('#myModal').modal('hide');
  }

  cargarMas(){
    this.service.getVideos().subscribe(videos => {
      this.videos.push.apply(this.videos, videos);
    });

  }

}
