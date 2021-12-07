import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TypesService } from 'src/app/services/catalogs/types.service';
import { SideNavService } from 'src/app/services/side-nav.service';
import { IType } from 'src/app/shared/models/type';
import { MemberService } from './member.service';
import { IMember } from 'src/app/shared/models/items/member';

type Item = IMember;

@Component({
  selector: 'member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})

export class MemberComponent implements OnInit {

  items: Item[];
  types: IType[];
  sub: Subscription;


  constructor(
    private memberService: MemberService,
    private typesService: TypesService,
    public sideNavService: SideNavService

  ) {
  }



  ngAfterViewInit(): void {
  }

  ngOnInit() {

    this.getAll();
    this.getAllTypes();
  }

  getAll() {
    this.sub = this.memberService.getAll().subscribe((response: IMember[]) => {
      if (response) {
        this.items = response;
        console.log(this.items);
      }
    }, error => {
      console.log(error);
    });
  }


  getAllTypes() {
    this.sub = this.typesService.GetAllTypes().subscribe((response) => {
      this.types = response;
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}





