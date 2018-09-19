import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from './finddouble.service';

@Component({
    selector: 'list-item',
    moduleId: module.id,
    templateUrl: 'list-item.component.html'//,
    //styleUrls: ['list.component.css']
})
export class ListItem {
    @Input() itemdata: Card;
    @Output() opencard = new EventEmitter();

    openCard() {
        //this.itemdata.open();
        this.opencard.emit(this.itemdata);
    }
}
