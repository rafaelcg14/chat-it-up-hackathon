import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-solution',
  templateUrl: './solution.component.html',
  styleUrl: './solution.component.css'
})
export class SolutionComponent implements AfterViewInit {

  @ViewChild('targetSection')
  public targetSection!: ElementRef;

  constructor( private scrollService: ScrollService ) {}

  ngAfterViewInit(): void {
    this.scrollService.setTargetElement( this.targetSection );
  }

}
