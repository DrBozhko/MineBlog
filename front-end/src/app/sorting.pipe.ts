import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(posts:any, category = '') {
    if (!category || category == '') {
      return posts;
    }

    return posts.filter((posts: {
      category: string,
      title: string,
      photo: string,
      text: string,
      author: string,
      date: Date
    }) => {
      return posts.category.toLowerCase() == category.toLowerCase();
    })
  }

}
