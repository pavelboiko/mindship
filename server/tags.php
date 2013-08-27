<?php
$times = explode(',', $_REQUEST['t']);
$ctimes = count($times);

$f = @fopen('array.csv', 'a+');


var_dump($f);

$tasks = createArray($times);

while($row = fgetcsv($f, 9000)) {
	foreach($times as $val) {
		if (isTaskInTime($val, $row[2], $row[3])) {
//			$tasks[$val][] = $row;
			$tasks[$val][] = array(
				$row[0],
				$row[1],
				$row[2],
				$row[3],
				@date('d-m-Y', $row[2]/1000),
				@date('d-m-Y', $row[3]/1000),
				($row[2] - $val)/(1000 *24*3600),
				($row[3] - $val)/(1000 *24*3600)
			);
		}
	}
}

$new_tasks = array();
for ($i = 0; $i < $ctimes; $i++) {
	if (!isset($tasks[$times[$i]]) || !count($tasks[$times[$i]])) {
		$new_tasks += createTask($times[$i]);
	}
}
if (count($new_tasks)) {
	for ($i = 0; $i < count($new_tasks); $i++)
		fputcsv($f, $new_tasks[$i]);
}

for ($i = 0; $i < count($new_tasks); $i++) {
	foreach($times as $val) {
		if (isTaskInTime($val, $new_tasks[$i][2], $new_tasks[$i][3])) {
//			$tasks[$val][] = $new_tasks;
			$tasks[$val][] = array(
				$new_tasks[0],
				$new_tasks[1],
				$new_tasks[2],
				$new_tasks[3],
				@date('d-m-Y', $new_tasks[2]/1000),
				@date('d-m-Y', $new_tasks[3]/1000),
				($new_tasks[2] - $val)/1000
			);
		}
	}
}

echo json_encode($tasks);
exit;

#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function createTask($time) {
	$r = rand(2, 10);
	$day = 24 * 3600 * 1000;
	$tasks = array();
	for ($i = 0; $i < $r; $i++) {
		$start = $time - $day * rand(0, 60);
		$end = $time + $day * rand(0, 60);
		$tasks[] =  array(rand(1, 100000000),'Name ' . rand(1, 10000000), $start, $end);
	}
	return $tasks;
}

function isTaskInTime($time, $task_start, $task_end){
//	return $task_start <= $time && $task_end >= $time;
	$t = @date('t', $time/1000);
	$time_end = $time+($t*24*3600*1000);
	return ($task_start <= $time || $task_start <= $time_end) && $task_end >= $time;
}

function createArray($times) {
	$arr = array();

	foreach ($times as $val) {
		$arr[$val] = array();
	}

	return $arr;
}