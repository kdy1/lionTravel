function onGameInit()
{
    document.title = "Lion Travel";
    
    GAME_FPS = 30;
    debugSystem.debugMode = true;
    
    //리소스 프리로딩 추가
    resourcePreLoader.AddImage("img/title_background.png");
    resourcePreLoader.AddImage("img/title_start_off.png");
    resourcePreLoader.AddImage("img/title_start_on.png");
    resourcePreLoader.AddImage("img/title_ranking_off.png");
    resourcePreLoader.AddImage("img/title_ranking_on.png");
    
    resourcePreLoader.AddImage("img/game_background_blue.png");
    resourcePreLoader.AddImage("img/game_background_cloud.png");
    
    resourcePreLoader.AddImage("img/game_ctrl_left.png");
    resourcePreLoader.AddImage("img/game_ctrl_right.png");
    resourcePreLoader.AddImage("img/game_ctrl_dash.png");
    resourcePreLoader.AddImage("img/game_shortlog.png");
    resourcePreLoader.AddImage("img/game_player.png");
    
    soundSystem.AddSound("background.mp3", 1);
    
    //게임 초기 시작 상태 결정
    after_loading_state = new TitleState();
    game_state = TitleState;
    
    setInterval(gameLoop, 1000 / GAME_FPS);
}

window.addEventListener("load", onGameInit, false);