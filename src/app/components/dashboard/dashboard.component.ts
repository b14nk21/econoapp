import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  constructor (private _productService: ProductService) {  }

  ngOnInit () : void {
    this.getProduct();
  }

  getProduct () {
    this._productService.getProducts().subscribe(data => {
      console.log(data)
    })
  }

}
