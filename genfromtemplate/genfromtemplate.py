import sys
import argparse
import re
import codecs

class ReController:
    def __init__(self, name, value):
        self.reg = re.compile(r"(\${"+ name +"})")
        self.value = value

    def replace(self, line):
        return self.reg.sub("%s" % self.value, line)

def getRegexArray(params, ask, askValue):
    res = []
    name = None
    for par in params:
        if name is None:
            name = par
        else:
            value = par
            if name == ask:
                value = askValue
            res.append(ReController(name, value))
            name = None
    return res

def main(params):
    userInput = None
    if params.askuser:
        userInput = input('enter param {}: '.format(params.askuser))

    rega = getRegexArray(params.params, params.askuser, userInput)
    newName = params.newfilename or 'result.txt'
    for reg in rega:
        newName = reg.replace(newName)
    if params.destdir:
        newName = params.destdir + '\\' + newName
    newFile = codecs.open(newName, 'w', "utf-8")
    #newFile.write(codecs.BOM_UTF8)
    for line in params.template:
        for reg in rega:
            line = reg.replace(line)
        newFile.write(line)
    newFile.close()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument ('-t', '--template', type=argparse.FileType(encoding='UTF-8'), required=True)
    parser.add_argument ('-to', '--destdir')
    parser.add_argument ('-n', '--newfilename')
    parser.add_argument ('-p', '--params', nargs='+', default=[], required=True)
    parser.add_argument ('-ask', '--askuser')
    #parser.add_argument ('-n', '--name', choices=['Вася', 'Оля', 'Петя'], default='Оля')
    params = parser.parse_args(sys.argv[1:])
    main(params)