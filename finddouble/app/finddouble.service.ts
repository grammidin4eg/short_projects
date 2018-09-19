export class Card {
    img: String;
    static hover: String = './img/hover.png';

    constructor(private name: String, private opened: boolean = false) {
        this.img = `./img/${this.name}.png`;
    }

    getImg(): String {
        return this.opened ? this.img : Card.hover;
    }

    open() {
      this.opened = true;
    }

    close() {
      this.opened = false;
    }

    isOpen() {
      return this.opened;
    }
}

export class FindDoubleService {
    cardList: Card[] = [];

    shuffle(array: Card[]): Card[] {
      let
        currentIndex: number = array.length,
        temporaryValue: Card,
        randomIndex: number;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    generateList(): Card[] {
        for(var i=0;i<2;i++) {
            this.cardList.push(new Card('mint'));
            this.cardList.push(new Card('ubuntu'));
            this.cardList.push(new Card('arch'));
            this.cardList.push(new Card('debian'));
            this.cardList.push(new Card('fedora'));
            this.cardList.push(new Card('gentoo'));
            this.cardList.push(new Card('mandriva'));
            this.cardList.push(new Card('redhat'));
            this.cardList.push(new Card('slack'));
            this.cardList.push(new Card('suse'));
        }
        this.cardList = this.shuffle(this.cardList);
        //in center
        this.cardList.push(this.cardList[10]);
        this.cardList[10] = new Card('center', true);

        return this.cardList;
    }
}
