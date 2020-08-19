import firebase from 'firebase'
import {firebaseConfig} from './FirebaseConfig'

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore().collection('scores');

export function getLadderList() {
    return new Promise((resolve, reject) => {
        //const query = db.orderBy('value', 'desc').limit(12);
        let ladderArray = [];
        db.orderBy('value', 'desc').limit(10).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                ladderArray.push(doc.data());
            });
            resolve(ladderArray);
        }).catch(error => reject(error));
    });
}

export function setLadderPosition(name, value) {
    return new Promise((resolve, reject) => {
        if (!name) {
            reject('Имя не указано');
        }
        db.add({
            name,
            value
        }).then((res) => resolve(res)).catch((error) => {console.error('setLadderPosition', error); reject(error);});
    });
}