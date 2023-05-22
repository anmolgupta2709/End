<?php
// database connection code
// $con = mysqli_connect('localhost', 'database_user', 'database_password','database');
$con = mysqli_connect('localhost', 'root', '', 'test');

// get the post records
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];

// check if table already exists
$table_query = mysqli_query($con, "SHOW TABLES LIKE 'contact'");
$table_exists = mysqli_num_rows($table_query) > 0;
if (!$table_exists) {

    // create table query
    $sql = "CREATE TABLE `contact` (
    `Id` int(11) NOT NULL AUTO_INCREMENT,
    `Name` varchar(50) NOT NULL,
    `Email` varchar(50) NOT NULL,
    `Phone` varchar(50) NOT NULL,
    PRIMARY KEY (`Id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1";
    // execute the query
    $rs = mysqli_query($con, $sql);
    if ($rs) {
        echo "Table is created successfully";
    } else {
        echo "Error creating table: " . mysqli_error($con);
    }
}
// database insert SQL code
$sql = "INSERT INTO `contact` (`Id`, `Name`, `Email`, `Phone`) VALUES ('0', '$name', '$email', '$phone')";
// insert in database
$rs = mysqli_query($con, $sql);
if ($rs) {
    echo "Contact Records Inserted";
}
// close database connection
mysqli_close($con);
// redirect to index.php
header("location:index.php");
?>