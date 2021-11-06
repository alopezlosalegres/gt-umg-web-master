import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../shared/service/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  public isLoading: boolean;  
  loadingSubcription : Subscription;

  constructor(private loadingService: LoadingService) { }

  ngOnInit() {
    this.showOrHideLoading();
  }

  showOrHideLoading(){
    this.loadingSubcription = this.loadingService.getLoading().subscribe(status => {
      this.isLoading = status;
    });
  }

  ngOnDestroy(){
    this.loadingSubcription.unsubscribe();
  }

}
