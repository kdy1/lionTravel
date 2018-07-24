function TitleState() 
{
    this.imgBackground = resourcePreLoader.GetImage("img/title_background.png");
    
    this.imgButtonStartOff = resourcePreLoader.GetImage("img/title_start_off.png");
    this.imgButtonStartOn  = resourcePreLoader.GetImage("img/title_start_on.png");
    
    this.imgButtonRankingOff = resourcePreLoader.GetImage("img/title_ranking_off.png");
    this.imgButtonRankingOn  = resourcePreLoader.GetImage("img/title_ranking_on.png");
    
    soundSystem.PlayBackgroundMusic("background.mp3");
    
    return this; 
}

TitleState.prototype.Init = function()
{
    soundSystem.PlayBackgroundMusic("background.mp3");
};

TitleState.prototype.Render = function()
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");
    
    //배경 화면 그리기
    Context.drawImage(this.imgBackground, 0, 0);
    
    //시작 버튼, 랭킹 버튼 그리기
    if(inputSystem.mouseX > 170 && inputSystem.mouseX < 170+220 && inputSystem.mouseY > 480 && inputSystem.mouseY < 480+100)
    {
        Context.drawImage(this.imgButtonStartOn, 170, 480);
        this.flagButtonStart = true;
    }
    else
    {
        Context.drawImage(this.imgButtonStartOff, 170, 480);
        this.flagButtonStart = false;
    }
    
    if(inputSystem.mouseX > 420 && inputSystem.mouseX < 420+220 && inputSystem.mouseY > 480 && inputSystem.mouseY < 480+100)
    {
        Context.drawImage(this.imgButtonRankingOn, 420, 480);
        this.flagButtonRanking = true;
    }
    else
    {
        Context.drawImage(this.imgButtonRankingOff, 420, 480);
        this.flagButtonRanking = false;
    }
};

TitleState.prototype.Update = function()
{
    
};

TitleState.prototype.onMouseDown = function()
{
    if(this.flagButtonStart)
        game_state = new PlayGameState();  //게임 상태로
        ChangeGameState(game_state);
        after_loading_state = game_state;    
    
    if(this.flagButtonRanking)
        ChangeGameState(/*랭킹 상태*/);
};