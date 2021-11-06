import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppService } from 'src/app/shared/service/app.service';
import { User } from 'src/app/shared/model/User';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public user: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private appService: AppService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.user = this.appService.getUser();
    //this.validateRols();
  }

  goToPage(currentPage: string) {
    this.appService.setCurrentPage(currentPage);
  }

  signOff() {
    this.appService.setUserLoggedIn(false);
    this.appService.setUser(null);
    this.router.navigate(['/']);
  }
}
