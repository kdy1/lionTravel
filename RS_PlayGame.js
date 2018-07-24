function PlayGameState()
{
    //배경
    this.background = new PGBackGround();
    
    //컨트롤러
    this.imgCtrlLeft = resourcePreLoader.GetImage("img/game_ctrl_left.png");
    this.imgCtrlRight = resourcePreLoader.GetImage("img/game_ctrl_right.png");
    // this.imgCtrlDash = resourcePreLoader.GetImage("/.c9/img/game_ctrl_dash.png");
    
    //타이머
    this.timer = new Timer();
    
    //플레이어
    this.sprPlayer = new SpriteAnimation(resourcePreLoader.GetImage("img/game_player.png"), 125, 167, 4, 4);
    this.x = 150;
    this.y = 200;
    
    this.Invalid();
    
    this.isJumpingUp = false;
    this.jumpPower = 0;
    this.dashPower = 0;

    //로그
    this.imgShortlog1 = resourcePreLoader.GetImage("img/game_shortlog.png");
    this.imgShortlog2 = resourcePreLoader.GetImage("img/game_shortlog.png");
    this.imgShortlog3 = resourcePreLoader.GetImage("img/game_shortlog.png");
    
    //로그 이동
    this.posShortlog1 = 0+200;
    this.speedShortlog1 = 7;
    
    this.posShortlog2 = 315+200;
    this.speedShortlog2 = 7;
    
    this.posShortlog3 = 625+200;
    this.speedShortlog3 = 7;
    
    //초기 로그 y위치 생성
    this.y_log_position_Arr = new Array(3);
    this.y_log_position_Arr[0] = 350;
    this.y_log_position_Arr[1] = 300;
    this.y_log_position_Arr[2] = 350;
    
    //점프 후 착지 위치
    this.afterjump_Arr = new Array();
    // this.afterjump_Arr[0] = 350;
    // this.afterjump_Arr[1] = 300;
    // this.afterjump_Arr[2] = 350;
    this.afterjump_Arr.push(350);
    this.afterjump_Arr.push(300);
    this.afterjump_Arr.push(350);
    
    this.i = 0;
    
    return this;
}

PlayGameState.prototype.Init = function()
{
    
};

PlayGameState.prototype.Render = function()
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");
    
    //전방 배경 그리기
    this.background.RenderLayerFront();
    
    //후방 배경 그리기
    this.background.RenderLayerBack();
    
    //컨트롤러 그리기
    Context.drawImage(this.imgCtrlLeft, 0, 430, 180, 180);
    Context.drawImage(this.imgCtrlRight, 620, 430, 180, 180);
    // Context.drawImage(this.imgCtrlDash, 200, 430, 180, 180);

    //로그 그리기
    Context.drawImage(this.imgShortlog1, this.posShortlog1, this.y_log_position_Arr[0], 170, 32);
    Context.drawImage(this.imgShortlog2, this.posShortlog2, this.y_log_position_Arr[1], 170, 32);
    Context.drawImage(this.imgShortlog3, this.posShortlog3, this.y_log_position_Arr[2], 170, 32);
    
    //플레이어 그리기
    this.sprPlayer.Render(Context);
};

PlayGameState.prototype.Update = function()
{
    //타이머
    this.timer.Update();
    if(this.timer.nowFrame < 6000)
    {
        //배경
        this.background.Update();
    }
    
    //플레이어 
    this.sprPlayer.Update();
    
    //로그 이동
    this.posShortlog1 -= this.speedShortlog1;
    this.posShortlog2 -= this.speedShortlog2;
    this.posShortlog3 -= this.speedShortlog3;
    
    if(this.posShortlog1 < -170)
    {
        this.posShortlog1 = 800;
        
        var y_position_values_ud = [350, 300, 250];
	    var position_index_ud = getRandomInt(3);
        var y_log_position_ud = y_position_values_ud[position_index_ud];
        
        this.y_log_position_Arr[0] = y_log_position_ud;
        
        this.afterjump_Arr.push(this.y_log_position_Arr[0]);
    }
    
    if(this.posShortlog2 < -170)
    {
        this.posShortlog2 = 800;
        
        var y_position_values_ud = [350, 300, 250];
	    var position_index_ud = getRandomInt(3);
        var y_log_position_ud = y_position_values_ud[position_index_ud];
        
        this.y_log_position_Arr[1] = y_log_position_ud;
        
        this.afterjump_Arr.push(this.y_log_position_Arr[1]);
    }
    
    if(this.posShortlog3 < -170)
    {
        this.posShortlog3 = 800;
        
        var y_position_values_ud = [350, 300, 250];
	    var position_index_ud = getRandomInt(3);
        var y_log_position_ud = y_position_values_ud[position_index_ud];
        
        this.y_log_position_Arr[2] = y_log_position_ud;
        
        this.afterjump_Arr.push(this.y_log_position_Arr[2]);
    }
    
    //키보드로 점프
    if(this.isJumpingUp == false)
    {
        if(inputSystem.isKeyDown(37))
        {
            this.isJumpingUp = true;
            this.jumpPower = -17;
        }
        
        if(inputSystem.isKeyDown(39))
        {
            this.isJumpingUp = true;
            this.jumpPower = -15;
        }
        
        if(inputSystem.isKeyDown(38))
        {
            this.isJumpingUp = true;
            this.jumpPower = -15;
        }
    }
    else
    {
        this.y += this.jumpPower;
        this.jumpPower += 1;
        
        if(this.y >= this.afterjump_Arr[this.i+1]-150)
        {
            this.y = this.afterjump_Arr[this.i+1]-150;
            
            this.isJumpingUp = false;
            
            this.i++;
        }
        this.Invalid();
    }
};

PlayGameState.prototype.onMouseDown = function()
{
    
};

PlayGameState.prototype.Invalid = function()
{
    this.sprPlayer.SetPosition(this.x, this.y);
};

//랜덤 숫자 생성 함수
function getRandomInt(num)
{
	return Math.floor(Math.random() * num);
}