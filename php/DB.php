<?php
// Used to create the database
// Include variables from the given file

$servername = "localhost";
$username= "root";
$password= "root";
$dbname= "KIT";


    // Database creation Variable
    $create = ("CREATE DATABASE `$dbname`;") 
        or die(print_r($dbh->errorInfo(), true));


$project =("CREATE TABLE IF NOT EXISTS `Project`(
`ProjectID` int NOT NULL AUTO_INCREMENT,
`ProjectName` varchar(30) NOT NULL,
`ProjectDescription` varchar(100) NOT NULL,
`DateCreated` date NOT NULL,
PRIMARY KEY (`ProjectID`)
);");


$gantt = ("CREATE TABLE IF NOT EXISTS `GANTT`(
`ChartID` int NOT NULL AUTO INCREMENT,
`UserID` int NOT NULL,
`ProjectID` int NOT NULL,
PRIMARY KEY (ChartID),
FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);");

$pertt = ("CREATE TABLE IF NOT EXISTS `PERT`(
`UserID` int NOT NULL,
`ChartID` int NOT NULL AUTO INCREMENT,
`ProjectID` int NOT NULL,
PRIMARY KEY (`ChartID`),
FOREIGN KEY (`ProjectID`) REFERENCES Project(`ProjectID`)
);");


$wbt = ("CREATE TABLE IF NOT EXISTS `WBT`(
`UserID` int NOT NULL,
`ChartID` int NOT NULL AUTO INCREMENT,
`ProjectID` int NOT NULL,
PRIMARY KEY (ChartID),
FOREIGN KEY (ProjectID) REFERENCES Project(ProjectID)
);");


//Connect to the server
try{// try to connect to the database if it already exists

$dbh = new PDO( "mysql:host=$servername; dbname=$dbname;", $username,$password);
$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//echo "<br> db entered <br>";
    
}

catch(PDOException $e) // if db dosent exist connect to server create db then link to  it
{ 
    //echo "<br> Creating Database<br>";
    $dbh = new PDO( "mysql:host=$servername;", $username,$password);
    $dbh->exec($create);
    $dbh = new PDO( "mysql:host=$servername; dbname=$dbname;", $username,$password);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
}

try
{
// Excute the query
	$dbh->exec($project);
	$dbh->exec($gantt);
	$dbh->exec($pertt);
	$dbh->exec($wbt);
}

catch(PDOException $e)
{
	echo $e;
}
//close the connection
$dbh =null;
?>
