import { Component, Input } from '@angular/core';
import { driver } from '../../driver';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comp.component.html',
  styleUrls: ['./comp.component.css']
})
export class CompComponent {
  klasi() {
    return {'begin':this.drv?.category=='ASD',
      'adv':this.drv?.category=='EXPERT',
    }
  }
  klasi2(){
    if(this.drv?.category=='ASD')
      return 'begin';
    else
      return 'adv';
  }
  stls() {
    if(this.drv?.category == 'EXPERT') {
      return {
        'text-decoration': 'underline'
      };
    } else {
      return {
        'text-decoration': 'none'
      };
    }
  }
  onDrvView(): void {
    const link = this.drv?.iconUrl || 'https://www.google.com'; // Fallback to Google
      console.log('Se otvara linkot:', link);
      if (!link.startsWith('http://') && !link.startsWith('https://')) {
      console.error('Nevalidno URL:', link);
      return;
    }
    const newWindow = window.open(link, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      console.error('Ne se otvara linkot.');
    }
  }
  
  
  @Input()
  drv : driver | undefined;
  @Input()
  in: number | undefined;
}
