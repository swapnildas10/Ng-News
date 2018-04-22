import { Component, OnInit, OnChanges } from '@angular/core';
import { ApiConnectionService } from '../shared/services/apiconnection.service';
import { SourceWrapper } from '../shared/modals/source';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.scss']
})
export class SourceComponent implements OnInit, OnChanges {

  constructor(private apiConnectionService: ApiConnectionService) { }
sourceWrapper: SourceWrapper;
  ngOnInit() {
    this.apiConnectionService.getSourcesfromAPI().subscribe(
      response => {this.sourceWrapper = response.body; }
    );
  }

  ngOnChanges() {
  }

}
