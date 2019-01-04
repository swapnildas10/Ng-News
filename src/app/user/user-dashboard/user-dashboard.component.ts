import { Component, OnInit } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { UserDashboard } from '../../shared/modals/user-dashboard';
import { AuthService } from '../../../../node_modules/angular5-social-login';
import { ApiConnectionService } from '../../shared/services/apiconnection.service';
import { SocialAuthService } from '../../shared/services/auth.service';
import { TopHeadlines } from '../../shared/modals/top-headlines';

@Component({
  selector: 'user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})


export class UserDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  someCards: any;
  tags: string[];
  topHeadlinesByTags: TopHeadlines[] = [];
  displayCards = false;
  userCards: UserDashboard[];
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return <UserDashboard[]>[
          { articles: this.topHeadlinesByTags[0].articles, cols: 1, rows: 1 },
          { articles: this.topHeadlinesByTags[0].articles, cols: 1, rows: 1 },
          { articles: this.topHeadlinesByTags[0].articles, cols: 1, rows: 1 },
          { articles: this.topHeadlinesByTags[0].articles, cols: 1, rows: 1 }
        ];
      }

      return <UserDashboard[]>[
        { articles:  this.topHeadlinesByTags[0].articles, cols: 2, rows: 1 },
        { articles:  this.topHeadlinesByTags[0].articles, cols: 1, rows: 1 },
        { articles:  this.topHeadlinesByTags[0].articles, cols: 1, rows: 2 },
        { articles:  this.topHeadlinesByTags[0].articles, cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private authService: SocialAuthService,
    private apiConnectionService: ApiConnectionService) {
     this.cards.subscribe(result => this.someCards = result);
  }

  ngOnInit() {
    this.authService.userTags.subscribe(tags => {
      console.log(tags.length);
      for ( let i = 0 ; i < tags.length ; i++) {
        this.apiConnectionService.getBreakingNewsfromAPI(null, null, null, tags[i] ).pipe(
          map(response => {
            return response.body;
          }
          )
        ).subscribe(result => {
          console.log(result.articles[0]);
          this.topHeadlinesByTags.push(result);
          this.displayCards = true;
        });
      }
    });
  this.authService.getUserTags();
}
}
