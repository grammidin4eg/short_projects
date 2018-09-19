import { PollItem, Answer } from './pollitem.js'

export var release = false
var fixedData = []
var fixedDataAnswer = []

function blphp (blobj, onreadystatechange) {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', '/vue/vue_polls/static/bl/vuepolls.php', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(blobj))
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log('resulet', xhr.readyState, xhr.responseText, xhr.result_cat)
      if (onreadystatechange) {
        onreadystatechange.call(xhr)
      }
      this.$router.push('/')
    }
  }
}

function getDateStr (_date) {
  return `${_date.getDate()}.${(_date.getMonth() + 1)}.${String(_date.getFullYear()).slice(2)}`
}

function getNewId () {
  var lastId = 0
  for (var i = 0; i < fixedData.length; i++) {
    if (fixedData[i].id > lastId) {
      lastId = fixedData[i].id
    }
  }
  return (lastId + 1)
}

function generateFixtureData () {
  fixedData.push(new PollItem(1, 'Лучший дистрибутив Linux', '01.02.90', 45))
  fixedData.push(new PollItem(2, 'Какой класс WoW круче?', '01.01.16', 50))
  fixedData.push(new PollItem(3, 'Идти Сережке в магазин?', '28.03.17', 5))
  fixedData.push(new PollItem(4, 'К реке подходят два человека. У берега лодка, которая может выдержать только одного. Оба человека переправились на противоположный берег. КАК?', '20.02.15', 0))
  fixedDataAnswer = []
  fixedDataAnswer.push(new Answer(1, 'Mint', 20, 1))
  fixedDataAnswer.push(new Answer(2, 'Ubuntu', 10, 1))
  fixedDataAnswer.push(new Answer(3, 'Debian', 7, 1))
  fixedDataAnswer.push(new Answer(4, 'Suse', 3, 1))
  fixedDataAnswer.push(new Answer(5, 'Arch', 0, 1))
  fixedDataAnswer.push(new Answer(6, 'Fedora', 4, 1))
  fixedDataAnswer.push(new Answer(7, 'Gentoo', 0, 1))
  fixedDataAnswer.push(new Answer(8, 'Mandriva', 1, 1))
  fixedDataAnswer.push(new Answer(9, 'Redhat', 0, 1))
  fixedDataAnswer.push(new Answer(10, 'Slackware', 0, 1))

  fixedDataAnswer.push(new Answer(11, 'Воин', 5, 2))
  fixedDataAnswer.push(new Answer(12, 'Паладин', 1, 2))
  fixedDataAnswer.push(new Answer(13, 'Охотник', 3, 2))
  fixedDataAnswer.push(new Answer(14, 'Разбойник', 2, 2))
  fixedDataAnswer.push(new Answer(15, 'Жрец', 4, 2))
  fixedDataAnswer.push(new Answer(16, 'Рыцарь смерти', 6, 2))
  fixedDataAnswer.push(new Answer(17, 'Шаман', 8, 2))
  fixedDataAnswer.push(new Answer(18, 'Маг', 2, 2))
  fixedDataAnswer.push(new Answer(19, 'Чернокнижник', 5, 2))
  fixedDataAnswer.push(new Answer(20, 'Монах', 3, 2))
  fixedDataAnswer.push(new Answer(21, 'Друид', 2, 2))
  fixedDataAnswer.push(new Answer(22, 'Охотник на демонов', 10, 2))

  fixedDataAnswer.push(new Answer(23, 'Да', 4, 3))
  fixedDataAnswer.push(new Answer(24, 'Нет', 1, 3))
  fixedDataAnswer.push(new Answer(25, 'Я томат', 0, 3))

  fixedDataAnswer.push(new Answer(26, 'Они были на разных берегах', 0, 4))
  fixedDataAnswer.push(new Answer(27, 'Не знаю', 0, 4))
}

function getAnswerList (_id) {
  var res = []
  for (var i = 0; i < fixedDataAnswer.length; i++) {
    if (fixedDataAnswer[i].question === _id) {
      res.push(fixedDataAnswer[i])
    }
  }
  return res
}

function getItem (_id, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].id === _id) {
      return array[i]
    }
  }
  return null
}

function blfixture (blobj, onreadystatechange) {
  var ans = null
  switch (blobj.cmd) {
    case 'question.list':
      if (fixedData.length < 1) {
        generateFixtureData()
      }
      ans = fixedData
      break
    case 'question.add':
      var _newId = getNewId()
      fixedData.push(new PollItem(_newId, blobj.text, getDateStr(new Date()), 0))
      ans = _newId
      break
    case 'answer.list':
      if (fixedDataAnswer.length < 1) {
        generateFixtureData()
      }
      ans = getAnswerList(blobj.question)
      break
    case 'answer.add':
      var answers = blobj.answers
      var qId = blobj.qid
      for (var i = 0; i < answers.length; i++) {
        var answText = answers[i]
        fixedDataAnswer.push(new Answer(40, answText, 0, qId))
      }
      ans = 'DONE'
      break
    case 'answer.check':
      // отметить пункт
      var answ = getItem(blobj.id, fixedDataAnswer)
      answ.count++
      answ.mark = true
      // обновить счетчик в вопросе
      var question = getItem(answ.question, fixedData)
      question.anscounter++
      ans = 'DONE'
      break
  }
  if (onreadystatechange) {
    onreadystatechange.call(this, {
      result: ans,
      error: null
    })
  }
  console.log('bl', blobj, ans)
}

export var blexec = function (blobj, onreadystatechange) {
  if (release === true) {
    blphp(blobj, onreadystatechange)
  } else {
    blfixture(blobj, onreadystatechange)
  }
}
