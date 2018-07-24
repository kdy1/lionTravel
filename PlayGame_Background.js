function PGBackGround()
{
    this.imgBackgroundBlue = resourcePreLoader.GetImage("img/game_background_blue.png");
    this.imgBackgroundCloud = resourcePreLoader.GetImage("img/game_background_cloud.png");
    
    this.posCloud = 0;
    this.speedCloud = 0.5;
}

PGBackGround.prototype.Update = function()
{
    this.posCloud -= this.speedCloud;
    
    if(this.posCloud < -(800+400))
    {
        this.posCloud = 800;
    }
};

PGBackGround.prototype.RenderLayerFront = function()
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");
};

PGBackGround.prototype.RenderLayerBack = function()
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");
    
    Context.drawImage(this.imgBackgroundBlue, 0, 0);
    for(var i = 0; i < 2; i++)  //i는 그려주고 싶은 개수
    {
        Context.drawImage(this.imgBackgroundCloud, this.posCloud + 800 * i, 30);
    }
};