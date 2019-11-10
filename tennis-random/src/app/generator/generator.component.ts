import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit {

  constructor() { }

  form: FormGroup = new FormGroup({
    playerName: new FormControl('', [Validators.required])
  });

  playerList: Array<string> = [];

  ngOnInit() {
  }

  addPlayer() {
    if (this.form.valid) {
      this.playerList.push(this.form.get('playerName').value);
      this.form.get('playerName').reset('');
    }
  }

  removePlayer(index: number) {
    this.playerList.splice(index, 1);
  }

  randomIt() {
    console.log('random it');
  }
}
