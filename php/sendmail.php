<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

// От кого письмо
$mail->setFrom('info@fls.guru', 'Имя');
// Кому отправить
$to->addAddress('awdes@yandex.ru', 'Имя');
//Тема письма
$mail->Subject = 'Скажи Привет!';
// Рука
$hand = "Правая";
if ($_POST['hand'] == "left") {
	$hand = "Левая";
}
// Тело письма
$body = '<h1>Текст отправленного письма</h1>';
if (trim(!empty($_POST['name']))) {
	$body .= '<p><strong>Имя:</strong> ' . $_POST['name'] . '</p>';
}
if (trim(!empty($_POST['email']))) {
	$body .= '<p><strong>E-mail:</strong> ' . $_POST['email'] . '</p>';
}
if (trim(!empty($_POST['hand']))) {
	$body .= '<p><strong>Рука:</strong> ' . $hand . '</p>';
}
if (trim(!empty($_POST['age']))) {
	$body .= '<p><strong>Возраст:</strong> ' . $_POST['age'] . '</p>';
}
if (trim(!empty($_POST['massege']))) {
	$body .= '<p><strong>Рука:</strong> ' . $_POST['massege'] . '</p>';
}

//Прикрепит файл
if (!empty($_FILES['image']['tmp_name'])) {
	//# code... Путь загрузки файла
	$filePath = __DIR__ . "/files/" . $_FILES['image']['name'];
	//# грузим файл
	if (copy($_FILES['image']['tmp_name'], $filePath)) {
		# code...
		$fileAttach = $filePath;
		$body .= '<p><strong>Фото в прилодении</strong></p>';
		$mail->addAttachment($fileAttach);
	}
}
$mail->Body = $body;

//# Отправляем
if (!$mail->send()) {
	$message = 'Ошибка!';
} else {
	//# code...
	$message = 'Данные отправленны!';
}
$response = ['massage' => $message];
header('Content-type: application.json');
echo json_encode($response);
