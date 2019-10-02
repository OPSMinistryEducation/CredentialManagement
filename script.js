// register collects the information provided in the form and saves it in the
// local credentials store.
const register = async () => {
  const user = {
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
  }

  // Persist access information in the local credentials store
  const cred = new PasswordCredential({
    id: user.email,
    password: user.password
  })

  await navigator.credentials.store(cred)
  show(`Credentials stored for ${user.email}`)
}

const login = async () => {
  const cred = await navigator.credentials.get({password: true})
  if (!cred) {
    return show('No credentials in store.')
  }

  show(`You are now logged in as ${cred.id}.`)
}


const show = (msg) => {
  document.getElementById('welcome-text').innerHTML = msg
}