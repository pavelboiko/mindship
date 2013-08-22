<?php
$data = array();
$data['1375304400000'][] = array('dateStart' => '15', 'dateEnd' => '24', 'length' => '11' );
$data['1375304400000'][] = array('dateStart' => '25', 'dateEnd' => '29', 'length' => '5' );
echo $_GET['callback']. "(".json_encode($data).");";
?>


