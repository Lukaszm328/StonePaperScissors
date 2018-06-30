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

$new = $r[2];
$new++;

$update = mysqli_query($link, "UPDATE `score` SET `2`='$new' WHERE `player`='xyz'") 
or die('B³¹d zapytania');
 
mysqli_close($link);
?>