export const formDataToObject = formData => {
  const object = {}
  formData.forEach((value, key) => {
    object[key] = value
  })
  return object
}
