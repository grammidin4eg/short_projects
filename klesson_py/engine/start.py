# Pygame шаблон - скелет для нового проекта Pygame
import pygame
import game
import colors
import config

# Создаем игру и окно
pygame.init()
pygame.mixer.init()
mode = pygame.DOUBLEBUF | pygame.HWSURFACE
if config.FULLSCREEN == True:
    mode |= pygame.FULLSCREEN
if config.OPENGL == True:
    mode |= pygame.OPENGL
screen = pygame.display.set_mode((config.WIDTH, config.HEIGHT), mode)
pygame.display.set_caption("pygame")
clock = pygame.time.Clock()

all_sprites = pygame.sprite.Group()
text = pygame.font.SysFont(config.FONT, config.FONT_SIZE)

game.init(all_sprites)
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
        elif (event.type == pygame.KEYDOWN):
            if (event.key == pygame.K_RETURN) and (event.mod & pygame.KMOD_ALT):
                print('fullscreen', event.mod)
                pygame.display.toggle_fullscreen()
            elif (event.key == pygame.K_ESCAPE) and (config.EXIT_ON_ESCAPE):
                running = False

    # Обновление
    all_sprites.update()
    game.update()
    
    # Рендеринг
    screen.fill(colors.BLACK)
    all_sprites.draw(screen)
    game.render(screen, text)
    # После отрисовки всего, переворачиваем экран
    pygame.display.flip()

pygame.quit()