export const formatZodError = error => {
  const formattedErrors = {}

  error.errors.forEach(err => {
    const path = err.path.join('.')
    if (!formattedErrors[path]) {
      formattedErrors[path] = err.message
    }
  })

  return formattedErrors
}

export const echoErrors = (form, errors) => {
  console.log(errors)
  for (const key in errors) {
    if (errors.hasOwnProperty(key)) {
      const input = form.querySelector(`input[name=${key}] + p`)

      input.closest('.input').classList.add('error')

      if (input) {
        input.textContent = errors[key]
      }
    }
  }
}
