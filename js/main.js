'use strict';

document.addEventListener('DOMContentLoaded', function (e) {
	const form = document.getElementById('form');
	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();
		let error = formValidate(form);
		let formData = new FormData(form);
		formData.append('image', formImage.files[0]);

		if (error === 0) {
			form.classList.add('_sending');
			let respose = await fetch('sendmail.php', {
				// metod: postMessage,
				metod: 'POST',
				body: formData
			});
			if (respose.ok) {
				let result = await respose.json();
				alert(result.message);
				formPerview.innerHTML = "";
				form.reset();
				form.classList.remove('_sending');
			} else {
				alert('Ошибка');
			}
		} else {
			alert('Заполните обязательные поля!');
			form.classList.remove('_sending');
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');

		for (let i = 0; i < formReq.length; i++) {
			const input = formReq[i];
			formRemoveError(input);

			if (input.classList.contains('_email')) {
				if (verificationEmail(input)) {
					formAdError(input);
					error++;
				}
			} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
				formAdError(input);
				error++;
			} else {
				if (input.value === '') {
					formAdError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAdError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');

	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	//! Проверка E-mail
	function verificationEmail(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\/-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
	//! Предварительный просмотр загружаемых изображений
	const formImage = document.getElementById('form-image');
	const formPerview = document.getElementById('form-preview');
	formImage.addEventListener('change', () => {
		uploadFile(formImage.files[0]);
	});
	function uploadFile(file) {
		//? Проерка типа файла
		if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
			alert('Разрешены только изображения');
			formImage.value = '';
			return;
		}
		//? Проверка размера файла
		if (file.size > 2 * 1024 * 1024) {
			alert('Файл должен быть не больше 2 МБ');
			return;
		}
		let reader = new FileReader();
		reader.onload = function (e) {
			formPerview.innerHTML = `<img src="${e.target.result}" alt="Фото">`;
		};
		reader.onerror = function (e) {
			alert('Ошибка!');
		};

		reader.readAsDataURL(file);
	}
});
