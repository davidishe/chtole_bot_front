import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IPagination } from 'src/app/shared/models/pagination';
import { DecimalPipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { RegionsService } from 'src/app/services/catalogs/regions.service';
import { ShopService } from 'src/app/services/catalogs/shop.service';
import { TypesService } from 'src/app/services/catalogs/types.service';
import { ItemsService } from '../../../../../../MyAppClient_/src/app/components/content/items.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { skip } from 'rxjs/operators';
import { IItemType } from '../../../../../../MyAppClient_/src/app/shared/models/type';
import { IItemRegion } from 'src/app/shared/models/region';
import { IItem, IItemToCreate } from 'src/app/shared/models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit, AfterViewInit, OnDestroy {

  item: IItemToCreate;
  items: IItem[];

  progress: boolean;
  pageEvent: PageEvent;

  formData = new FormData();


  types: IItemType[];
  regions: IItemRegion[];

  displayedColumns: string[] = [  'itemTitle'];

  isLoading: boolean;
  isNoPicture: boolean;
  noitems: boolean;

  decimalPipe = new DecimalPipe(navigator.language);

  shopParams = new ShopParams();
  totalCount: number;
  paginatorSub: Subscription;
  getAllSub: Subscription;
  sub: Subscription;

  pageSizeOptions = [this.shopParams.pageSize, 10, 15];
  baseUrl = environment.apiUrl;


  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;

  constructor(
    private itemsService: ItemsService,
    private snackBar: MatSnackBar,
    private shopService: ShopService,
    private typesService: TypesService,
    private breadcrumbService: BreadcrumbService,
    private regionsService: RegionsService
  ) {
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit() {


    this.breadcrumbService.set('@productDetails', '');

    this.getAllitems(false);
    this.getAllRegions();
    this.getAllTypes();
    this.translateMatPaginator();

  }

  ngAfterViewInit(): void {

    if (this.paginator) {
      this.paginatorSub = this.paginator.page.subscribe(() => {
        const shopParams = this.shopService.getShopParams();
        shopParams.pageNumber = this.paginator.pageIndex;
        shopParams.pageSize = this.paginator.pageSize;
        this.shopService.setShopParams(shopParams);
        this.getAllitems(true);
    });
    }
  }

  getAllitems(useCache: boolean) {
    this.isLoading = true;

    this.getAllSub = this.shopService.getProductsForAdmin(useCache).subscribe((response: IPagination) => {
      this.items = response.data;
      this.totalCount = response.count;
      this.shopParams.pageSize = response.pageSize;

      this.isLoading = false;
      if (this.totalCount === 0) {
        this.noitems = true;
      } else {
        this.noitems = false;
      }

    }, error => {
      console.log(error);
    });
  }

  translateMatPaginator() {
  }

  onImageUpload(files, item) {

    if (files.length === 0) { return; }
    this.items.filter(z => z.id === item.id)[0].itemUrl = '';
    const fileToUpload = files[0] as File;
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.progress = true;

    this.itemsService.addProductPhoto(item, this.formData).subscribe((res: IItem) => {
      this.items.filter(z => z.id === item.id)[0].itemUrl = res.itemUrl;
      this.progress = false;
      this.formData.delete('file');
      files = [];

    });
  }

  onitemIsSale(item: IItem) {
    if (!item.itemUrl) {
      this.openSnackBar('Сначала добавь картинку');
    } else {
    this.itemsService.setProductIsSale(item.id.toString()).subscribe((response: any) => {

    });
    }
  }

  onitemDelete(itemId: any) {
    this.items = this.items.filter(z => z.id !== itemId);

    this.itemsService.deleteProduct(itemId).subscribe(response => {
      console.log(response);
      if (response !== 202) {
        this.openSnackBar('Ошибка при удалении');
      }

      if (this.items.length === 0) {
        this.getAllitems(false);
      }
    });
  }

  onRegionSelected(regionId: number) {
    const params = this.shopService.getShopParams();
    if (regionId !== params.regionIdSelected) {
      params.regionIdSelected = regionId;
    } else {
      params.regionIdSelected = 0;
    }
    params.pageNumber = 0;
    this.shopService.setShopParams(params);
    this.getAllitems(false);
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    if (typeId !== params.typeIdSelected) {
      params.typeIdSelected = typeId;
    } else {
      params.typeIdSelected = 0;
    }
    params.pageNumber = 0;
    this.shopService.setShopParams(params);
    this.getAllitems(false);
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

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sortSelected = sort;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getAllitems(false);
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 0;
    this.shopService.setShopParams(params);
    this.getAllitems(false);
  }

  onReset() {
    this.searchTerm.nativeElement.value = undefined;
    this.searchTerm.nativeElement.value = '';

    const params = new ShopParams();
    params.search = undefined;
    this.shopService.setShopParams(params);
    console.log(this.searchTerm.nativeElement.value);
    this.getAllitems(false);
    this.shopParams = this.shopService.getShopParams();

  }

  ngOnDestroy(): void {
    this.getAllSub.unsubscribe();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {duration: 2500});
  }

}
