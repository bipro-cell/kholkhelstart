import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WordpressService {
	url='http://riwayatedilli.com/site/wp-json/wp/v2/';
	totalPosts=null;
	pages:any;

  constructor(private http:HttpClient) { 

  }
  getPosts(page=1){

  	let options={
  			observe:"response" as "body",
  			params:{
  				per_page:'5',
  				page:''+page
  			}
  	};
  	return this.http.get<any[]>('${this.url}posts?_embed',options).pipe(
  		map(res=>{
  			this.pages=res['headers'].get('x-wp-totalpages');
  			this.totalPosts=res['headers'].get('x-wp-total');

  			let data=res['body'];
  			for(let post of data){
  				post.media_url=post['_embedded']['wp:featuremedia'][0]['mediadetails'].size['medium'].source_url;
  			}

  		})
  		);
  }
  getPostContent(id){
  		return this.http.get<any[]>('${this.url}posts/${id}?_embed').pipe(
  		map(res=>{
  			this.pages=res['headers'].get('x-wp-totalpages');
  			this.totalPosts=res['headers'].get('x-wp-total');

  			let data=res['body'];
  			for(let post of data){
  				post.media_url=post['_embedded']['wp:featuremedia'][0]['mediadetails'].size['medium'].source_url;
  			}

  		})
  		);
   }
}
