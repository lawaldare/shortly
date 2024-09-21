import { Link } from "./model/link.model";
import { Component, inject, signal } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LinkService } from "./services/link.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public links = signal<Link[]>([]);
  buttonLoading = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  private readonly linkService = inject(LinkService);

  onSubmit(form: NgForm) {
    if (
      form.value.link.includes("http://") ||
      form.value.link.includes("https://")
    ) {
      this.buttonLoading.set(true);
      this.linkService.shorten(form.value.link).subscribe(
        (data: any) => {
          this.isLoading.set(true);
          const link: Link = {} as Link;
          link.linkToBeShortened = form.value.link;
          link.linkShortened = data.error.text ? data.error.text : data;
          link.copy = false;
          this.links.update((links) => [...links, link]);
          this.buttonLoading.set(false);
          form.resetForm();
        },
        (error) => {
          this.buttonLoading.set(false);
          // console.log(error);
        }
      );
    } else {
      alert("Please enter a valid URL with http:// or https://");
      form.resetForm();
    }
  }

  changeName(link: Link): void {
    link.copy = true;
  }
}
