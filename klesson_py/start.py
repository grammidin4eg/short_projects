# Pygame шаблон - скелет для нового проекта Pygame
import pygame
import game
import colors
import config

# Создаем игру и окно
pygame.init()
pygame.mixer.init()
screen = pygame.display.set_mode((config.WIDTH, config.HEIGHT), pygame.DOUBLEBUF | pygame.HWSURFACE)
pygame.display.set_caption("pygame")
clock = pygame.time.Clock()

all_sprites = pygame.sprite.Group()
game.initSprites(all_sprites)
# Цикл игры
running = True
while running:
    # Держим цикл на правильной скорости
    clock.tick(config.FPS)
    # Ввод процесса (события)
    for event in pygame.event.get():
        game.onEvent(event)
        # check for closing window
        if event.type == pygame.QUIT:
            running = False

    # Обновление
    all_sprites.update()
    game.update()
    
    # Рендеринг
    screen.fill(colors.BLACK)
    all_sprites.draw(screen)
    game.render(screen)
    # После отрисовки всего, переворачиваем экран
    pygame.display.flip()

pygame.quit()