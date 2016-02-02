<?php
$servername = "localhost";
$username = "root";
$password = "root";
$db = 'test';

$dbh = new PDO( "mysql:host=$servername; dbname=$db;", $username,$password);
$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$querry = $_GET['querry'];

returnResults($dbh, $querry);

Function returnResults($db, $querry)
{
    try{
        
     foreach($db->query($querry) as $row)
     {

         $data2 = '';
         
         for($i=0; $i <= (sizeof($row) / 2) - 1 ; $i++)
         {
             $data2 = $data2 .$row[$i].'****';
           
         }
           $data2 = json_encode($data2); 
            echo "<br>". $data2; 
        
     }
    }
    
    catch(PDOException $e)
    {
        echo "fuck";
        echo $e;
    }
}
?>