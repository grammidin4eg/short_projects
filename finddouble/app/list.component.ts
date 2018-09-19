import { Component, OnInit } from '@angular/core';
import { FindDoubleService, Card } from './finddouble.service';

@Component({
    selector: 'list',
    moduleId: module.id,
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css']
})
export class List implements OnInit {
    data: Card[];
    opened: boolean = false;
    lastOpenedItem: Card = null;
    winner: boolean = false;

    constructor(private service: FindDoubleService) {
        this.data = []
    }

    ngOnInit() {
        this.data = this.service.generateList();
        console.log('init data', this.data);
    }

    openCard(item: Card) {
      if( item.isOpen() ) {
        return;
      }
      item.open();
      if( this.opened  ) {
        this.opened = false;
        if( this.lastOpenedItem.img !== item.img ) {
          //не верно, закрыть через секунду
          let last = this.lastOpenedItem;
          setTimeout(function() {
              last.close();
              item.close();
          }, 700);
        } else {
          //проверим победу
          let hasClosed: boolean = false;
          for(let curItem of this.data ) {
              if( !curItem.isOpen() ) {
                hasClosed = true;
                break;
              }
          }

          if( !hasClosed ) {
            //победа
            this.winner = true;
          }
        }
      } else {
        this.opened = true;
        this.lastOpenedItem = item;
      }
    }
}
