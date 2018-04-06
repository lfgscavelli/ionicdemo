export class Article {
  id: number;
  title: string;
  url: string;
  image: string;
  content_html: string;
  date_created: Date;
  date_modified: Date;
  author: Object;
  constructor(values: Object = {}) {
       Object.assign(this, values);
  }
}