import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SuggestionsResult } from 'src/app/shared/models/dadata/dadata';
import { DadataEgrulService } from './dadata-egrul.service';

@Component({
  selector: 'app-dadata-egrul',
  templateUrl: './dadata-egrul.component.html',
  styleUrls: ['./dadata-egrul.component.scss']
})
export class DadataEgrulComponent implements OnInit {

  @Input() value: string;
  @Input() disabled?: boolean;

  @Output() outputEntity = new EventEmitter<SuggestionsResult>();



  constructor(
    private dadataService: DadataEgrulService
  ) { }

  ngOnInit(): void {
  }


  GetEntity(): void {
    this.dadataService.getAddressByInnOgrn(this.value).subscribe((entity: SuggestionsResult) => {
      this.outputEntity.emit(entity);
    })

    // console.log(this.value);
    
  }

}
