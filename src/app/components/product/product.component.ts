import { OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GenericResponse } from 'src/app/shared/model/GenericResponse';
import { Product } from 'src/app/shared/model/Product';
import { AppService } from 'src/app/shared/service/app.service';
import { Util } from 'src/app/shared/util/util';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  public dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageSize: number = 5;
  public productForm: FormGroup;
  public action: string;
  public product: Product;
  public util: Util;

  constructor(private appService: AppService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.util = new Util(this.appService);
    this.productForm = this.formBuilder.group({      
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
      imagenproducto: ['', Validators.required],
      estado: ['A']
    });
    this.findAllProduct();
  }

  getDisplayedColumns(): string[] {
    let columnDefinitions = [      
      { def: 'nombre', show: true },
      { def: 'descripcion', show: true },
      { def: 'cantidad', show: true },
      { def: 'imagenproducto', show: true },
      { def: 'estado', show: true },
      { def: 'createdAt', show: true },
      { def: 'detalle', show: true },
      { def: 'editar', show: true },
      { def: 'eliminar', show: true }
    ]
    return columnDefinitions.filter(cd => cd.show).map(cd => cd.def);
  }

  applyFilter(event: Event) {
    this.util.applyFilter(event, this.dataSource);
  }

  findAllProduct() {
    this.appService.findAllProduct().subscribe((response: GenericResponse) => {
      if (response.statusCode == 200) {
        this.dataSource = new MatTableDataSource(response.body);
        this.dataSource.paginator = this.paginator;
        this.util.filterPredicate(this.dataSource);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ups...!!!',
          text: "Lo sentimos, ocurrio un error " + response.message,
          allowOutsideClick: false
        })
      }
    });
  }

  createProduct() {
    this.productForm.controls.estado.setValue("A");
    console.log("FORM VALUES");
    console.log(this.productForm.value);
    this.appService.createProduct(this.productForm.value).subscribe((response: GenericResponse) => {
      if (response.statusCode == 200) {
        this.productForm.reset();
        this.util.hideModal("modalProduct");
        Swal.fire({
          icon: "success",
          title: "Producto",
          text: "Producto almacenado exitosamente",
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.findAllProduct();
          }
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Ups...!!!",
          text: "Lo sentimos, ocurrio un error " + response.message,
          allowOutsideClick: false
        })
      }
    });
  }

  updateProduct() {    
    this.product.nombre = this.productForm.value.nombre;
    this.product.descripcion = this.productForm.value.descripcion;
    this.product.estado = this.productForm.value.estado ? "A" : "I";
    this.appService.updateProduct(this.product).subscribe((response: GenericResponse) => {
      if (response.statusCode == 200) {
        this.productForm.reset();
        this.util.hideModal("modalProduct");
        Swal.fire({
          icon: "success",
          title: "Producto",
          text: "Producto actualizado exitosamente",
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.findAllProduct();
          }
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Ups...!!!",
          text: "Lo sentimos, ocurrio un error " + response.message,
          allowOutsideClick: false
        })
      }
    });
  }

  showAlertDelete(product: Product) {
    Swal.fire({
      title: "Producto",
      text: "¿Desea eliminar el producto " + product.nombre + " ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0694cc",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProduct(product);
      }
    })
  }

  deleteProduct(product: Product) {
    this.appService.deleteProduct(product.dbid).subscribe((response: GenericResponse) => {
      if (response.statusCode == 200) {
        this.util.hideModal("modalProduct");
        Swal.fire({
          icon: "success",
          title: "Producto",
          text: "Producto eliminado exitosamente",
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.findAllProduct();
          }
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Ups...!!!",
          text: "Lo sentimos, ocurrio un error " + response.message,
          allowOutsideClick: false
        })
      }
    });
  }

  executeAction() {
    if (this.action == "Guardar") {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  showModal(action: string, object?: any) {
    this.productForm.reset();
    this.productForm.enable();
    this.action = action;
    if (action == "Editar") {
      this.product = object;
      object.estado = this.product.estado == "I" ? "" : this.product.estado;
      this.productForm.patchValue(object);
    } else if (action == "Detalle") {
      this.product = object;
      object.estado = this.product.estado == "I" ? "" : this.product.estado;
      this.productForm.patchValue(object);
      this.productForm.disable();
    }
    this.util.showModal("modalProduct");
  }

  ngOnDestroy(): void {
    this.util.destroyModal("modalProduct");
  }

}
