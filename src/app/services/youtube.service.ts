import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { map } from 'rxjs/operators';


// https://www.googleapis.com/youtube/v3/channels
// APIKEY // AIzaSyA13zooCciT7Tq9FTI5TzdqkBWdXtrMsm0
// uploads UUuaPTYj15JSkETGnEseaFFg
// Lista de videos
// https://www.googleapis.com/youtube/v3/playlistItems
@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl:string = 'https://www.googleapis.com/youtube/v3';
  private apikey: string = 'AIzaSyByPksOk_yBISRzp-x0k51ZxNbd8OrzE90';
  private playlist: string = 'UUuaPTYj15JSkETGnEseaFFg';
  
  private nextPageToken: string;
  constructor( public http: HttpClient) { }

    getVideos() {
      let url = `${this.youtubeUrl}/playlistItems`;
      let params = new HttpParams();
      params = params.append( 'part' , 'snippet' );
      params = params.append( 'maxResults' , '10' );
      params = params.append( 'playlistId' , this.playlist );
      params = params.append( 'key' , this.apikey );
      if (this.nextPageToken) {
        console.log(this.nextPageToken);
        params = params.append( 'pageToken' , this.nextPageToken );
      }

      return this.http.get(url, { params: params} )
        .pipe(
          map(data => {
            console.log(data);
            //this.nextPageToken = JSON.stringify(data['nextPageToken']);
            this.nextPageToken = data['nextPageToken'];
            console.log (this.nextPageToken);
            let videos:any[]=[];
            for(let video of data['items']){
              let snippet= video.snippet;
              videos.push(snippet);
            }
            console.log(videos);
            return videos;

          })
        );
    }
}
