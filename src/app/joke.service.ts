import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class JokeService {

  constructor(private http:HttpClient) { }
  getJoke(){
    const result = this.http.get('https://official-joke-api.appspot.com/jokes/random')
    return result
  }
}
