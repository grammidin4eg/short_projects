import pygame
import random
import colors
import config

def createAim():
    return pygame.Rect(random.randint(10, config.WIDTH), random.randint(10, config.HEIGHT), 5, 5)

aim = createAim()
score = 0

# Функция инициализации
def init(sprites):
    pass
# Функция отрисовки объектов на экране
def render(screen, text):
    # рисуем рамку
    pygame.draw.rect(screen, colors.GREY, (10, 10, config.WIDTH - 20, config.HEIGHT - 20), 1)
    # рисуем круг
    pygame.draw.ellipse(screen, colors.PURPLE, aim)
    # отобразить очки игрока
    scoreText = text.render('Score: ' + str(score), 1, colors.RED, colors.YELLOW)
    pos = scoreText.get_rect(topleft=(10, 10))
    screen.blit(scoreText, pos)
    pass

# Функция обновления
def update():
    global aim
    aim.width += 2
    aim.height += 2
    aim.x -= 1
    aim.y -= 1
    if aim.width > 200:
        aim = createAim()
    pass

# Функция обработки событий
def onEvent(event):
    global aim
    global score
    if event.type == pygame.MOUSEBUTTONDOWN:
        print('mouse', event.pos)
        if aim.collidepoint(event.pos):
            print('collide!')
            score+=1
            aim = createAim()
    pass