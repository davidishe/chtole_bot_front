import { Component, Input } from '@angular/core';
import { IItem } from 'src/app/shared/models/items/item';
import { IShelter } from 'src/app/shared/models/shelters/shelter';
import { PhotoService } from '../photo.service';



@Component({
  selector: 'app-mat-card-hero',
  templateUrl: './mat-card-hero.component.html',
  styleUrls: ['./mat-card-hero.component.scss']
})


export class MatCardHeroComponent  {
  @Input() content?: string;
  @Input() isHidden?: boolean;
  @Input() item?: IItem;
  @Input() detailedMode: boolean;
  @Input() link?: string;
  @Input() type?: string;

  progress: boolean;
  formData = new FormData();

  constructor(
    private photoService: PhotoService
  ) {
    this.detailedMode = true;
  }

  onImageUpload(files, item) {

    if (files.length === 0) { return; }
    const fileToUpload = files[0] as File;
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.progress = true;
    this.addPhoto(files, item);

  }

  addPhoto(files, item): void {
    this.photoService.addPhotoToPet(item, this.formData).subscribe((res: IItem) => {
      this.item.pictureUrl = res.pictureUrl;
      this.progress = false;
      this.formData.delete('file');
      files = [];
    });
  }



}
