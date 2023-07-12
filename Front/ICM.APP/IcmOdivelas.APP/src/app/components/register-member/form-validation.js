function handleFieldFocus(event) {
  event.target.classList.remove('is-invalid', 'is-valid');
}

function handleFieldBlur(event) {
  const field = event.target;
  if (field.value === '') {
    field.classList.add('is-invalid');
  } else {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
  }
}
