import { Link } from './model/link.model';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgTinyUrlService } from 'ng-tiny-url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'link-shorter';
  links: Link[] = [];
  linkToBeShortened: string;
  linkShortened: string;
  copy: boolean = false;
  loaded: boolean = false;
  isLoading: boolean = false;
  constructor(private tinyUrl: NgTinyUrlService) {

  }


  onSubmit(form: NgForm) {
    if (form.value.link.includes('http://') || form.value.link.includes('https://')) {
      this.loaded = true;
      this.tinyUrl.shorten(form.value.link).subscribe(data => {
        this.isLoading = true;
        let link: any = {};
        link.linkToBeShortened = form.value.link;
        link.linkShortened = data;
        link.copy = false;
        this.links.push(link);
        this.loaded = false;
        form.resetForm();
      }, error => {
        this.loaded = false;
        console.log(error);
      })
    } else {
      alert('Please enter a valid URL with http:// or https://');
      form.resetForm();
    }
  }

  changeName(link: Link): void {
    link.copy = true;
  }
}
