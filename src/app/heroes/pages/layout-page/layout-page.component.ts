import { Component } from '@angular/core';

export interface MenuItems  {
  label: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {


  public isVisibleMenuBurguer: boolean = false;
  public sidebarItems: MenuItems[] = [
    {
      label: 'List', icon: 'label', url: './lis'
    },
    {
      label: 'Add', icon: 'add', url: './new-hero'
    },
    {
      label: 'Search', icon: 'search', url: './search'
    },
  ];

  

}
