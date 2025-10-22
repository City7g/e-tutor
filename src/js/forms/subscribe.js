import { z } from 'zod'
import { formDataToObject } from '../utils/form.js'
import { echoErrors, formatZodError } from '../utils/formatZodError.js'

const formSchema = z.object({
  email: z.string().email().min(8).max(100),
})

export default () => {
  const form = document.querySelector('form.subscribe')
  const inputs = document.querySelectorAll('input.input__field')

  if (inputs.length) {
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.closest('.input').classList.remove('error')
      })
    })
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault()

      const inputs = form.querySelectorAll('.input')

      if (inputs.length) {
        inputs.forEach(input => input.classList.remove('error'))
      }

      const formData = formDataToObject(new FormData(form))

      try {
        const res = formSchema.parse(formData)

        console.log(res)
      } catch (err) {
        if (err instanceof z.ZodError) {
          const errors = formatZodError(err)

          echoErrors(form, errors)

          console.log(errors)
        } else {
          console.error('Неожиданная ошибка валидации:')
        }
      }
    })
  }
}
