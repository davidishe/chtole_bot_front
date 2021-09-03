import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IItem } from 'src/app/shared/models/items/item';
import { DecimalPipe } from '@angular/common';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { RegionsService } from 'src/app/services/catalogs/regions.service';
import { TypesService } from 'src/app/services/catalogs/types.service';
import { SideNavService } from 'src/app/services/side-nav.service';
import { IPagination } from 'src/app/shared/models/pagination';
import { IRegion } from 'src/app/shared/models/region';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { IType } from 'src/app/shared/models/type';
import { ClientsService } from 'src/app/components/content/main/clients/clients.service';

type Item = IItem;

@Component({
  selector: 'app-item-form2',
  templateUrl: './item-form2.component.html',
  styleUrls: ['./item-form2.component.scss']
})

export class ItemFormComponent2 implements OnInit {

  items: IItem[];
  types: IType[];
  regions: IRegion[];

  pageEvent: PageEvent;
  decimalPipe = new DecimalPipe(navigator.language);

  shopParams = new ShopParams();
  totalCount: number;
  sub: Subscription;
  pageSizeOptions = [this.shopParams.pageSize, 10, 15];

  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;


  constructor(
    private clientsService: ClientsService,
    private typesService: TypesService,
    private regionsService: RegionsService,
    public sideNavService: SideNavService

  ) {
    this.shopParams = clientsService.getShopParams();
  }



  ngAfterViewInit(): void {
    if (this.paginator) {
      this.paginator.page.subscribe(() => {
      const shopParams = this.clientsService.getShopParams();
      shopParams.pageNumber = this.paginator.pageIndex;
      shopParams.pageSize = this.paginator.pageSize;
      this.clientsService.setShopParams(shopParams);
      this.getAll(false);
    });
    }
  }

  ngOnInit() {
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (page > 0) {
        const start = (page) * pageSize;
        const end = (page + 1) * pageSize;
        return `${start} - ${end} из ${this.decimalPipe.transform(length)}`;
      }

      if (page === 0) {
        const start = 1;
        const end = (page + 1) * pageSize;
        return `${start} - ${end} из ${this.decimalPipe.transform(length)}`;
      }


    };

    this.getAll(false);
    this.getAllRegions();
    this.getAllTypes();
    this.translateMatPaginator();

  }

  getAll(useCache: boolean) {
    this.sub = this.clientsService.getAll(useCache).subscribe((response: IPagination) => {
      this.items = response.data;
      this.totalCount = response.count;
      this.paginator.pageSize = response.pageSize;
      this.shopParams.pageSize = this.paginator.pageSize;

    }, error => {
      console.log(error);
    });
  }

  translateMatPaginator() {
      this.paginator._intl.itemsPerPageLabel = 'Записей на странице ';
  }

  handlePage(e: any) {

    console.log(this.paginator.pageSize);
    this.shopParams.pageNumber = 0;
    this.shopParams.pageSize = this.paginator.pageSize;

    this.clientsService.setShopParams(this.shopParams);
    this.getAll(false);
  }

  onRegionSelected(regionId: number) {
    const params = this.clientsService.getShopParams();
    if (regionId !== params.regionIdSelected) {
      params.regionIdSelected = regionId;
    } else {
      params.regionIdSelected = 0;
    }
    params.pageNumber = 0;
    this.clientsService.setShopParams(params);
    this.getAll(false);
  }

  onTypeSelected(typeId: number) {
    const params = this.clientsService.getShopParams();
    if (typeId !== params.typeIdSelected) {
      params.typeIdSelected = typeId;
    } else {
      params.typeIdSelected = 0;
    }
    params.pageNumber = 0;
    this.clientsService.setShopParams(params);
    this.getAll(false);
  }

  onSortSelected(sort: string) {
    const params = this.clientsService.getShopParams();
    params.sortSelected = sort;
    params.pageNumber = 0;
    this.clientsService.setShopParams(params);
    this.getAll(false);
  }

  onSearch() {
    const params = this.clientsService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 0;
    this.clientsService.setShopParams(params);
    this.getAll(false);
  }

  onReset() {
    this.searchTerm.nativeElement.value = undefined;
    this.searchTerm.nativeElement.value = '';

    const params = new ShopParams();
    params.search = undefined;
    this.clientsService.setShopParams(params);
    console.log(this.searchTerm.nativeElement.value);
    this.getAll(false);
    this.shopParams = this.clientsService.getShopParams();

  }

  getAllTypes() {
    this.sub = this.typesService.GetAllTypes().subscribe((response) => {
      this.types = response;
    }, error => {
      console.log(error);
    });
  }

  getAllRegions() {
    this.sub = this.regionsService.GetAllRegions().subscribe((response) => {
      this.regions = response;
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}





