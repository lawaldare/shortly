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
  links: any[] = [];
  linkToBeShortened: string;
  linkShortened: string;
  copy: boolean = false;
  constructor(private tinyUrl: NgTinyUrlService) {

  }


  onSubmit(form: NgForm) {
    this.linkToBeShortened = form.value.link;;
    if (this.linkToBeShortened.includes('http://') || this.linkToBeShortened.includes('https://')) {
      this.tinyUrl.shorten(this.linkToBeShortened).subscribe(data => {
        this.linkShortened = data;
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
