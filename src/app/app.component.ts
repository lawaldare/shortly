import { Link } from './model/link.model';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LinkService } from './services/link.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'link-shorter';
  links: any[] = [];
  copy: boolean = false;
  constructor(private linkService: LinkService) {

  }


  onSubmit(form: NgForm) {
    let link: string = form.value.link;
    if (link.includes('http://') || link.includes('https://')) {
      this.linkService.sendLink(link).subscribe(data => {
        data['hashid'] = `https://rel.ink/${data['hashid']}`;
        data['copy'] = false;
        this.links.push(data);
        form.resetForm();
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
