# -*- coding: utf-8 -*-
import sys
import time
from random import shuffle
import telebot
TOKEN = "424408336:AAHFZIhJSk-yn3hEwLE6YcA_rCtxV4FZMrg"

bot = telebot.TeleBot(TOKEN)

class Gamer:
    firstName = ''
    lastName = ''
    id = 0
    def __init__(self, _firstName, _lastName, _id):
        self.firstName = _firstName or ''
        self.lastName = _lastName or ''
        self.id = _id or 0
    
    def check(self, _id):
        return (_id == self.id)

    def getFullName(self):
        return u' '.join((self.firstName, self.lastName))

    def __str__(self):
        return u' '.join((self.firstName, self.lastName))
        #return self.firstName + ' ' + self.lastName

class GameSession:
    gamers = []
    ctime = None
    alive = True
    chatID = None
    def __init__(self, _chatId):     
        self.chatID = _chatId
        self.ctime = time.time()
        self.gamers = []
        self.alive = True        
    
    def sendMsg(self, msg):
        bot.send_message(self.chatID, msg)

    def addNewPlayer(self, message):
        #вдруг нажали + дважды
        for g in self.gamers:
            if g.check(message.from_user.id):
                return
                pass
        first = (len(self.gamers) == 0) 
        self.gamers.append(Gamer(message.from_user.first_name,message.from_user.last_name, message.from_user.id))
        if first:
            self.sendMsg('Собираем команды...')
        else:
            self.printCommandList()

    def removePlayer(self, message):
        pl = None
        for g in self.gamers:
            if g.check(message.from_user.id):
                pl = g
        if pl != None:
            ind = self.gamers.index(pl)
            try:
                self.sendMsg('Игрок отказался ('+ pl.getFullName() +')')
            except UnicodeDecodeError:
                self.sendMsg('Игрок отказался (ошибка при отображении имени)')
            del self.gamers[ind]            

    def isAlive(self):
        if (time.time() - self.ctime) > 600:
            self.alive = False
        return self.alive

    def getGamers(self):
        return self.gamers

    def getGamersLen(self):
        return len(self.gamers)

    def getSessionOwner(self):
        if len(self.gamers) == 0:
            return None
        return self.gamers[0]    

    def printCommandList(self):
        result = 'Собрали '+ str(len(self.gamers)) +': '    
        try:
            for g in self.gamers:
                result = result + g.getFullName() + '; '
        except UnicodeDecodeError:
            self.sendMsg('printCommandList -> UnicodeDecodeError')
        except:
            self.sendMsg('printCommandList -> error')
        self.sendMsg(result)
    
    def random(self):
         #рандомим    
        first = self.gamers[0]
        del self.gamers[0]
        shuffle(self.gamers)        
        playstr = 'Играют:\n' + first.getFullName() + '\n'
        index = 0
        for g in self.gamers:
            if index == 3:
                playstr = playstr + 'Отдыхают:\n'
            playstr = playstr + g.getFullName() + '\n'
            index = index + 1
                    
        self.sendMsg(playstr)
        self.alive = False

gs = None

def getGS(message):
    global gs
    if (gs == None) or (gs.isAlive() == False):
        gs = GameSession(message.chat.id)
    return gs

def deleteGS():
    global gs
    del gs
    gs = None

@bot.message_handler(commands=['help'])
def commandHelp(message):
    bot.send_message(message.chat.id, 'Привет! Собираем команду командой "/?". Ставим "/+" для участия. Для рандома введите команду /random. Передумали? Команда /-. Текущую пати смотрим по команде /team. Если что-то пошло не так - можно использовать команду /clear. Так победим!')

@bot.message_handler(commands=['clear'])
def commandClear(message):
    gs = getGS(message)
    owner = gs.getSessionOwner()
    if (owner != None) and (owner.id == message.from_user.id ):
        deleteGS()
        bot.send_message(message.chat.id, 'Убил текущую сессию')
	
@bot.message_handler(commands=['random'])
def commandRandom(message):
    gs = getGS(message)
    #проверка на меньше 4
    if gs.getGamersLen() < 5:
        bot.send_message(message.chat.id, 'Не хватает игроков! Нужно 5 и более.')
        return
    owner = gs.getSessionOwner()
    if (owner == None) or (owner.id != message.from_user.id ):
        bot.send_message(message.chat.id, 'Рандомить может только хозяин сессии.')
        return
    #рандомим   
    gs.random() 
    deleteGS()

@bot.message_handler(commands=['?', 'new', '+', 'play'])
def commandPlay(message):
    gs = getGS(message)
    gs.addNewPlayer(message)

@bot.message_handler(commands=['minus','-'])
def commandMinus(message):
    gs = getGS(message)
    gs.removePlayer(message)

@bot.message_handler(commands=['team'])
def commandTeam(message):
    gs = getGS(message)
    gs.printCommandList()

@bot.message_handler(commands=['killbot'])
def commandExit(message):
    bot.send_message(message.chat.id, 'Kill Bot')
    sys.exit()

@bot.message_handler(commands=['dbg'])
def commandDbg(message):
    bot.send_message(message.chat.id, message)

if __name__ == '__main__':
    bot.polling(none_stop=True)
