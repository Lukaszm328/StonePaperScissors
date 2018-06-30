 var player_score = 0, cpu_score = 0, round = 1, game = 0;

 function update_score_round(){
	     document.getElementById("player1_score").innerHTML = "Score: " + player_score;
		 document.getElementById("player2_score").innerHTML = "Score: " + cpu_score;
		 document.getElementById("round").innerHTML = "Round: " + round;
 }
 
 function check_o(o, CPU){
		 if ( o == '0'){
		 document.getElementById("player1_chose").innerHTML = "<img src=\"images/kamien.jpg\" height=\"130\" align=\"middle\">";	 
		 }
		 if ( o == '1'){
		 document.getElementById("player1_chose").innerHTML = "<img src=\"images/papier.jpg\" height=\"130\">";	 
		 }
	     if ( o == '2'){
		 document.getElementById("player1_chose").innerHTML = "<img src=\"images/nozyce.jpg\" height=\"130\">";	 
		 }
		 
		 if ( CPU == '0'){
		 document.getElementById("player2_chose").innerHTML = "<img src=\"images/kamien.jpg\" height=\"130\">";	 
		 }
		 if ( CPU == '1'){
		 document.getElementById("player2_chose").innerHTML = "<img src=\"images/papier.jpg\" height=\"130\">";	 
		 }
		 if ( CPU == '2'){
		 document.getElementById("player2_chose").innerHTML = "<img src=\"images/nozyce.jpg\" height=\"130\">";	 
		 }
 }
 
 function new_game(){
		 document.getElementById("who_won").innerHTML = "New Game"  ;
		 player_score = 0;
	     cpu_score = 0;
	     round = 1;
	     update_score_round();
 }
 
 function game_update(who_win, o, CPU){
	
	if (who_win == 'CPU'){
		 check_o(o, CPU);
		 document.getElementById("who_won").innerHTML = "AI WIN";
		 cpu_score++;
		 round++;
		 update_score_round();
	 }
	 if (who_win == 'Player'){
		 check_o(o, CPU);
		 document.getElementById("who_won").innerHTML = "Player WIN";
		 player_score++;
		 round++;
		 update_score_round();
	 }
	 if (who_win == 'Remis'){
		 check_o(o, CPU);
		 document.getElementById("who_won").innerHTML = "REMIS!";
		 player_score++;
		 cpu_score++;
		 round++;
		 update_score_round();
	 }
	 
	 if (round == 6){
		 if (player_score > cpu_score){
			 update_score_round();
			 alert("Wyrałeś !");
			 new_game();
		 } else if (player_score < cpu_score) {
			 update_score_round();
			 alert("Przegrałeś z liczbą punktów: " + player_score);
			 new_game();
		 } else if (player_score == cpu_score) {
			 update_score_round();
			 alert("Remis! "+player_score +":"+cpu_score);
			 new_game();
		 }
	 }
 }
 
 function game_chose_save_to_db(o){
	 
	 if ( o == '0'){
	 $.ajax({url: "db/save_to_db_0.php", success: function(result){       
	 console.log(result)
	 }});
	 }
	 if ( o == '1'){
	 $.ajax({url: "db/save_to_db_1.php", success: function(result){ 	 
	 console.log(result);
	 }});
	 }
	 if ( o == '2'){
	 $.ajax({url: "db/save_to_db_2.php", success: function(result){  
	 console.log(result);
	 }});
	 }
 }
 
 function game_chose_from_db(o){

    var CPU_db;

    $.ajax({url: "db/load_from_db.php", success: function(result){       
	CPU_db = result;
		
	if ( o ==  CPU_db){
		game_update('Remis', o , CPU_db);
	 }
	
	else if( o == '0' && CPU_db == '1' ){
		 game_update('CPU', o , CPU_db);
	 }
	 
	else if ( o == '0' && CPU_db == '2' ){
		 game_update('Player', o , CPU_db);
	 }
	 
	 else if ( o == '1' && CPU_db == '2' ){
		 game_update('CPU', o , CPU_db);
	 }
	 
	 else if ( o == '1' && CPU_db == '0' ){
		 game_update('Player', o , CPU_db);
	 }
	 
	 else if( o == '2' && CPU_db == '0' ){
		 game_update('CPU', o , CPU_db);
	 }
	 
	 else if ( o == '2' && CPU_db == '1' ){
		game_update('Player', o , CPU_db);
	 }
	console.log(o+CPU_db);	
    }});
	
  }
 
 function game_chose(o){
	 
	 var CPU = Math.floor(Math.random()*3);	
	 
	 if ( o ==  CPU){
		game_update('Remis', o , CPU);
	 }
	
	else if( o == '0' && CPU == '1' ){
		 game_update('CPU', o , CPU);
	 }
	 
	else if ( o == '0' && CPU == '2' ){
		 game_update('Player', o , CPU);
	 }
	 
	 else if ( o == '1' && CPU == '2' ){
		 game_update('CPU', o , CPU);
	 }
	 
	 else if ( o == '1' && CPU == '0' ){
		 game_update('Player', o , CPU);
	 }
	 
	 else if( o == '2' && CPU == '0' ){
		 game_update('CPU', o , CPU);
	 }
	 
	 else if ( o == '2' && CPU == '1' ){
		game_update('Player', o , CPU);
	 }
	 
	 console.log(o+CPU);
 }
 
 function game_start(o){

	 if (game == 0){
		 game_chose(o);
		 game++;
	 } 
	 else if (game == 1){
		 game_chose_from_db(o);
		 game--;
	 }
 }
 