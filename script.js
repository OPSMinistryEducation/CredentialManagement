
// import { sign } from "tweetnacl";
// import { decodeUTF8, encodeUTF8 } from "tweetnacl-util";

// register collects the information provided in the form and saves it in the
// local credentials store.
const register = async () => {
  const keys = generateKeys()
  const user = {
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
    publicKey: keys.publicKey,
    privateKey: keys.privateKey
  }

  // Persist access information in the local credentials store
  const cred = new PasswordCredential({
    id: user.email,
    password: user.password,
    publicKey: user.publicKey,
    privateKey: user.privateKey
  })

  await navigator.credentials.store(cred)
  show(`Credentials stored for ${user.email}`)
  show(`User's generated public key ${user.publicKey}`)
  console.log(user.publicKey)
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


function generateKeys() {
  return tweetnacl.sign.keyPair()
}


function generateSignature(message, privateKey){
  const bytes = decodeUTF8(message);
  const signature = sign.detached(bytes, privateKey);
  return signature
}
