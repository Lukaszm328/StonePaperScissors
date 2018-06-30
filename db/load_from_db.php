<?php
$link = mysqli_connect(

            'localhost',  

            'root',   

            '',  

            'game');   

$wynik = mysqli_query($link, "SELECT * FROM score ") 
or die('B³¹d zapytania'); 
 
mysqli_fetch_assoc($wynik) ;  
$r = mysqli_fetch_array($wynik) ;
       
	   if($r[0] > $r[1] && $r[0] > $r[2]){
	   echo "1"; // 0
	   } 
       if( $r[1] > $r[0] && $r[1] > $r[2]){
	   echo "2"; // 1
       } 
       if($r[2] > $r[0] && $r[2] > $r[1]){
	   echo "0"; // 2
       } 
	   
mysqli_close($link);
?>
