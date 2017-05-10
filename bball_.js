$(document).ready(function() {
  var data;
  var sfbtoa = 'britika:hYZvU4zN8jxw';
  var today = new Date();
  var todayDisplay = today.toDateString();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();
  if (month < 10) {
    var scoreDate = year + '0' + month + '' + date-1;
  }
  else {
    var scoreDate = year + '' + month + '' + date-1;
  }
  var teamID = $('#selectTeam').val();
  ajax1();
 
  $('#selectTeam').change(function(){
    teamID = $(this).val();
    ajax1();
  });


  $('#heading h1').append(today.toDateString());
  $('.teams').hide();
  $('#doubleheader').hide();
function ajax1 (){
$.ajax
({
  type: "GET",
  url: 'https://www.mysportsfeeds.com/api/feed/pull/mlb/current/full_game_schedule.json?date=today&team='+ teamID,
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa(sfbtoa)
  },
  //data: formdata,
  success:
  function (data) {
    var dataSched = data.fullgameschedule.gameentry;
    if (dataSched[0]){
      displayGame (dataSched[0], '#today');
    }
    if (dataSched[1]){
      $('#doubleheader').show();
      displayGame(dataSched[1], '#doubleheader');
    }



     

  } // function/success
}); // ajax call
}
// todays game - full schedule API
function displayGame (gameData, game){
    var homeID = gameData.homeTeam.ID;
    var awayID = gameData.awayTeam.ID;
    var homeTeam = gameData.homeTeam.Name;
    var awayTeam = gameData.awayTeam.Name;
    var time = gameData.time;
    var homeColor = teamColor(homeID);
    var awayColor = teamColor(awayID);
    $(game + ' .teams').show();
    $(game + ' .game .time h1').html(time.slice(0, -2));
    $(game + ' .teams .away').append(awayTeam + ' @').addClass(awayColor);
    $(game + ' .teams .home').append(homeTeam).addClass(homeColor);    
    }
$.ajax
({
  type: "GET",
  url: 'https://www.mysportsfeeds.com/api/feed/pull/mlb/current/scoreboard.json?fordate='+ scoreDate,
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa(sfbtoa)
  },
  //data: '{ "comment" }',
  success: function (data){
    var dataScore = data.scoreboard.gameScore;
    for (var i=0; i<=dataScore.length; i++){
      var homeID = dataScore[i].game.homeTeam.ID;
      var awayID = dataScore[i].game.awayTeam.ID;
      var homeTeam = dataScore[i].game.homeTeam.Name;
      var awayTeam = dataScore[i].game.awayTeam.Name;
      var homeScore = Number(dataScore[i].homeScore);
      var awayScore = Number(dataScore[i].awayScore);
      var homeColor = teamColor(homeID);
      var awayColor = teamColor(awayID);
      if (homeID == 131 || awayID == 131){
        $('#yesterday .teams').show();
        $('#yesterday .teams .away').append(awayTeam + ' : ' + awayScore).addClass(awayColor);
        $('#yesterday .teams .home').append(homeTeam + ' : ' + homeScore).addClass(homeColor);
        if (homeID == 131 && homeScore > awayScore || awayID == 131 && awayScore > homeScore){
          $('#yesterday .game .WL h1').html('W');
        }
        else{
          $('#yesterday .game .WL h1').html('L');
        }
        break;
      } // if
      else {
        continue;
      } // else

    } // for
  } // success function
}); //ajax call
// yesterdays score - scoreboard API
function teamColor(id) {
  var teamColorClass;
  if (id == 140 || id == 130 || id == 113 || id == 135 || id == 116 || id == 124 || id == 129 || id == 133 || id == 126 ){
    return 'red-team';
  }
  else if (id == 111 || id == 122 || id == 128 || id == 136){
    return 'orange-team';
  }
  else if (id == 119 || id == 138 || id == 114){
    return 'black-team';
  }
  else if (id == 117 || id == 134 || id == 120 || id == 127 || id == 139 || id == 123 || id == 115 || id == 121){
    return 'navy-team';
  }
  else if (id == 131 || id == 118 || id == 137 || id == 112){
    return 'blue-team';
  }
  else if (id == 125){
    return 'green-team';
  }
  else if (id == 132){
    return 'yellow-team';
  }
}



}); //document ready
