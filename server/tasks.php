<?php
$data = array();
$data['1375304400000'][] = array('dateStart' => '15', 'dateEnd' => '20', 'length' => '31' );
echo $_GET['callback']. "(".json_encode($data).");";
?>


