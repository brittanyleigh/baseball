$(document).ready(function() {
  var data;

  var sfbtoa = 'britika:hYZvU4zN8jxw';
  var today = new Date();
  var todayDisplay = today.toDateString();
  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();
  var schedDate = year + '-0' + month + '-' + date;
  var scoreDate = year + '0' + month + '' + date-1;


  $('#today h4').append(today.toDateString());


$.ajax
({
  type: "GET",
  url: 'https://www.mysportsfeeds.com/api/feed/pull/mlb/2017-regular/full_game_schedule.json',
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa(sfbtoa)
  },
  //data: formdata,
  success:
  function todaysGame (data) {
    var dataSched = data.fullgameschedule.gameentry;
    for (var i=0; i<= dataSched.length; i++){
      var homeTeam = dataSched[i].homeTeam.Name;
      var awayTeam = dataSched[i].awayTeam.Name;
      var time = dataSched[i].time;
        if (dataSched[i].date == schedDate &&
          (dataSched[i].homeTeam.ID == 131 || dataSched[i].awayTeam.ID == 131)){
            $('#body h4').append(awayTeam + ' at ' + homeTeam + ' @ ' + time);
        } // if
    } // for
  } // function/success
}); // ajax call
// full schedule

$.ajax
({
  type: "GET",
  url: 'https://www.mysportsfeeds.com/api/feed/pull/mlb/2017-regular/scoreboard.json?fordate='+ scoreDate,
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + btoa(sfbtoa)
  },
  //data: '{ "comment" }',
  success: function (data){
    var dataScore = data.scoreboard.gameScore;
    for (var i=0; i<=dataScore.length; i++){
      var homeTeam = dataScore[i].game.homeTeam.Name;
      var awayTeam = dataScore[i].game.awayTeam.Name;
      var homeScore = dataScore[i].homeScore;
      var awayScore = dataScore[i].awayScore;
      if (dataScore[i].game.homeTeam.ID == 131 || dataScore[i].game.awayTeam.ID == 131){
        $('#yesterday h4').html(homeTeam + ' : ' + homeScore + ' // ' + awayTeam + ' : ' + awayScore);
        break;
      } // if
      else {
        continue;
      } // else

    } // for
  } // success function
}); //ajax call





}); //document ready
