var points;
var gradient;
var y_intercept;
var num_of_points;
var canvas;
var ctx;
var y_total;
var player_inp
var answer_player;
var ready_to_play;
var stage;

function initialize()
{
  ready_to_play = false
  canvas = document.getElementById("mainbox")
  ctx = canvas.getContext("2d")
  num_of_points = 5;
  stage = 1;
  get_random_points(10)
}

function start_game()
{
  var item = document.getElementById("yesorno")
  item.innerHTML = ""
  clearCanvas()
  get_random_points(num_of_points)
  var hjhj = document.getElementById("game")
  hjhj.innerHTML = 'Correlation = 0.<input type = "text" id ="player_input" onchange = "help()"> </input>'
}

// y = a + bx
function drawline(a,b)
{
  var y_line = 200 * b + a;
  ctx.strokeStyle = "black"
  ctx.beginPath()
  ctx.moveTo(0,y_intercept);
  ctx.lineTo(200,y_line);
  ctx.stroke();
}

function calc_lr()
{
  var aaa = 0; //x
  var bbb = 0;//x2
  var ccc = 0; //xy
  var ddd = 0; //y
  for (var i = 0; i < num_of_points; i ++)
  {
    aaa += points[i][0];
    bbb += (points[i][0])*(points[i][0]);
    ccc += (points[i][0])*(points[i][1]);
    ddd += points[i][1];
  }
  y_total = ddd;
  gradient = (num_of_points*ccc - aaa*ddd)/((num_of_points*bbb)- (aaa**2));
  y_intercept = (ddd - gradient*aaa)/num_of_points;
}
//y = mx + c;y1 = mx1 + c;y2 = mx2 + c;y1 - y0 = 202m - mx2;y1 = 200*m + yo

function get_random_points(x)
{
  num_of_points = x;
  points = [];
  var rand_case = Math.floor(Math.random() * 11 + 1);
  console.log("case" + rand_case.toString());
  for (var i = 0; i < x; i++)
  {
    if (rand_case == 1)
    {
      const1 = 200/x;
      x_c = Math.floor(Math.random() * const1 + 1 + i * const1);
      y_c =Math.floor(Math.random() * 200 + 1);
      ctx.strokeStyle = '#FF0000';
      ctx.beginPath();
      ctx.arc(x_c,y_c, 1, 0, 2 * Math.PI);
      ctx.stroke();
      points.push([x_c,y_c]);
    }
    else if (rand_case > 7)
    {
      const1 = 200/x;
      x_c = Math.floor(Math.random() * const1 + 1 + i * const1);
      y_c =Math.floor(Math.random() * (Math.random()*11 + 7)*const1 + 1 + i * const1 + (Math.random()*10));
      if (y_c > 200)
      {
        y_c = Math.floor(Math.random()*80 + 119)
      }
      ctx.strokeStyle = '#FF0000';
      ctx.beginPath();
      ctx.arc(x_c,y_c, 1, 0, 2 * Math.PI);
      ctx.stroke();
      points.push([x_c,y_c]);
    }
    else if (rand_case == 2)
    {
      const1 = 200/x;
      x_c = Math.floor(Math.random() * const1 + 1 + i * const1);
      y_c =Math.floor(Math.random() * 2 *const1 + 1 + i * const1);
      if (y_c > 200)
      {
        y_c = Math.floor(Math.random()*30 + 169)
      }
      ctx.strokeStyle = '#FF0000';
      ctx.beginPath();
      ctx.arc(x_c,y_c, 1, 0, 2 * Math.PI);
      ctx.stroke();
      points.push([x_c,y_c]);
    }
    else if (2 < rand_case < 7)
    {
      const1 = 200/x;
      x_c = Math.floor(Math.random() * const1 + 1 + i * const1);
      var hhhhh = Math.floor(Math.random()*2 + 1);
      if (hhhhh == 1){
        y_c =Math.floor(Math.random() * 4 *const1 + 1 + i * const1);
      }
      else {
        y_c =Math.floor(Math.random() * 200 + 1);
      }
      if (y_c > 200)
      {
        y_c = Math.floor(Math.random()*30 + 169)
      }
      ctx.strokeStyle = '#FF0000';
      ctx.beginPath();
      ctx.arc(x_c,y_c, 1, 0, 2 * Math.PI);
      ctx.stroke();
      points.push([x_c,y_c]);
    }
  }
  calc_lr();
  drawline(y_intercept,gradient);
}

function clearCanvas () {
  var canvas = document.getElementById("mainbox");
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width,canvas.height);
}

function write_data()
{
  var infodata = document.getElementById("result");
  infodata.innerHTML = "Equation of the line is y = " + gradient.toFixed(3) + "x + " + y_intercept.toFixed(3);
  var corrdata = document.getElementById("corr");
  corrdata.innerHTML = "RSquared = " +findCOD().toFixed(3)
}

function fun1(x)
{
  if (ready_to_play == true)
  {
    clearCanvas()
    get_random_points(x)
  }
  else
  {
    let startt = confirm("Play Daily?")
    if (startt == true)
    {
      num_of_points = x
      ready_to_play = true
      start_game()
    }
  }
}

function findCOD()
{
  var eee = y_total/num_of_points;
  var fff = 0; //y - ymean
  var ggg = 0; //y - y'
  for (i = 0; i < num_of_points; i++)
  {
    fff += ((points[i][1] - eee)**2)
    ggg += ((points[i][1] - points[i][0]*gradient - y_intercept)**2)
  }
  return (1 - ggg/fff)
}

function endgame()
{
  ready_to_play = false
  stage = 1
  var hjhj = document.getElementById("game")
  hjhj.innerHTML = ""
}

function help()
{
  if (ready_to_play == true)
  {
    player_inp = document.getElementById("player_input")
    var kkk = player_inp.value
    answer_player = Number(kkk)/(10**kkk.length)
    player_inp.value = ""
    write_data()
    right_or_wrong()
    clearCanvas()
    get_random_points(num_of_points)
    stage += 1
  }
  if (stage == 11)
  {
    endgame()
    alert("Thank you for Playing")
  }
}

function right_or_wrong()
{
  if (Math.abs(answer_player - findCOD()) < 0.08)
  {
    var item = document.getElementById("yesorno")
    item.innerHTML += '<input type="button" id="small_button_good" value="&#x2713;" /> '
  }
  else
  {
    var item = document.getElementById("yesorno")
    item.innerHTML += '<input type="button" id="small_button_no_good" value="&#x2715;" /> '
  }
}
