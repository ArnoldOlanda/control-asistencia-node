const formSubmit = document.getElementById('formSubmit');
const user=document.getElementById('user');
const password=document.getElementById('password');



const userMessageError=document.getElementById('userMessageError')
const passwordMessageError=document.getElementById('passwordMessageError')

formSubmit.addEventListener('submit',(e)=>{
  let validData=true;
  userMessageError.innerText=""
  passwordMessageError.innerText=""
  
  e.preventDefault();
  if(user.value.length != 8){
    userMessageError.innerText="Escriba un dni valido de 8 caracteres"
    validData=false
  }
  if(password.value.length<1){
    passwordMessageError.innerText="Escriba la contraseña"
    validData=false
  }

  if(validData!=false){
    formSubmit.submit()
  }
})
