import pygame
import colors
from go import GameObject

ox = 10
oy = 100
speed = 5

# в этой функции нужно определить все спрайты на экране
def initSprites(sprites):
    obj = GameObject('images/1.jpg', 100, 100)
    sprites.add(obj)
    pass
# Функция отрисовки объектов на экране
def render(screen):
    pygame.draw.rect(screen, colors.GREEN, (ox, oy, 100, 100))
    pass

# Функция обновления
def update():
    pass

# Функция обработки событий
def onEvent(event):
    global ox
    if event.type == pygame.KEYDOWN:
        if event.key == pygame.K_LEFT:
            ox -= speed
        elif event.key == pygame.K_RIGHT:
            ox += speed
    pass