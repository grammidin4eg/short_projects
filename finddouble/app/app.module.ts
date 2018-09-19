import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { List } from './list.component';
import { ListItem } from './list-item.component'

import { FindDoubleService } from './finddouble.service'

@NgModule({
    imports: [ BrowserModule ],
    declarations: [ AppComponent, List, ListItem ],
    providers: [ FindDoubleService ],
    bootstrap: [ AppComponent ]
})
export class AppModule {

}