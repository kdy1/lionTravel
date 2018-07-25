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
    

    // 통나무 착지한 직후에 jumpPower = 0 되기 때문에 다음 Update시 점프가 가능합니다
    // 그걸 막기 위한 변수입니다.
    //
    // 이 값이 false일 경우, jumpPower 변수를 수정할 수도 없고, 읽을 수도 없습니다.
    this.isJumpPowerNotLocked = true;
    // 일정 시간 후 isJumpPowerNotLocked를 다시 true로 바꿔주기 위한 타이머입니다.
    this.timerForResettingJumpPowerLock = null;
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
    Context.font = "50px Arial";
    if(debugSystem.debugMode)
        Context.fillText(`1번 ${this.posShortlog1}`, this.posShortlog1, this.y_log_position_Arr[0]-50);
    Context.drawImage(this.imgShortlog1, this.posShortlog1, this.y_log_position_Arr[0], 170, 32);
    
    if(debugSystem.debugMode)
        Context.fillText(`2번 ${this.posShortlog2}`, this.posShortlog2, this.y_log_position_Arr[1]-50);
    Context.drawImage(this.imgShortlog2, this.posShortlog2, this.y_log_position_Arr[1], 170, 32);
    
    if(debugSystem.debugMode)
        Context.fillText(`3번 ${this.posShortlog3}`, this.posShortlog3, this.y_log_position_Arr[2]-50);
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
    
    var logXPosBoundary = -170;

    if(this.posShortlog1 < logXPosBoundary)
    {
        this.posShortlog1 = 800;
        
        var y_position_values_ud = [350, 300, 250];
	    var position_index_ud = getRandomInt(3);
        var y_log_position_ud = y_position_values_ud[position_index_ud];
        
        this.y_log_position_Arr[0] = y_log_position_ud;
        
        this.afterjump_Arr.push(this.y_log_position_Arr[0]);
        // console.log('1번: ', this.afterjump_Arr.length - 1);
    }
    
    if(this.posShortlog2 < logXPosBoundary)
    {
        this.posShortlog2 = 800;
        
        var y_position_values_ud = [350, 300, 250];
	    var position_index_ud = getRandomInt(3);
        var y_log_position_ud = y_position_values_ud[position_index_ud];
        
        this.y_log_position_Arr[1] = y_log_position_ud;
        
        this.afterjump_Arr.push(this.y_log_position_Arr[1]);
        // console.log('2번: ', this.afterjump_Arr.length - 1);
    }
    
    if(this.posShortlog3 < logXPosBoundary)
    {
        this.posShortlog3 = 800;
        
        var y_position_values_ud = [350, 300, 250];
	    var position_index_ud = getRandomInt(3);
        var y_log_position_ud = y_position_values_ud[position_index_ud];
        
        this.y_log_position_Arr[2] = y_log_position_ud;
        
        this.afterjump_Arr.push(this.y_log_position_Arr[2]);
        // console.log('3번: ', this.afterjump_Arr.length - 1);
    }

    
    // 화면 가장 왼쪽에 있는 로그 테스트
    // var logToTest = this.afterjump_Arr[this.i];
    var logToTest = this.afterjump_Arr[this.afterjump_Arr.length - 2];
    
    // 밟을 수 있는 통나무
    // TODO:
    var stepableLogExists = true;
    

    
    

    if (this.isJumpPowerNotLocked && this.jumpPower <= 20) {
        // TODO: 라이언 이미지 Y 크기
        var lionImageYSize = 0; 
        // y축 방향으로 화면에서 나가지 않게 설정
        if (0 < (this.y + this.jumpPower) && (this.y + this.jumpPower) < 600 - lionImageYSize) {
            this.y += this.jumpPower;
        }
        this.jumpPower += 1;
    }
    
    //키보드로 점프
    if (this.isJumpPowerNotLocked && this.jumpPower > 0) {
        if(inputSystem.isKeyDown(37))
        {
            this.jumpPower = -17;
        }
        
        if(inputSystem.isKeyDown(39))
        {
            this.jumpPower = -15;
        }
        
        if(inputSystem.isKeyDown(38))
        {
            this.jumpPower = -15;
        }
    }
    
    
    // 밟을 수 있는 통나무가 존재하고, 아래로 떨어지고 있고, 통나무보다 약간 위에 있으면 착지
    if( stepableLogExists && this.jumpPower > 0 && (logToTest-200 < this.y && this.y < logToTest-150))
    {
        this.y = logToTest - 150;
        // console.info(`Setting player's y as ${this.y} using ${logToTest}`);
        
        this.jumpPower = 0;
        this.isJumpPowerNotLocked = false;
        var self = this;
        if(!!this.timerForResettingJumpPowerLock) {
            clearTimeout(this.timerForResettingJumpPowerLock);
        }

        // TODO: 현재는 0.3초 후 jump power lock이 풀리는데,
        // (${오른쪽 끝} - ${착지한 위치}) / ${로그 속도}로 바꿔줘야 함
        //
        // 현재는 착지 위치에 따라 이상하게 떨어지는 경우가 있음.
        this.timerForResettingJumpPowerLock = setTimeout(function(){
            self.isJumpPowerNotLocked = true;
        }, 300);
        
        this.i++;
    }
    this.Invalid();
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