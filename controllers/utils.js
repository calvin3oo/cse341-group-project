// fade an element out, msBetween is the time between each fade
function fade (element, msBetween) {
    if (!fade.cache) fade.cache = {}
  
    const opacity = fade.cache[element.id] || window.getComputedStyle(element).getPropertyValue('opacity')
    element.style.opacity = opacity - 0.08
    fade.cache[element.id] = element.style.opacity
  
    if (opacity <= 0 || msBetween === 0) element.remove()
    else {
      setTimeout(() => {
        fade(element, msBetween)
      }, msBetween)
    }
}
  /**
   *
   * @param {boolean} isCritical whether or not the error is critical
   * @param {*} err
   *
   * displays any frontend error to the client.
   */
  export function handleErr (isCritical, err) {
    const errContainer = document.createElement('div')
  
    if (isCritical) {
      console.dir(err)// TODO delete this line
      document.querySelector('.critical-err')?.remove()
      errContainer.className = 'critical-err'
  
      const formContainer = document.createElement('form')
      formContainer.innerHTML = `<h4><strong>Critical error occoured:</strong> ${err.message}</h4>`
  
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'critical-err-buttons'
  
      const closeButton = document.createElement('button')
      closeButton.type = 'button'
      closeButton.innerHTML = 'Ignore'
      closeButton.className = 'btn btn-outline-secondary'
      closeButton.addEventListener('click', (_) => {
        document.querySelector('.critical-err').remove()
      })
  
      const refreshButton = document.createElement('button')
      refreshButton.type = 'button'
      refreshButton.innerHTML = 'Refresh'
      refreshButton.className = 'btn btn-outline-secondary'
      refreshButton.addEventListener('click', (_) => {
        window.onbeforeunload = null
        location.reload()
      })
  
      const homeButton = document.createElement('button')
      homeButton.type = 'submit'
      homeButton.id = 'critical-err-submit'
      homeButton.innerHTML = 'Go Home'
      homeButton.className = 'btn btn-primary'
      formContainer.addEventListener('submit', (event) => {
        event.preventDefault()
  
        window.onbeforeunload = null
        window.location.href = UrlHandler.getUrl('qa-home')
      })
  
      buttonContainer.appendChild(closeButton)
      buttonContainer.appendChild(refreshButton)
      buttonContainer.appendChild(homeButton)
  
      formContainer.appendChild(buttonContainer)
  
      errContainer.appendChild(formContainer)
  
      document.querySelector('body').appendChild(errContainer)
  
      document.getElementById('critical-err-submit').focus()
    } else {
      document.querySelector('.warning-err')?.remove()
  
      errContainer.className = 'warning-err'
      errContainer.innerHTML = `<p><strong>Non-critical error occoured:</strong> ${err.message}</p>`
      errContainer.style.opacity = 0.8
  
      const closeButton = document.createElement('button')
      closeButton.className = 'close-warning-err'
      closeButton.addEventListener('click', () => {
        fade(errContainer, 0)
      })
      closeButton.innerHTML = '&#10006;'
      errContainer.prepend(closeButton)
  
      // fade the error element out after 10 seconds
      setTimeout(() => {
        fade(errContainer, 40)
      }, 10000)
  
      document.querySelector('body').appendChild(errContainer)
    }
  }