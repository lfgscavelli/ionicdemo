import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RestApiProvider } from '../../providers/rest-api/rest-api';
import { DetailPage } from '../detail/detail';
import { Toast } from '@ionic-native/toast';
import { Article } from '../../model/article';
import { ItemSliding } from 'ionic-angular/components/item/item-sliding';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  articles: Article[];
  article: Article;
  errorMessage: string;

  constructor(public navCtrl: NavController, public rest: RestApiProvider, private toast: Toast) {}

  ionViewDidLoad() {
    this.getArticles();
  }

  getArticles() {
    this.rest.getArticles('132')
      .subscribe(
        articles => this.articles = articles.items,
        error =>  this.errorMessage = <any>error
      );
  }

  articleSelected(c) {
    this.rest.getArticle(c.url)
      .subscribe(
        article => this.navCtrl.push(DetailPage, {article: article}),
        error =>  this.errorMessage = <any>error
      );
    
    /*
    this.toast.show(c.title, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );*/
  }

}
