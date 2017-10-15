function configColor(type, backgroundImage = "") {
	const focus = document.getElementsByClassName('focus');
	const container = document.getElementsByClassName('container-fluid');
	const quotation = document.getElementsByClassName('quotation');
	// if (focus.length !== 0 ) focus[0].style.backgroundColor = type.backgroundColor;
	if (container.length !== 0) {
		if (backgroundImage === "") container[0].style.backgroundColor = type.backgroundColor;
		else container[0].style.backgroundImage =`url(${backgroundImage})`;
	}
	// if (quotation.length !== 0 ) quotation[0].style.backgroundColor = type.backgroundColor;
	document.body.style.color = type.color;
	const col_day = document.getElementsByClassName('col-day');
	if (col_day.length !== 0 ) {
		for (let i = 0; i < col_day.length; i++) {
			col_day[i].style.color = type.highLight;
			document.getElementsByClassName('col-hour-end')[i].style.color = type.highLight;
			document.getElementsByClassName('col-hour-start')[i].style.color = type.highLight;
		}
	}
}
function changeColor(a,b,c, data) {
	// body...
	document.getElementById(a).style.backgroundColor = data.backgroundColor;
	document.getElementById(a).style.color = '#fff';
	document.getElementById(a).value= data.backgroundColor;
	document.getElementById(a).title = `Background Color: ${data.backgroundColor}`;

	document.getElementById(b).style.color = data.color;
	document.getElementById(b).style.backgroundColor= "#b6adad";
	document.getElementById(b).value= data.color;
	document.getElementById(b).title = `Color: ${data.color}`;

	document.getElementById(c).style.color = data.highLight;
	document.getElementById(c).value = data.highLight;
	document.getElementById(c).title = `High Light: ${data.highLight}`;
	document.getElementById(c).style.backgroundColor= "#b6adad";
}

function myFunction() {
    this.value = this.value.toUpperCase();
    if (this.id === 'cBackgroundColor') this.style.backgroundColor = this.value;
    else this.style.color = this.value;
}

function alertTimeout(tag, class_alert_add, class_alert_remove , wait) {
    // body...
    const alert = document.getElementById(tag);
    alert.classList.remove(class_alert_remove);
    alert.classList.add(class_alert_add);
    alert.style.display = 'block';
    setTimeout(function() {
        alert.style.display = 'none';
    }, wait);
}

// dung duoc nhung chay cui :) nen khong dung
function listenClick(tag) {
	// createColorPicker();
	const attribute = tag.id;
	ColorPicker(
  document.getElementById('slide'),
  document.getElementById('picker'),
  function(hex, hsv, rgb, pickerCoordinate, slideCoordinate) {
  ColorPicker.positionIndicators(
    document.getElementById('slide-indicator'),
    document.getElementById('picker-indicator'),
    slideCoordinate, pickerCoordinate
	);

  document.getElementsByClassName('container-fluid')[0].style.backgroundColor = hex;
  document.getElementById('textColor').style.backgroundColor = hex;
  });

	window.addEventListener('click', function (event) {

		let color_picker =  document.getElementById('blockColorPicker');
	if (tag.contains(event.target)){
		// Clicked in box
		color_picker.style.display = 'block';
			// createColorPicker();
	} else{
		// Clicked outside the box
		// color_picker.style;
		color_picker.style.display = 'none';
		// 
		console.log('out.....');
		let parentPicker = document.getElementById('picker');
		let parentSlide = document.getElementById('slide');
		let child = document.getElementsByTagName('svg');
		if (child[1])	{
			parentPicker.removeChild(child[1]);
			parentSlide.removeChild(child[1]);
		}
		// else createColorPicker();
	}
	});
}
// dung duoc nhung chay cui :) nen khong dung
function createColorPicker() {
	// body...
	
	let divColorPicker = document.createElement('div');

	let divPickerWrapper = document.createElement('div');
	let divSlideWrapper = document.createElement('div');

	let divPicker = document.createElement('div');
	let divPickerIndicator = document.createElement('div');

	let divSlide = document.createElement('div');
	let divSlideIndicator = document.createElement('div');

	divPickerWrapper.appendChild(divPicker);
	divPickerWrapper.appendChild(divPickerIndicator);

	divSlideWrapper.appendChild(divSlide);
	divSlideWrapper.appendChild(divSlideIndicator);

	divPickerWrapper.className = " picker-wrapper";
	divSlideWrapper.className = " slide-wrapper";
	divPicker.className = " picker";
	divPicker.id = "picker";
	divPickerIndicator.className = " picker-indicator";
	divPickerIndicator.id = "picker-indicator";
	divSlide.className = " slide";
	divSlide.id = "slide";
	divSlideIndicator.className = " slide-indicator";
	divSlideIndicator.id = "slide-indicator";

	divColorPicker.appendChild(divPickerWrapper);
	divColorPicker.appendChild(divSlideWrapper);

	divColorPicker.className = " cp cp-fancy";
	divColorPicker.id = "color-picker";

	let showColorPicker = document.getElementById('showColorPicker');
	showColorPicker.appendChild(divColorPicker);
}