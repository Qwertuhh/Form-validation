let d_handler = true,
  formValue = { username: null, email: null, phoneNum: null, password: null, passwordConfirm: null };

const form_box = document.getElementsByTagName('form')[0]

const inp = document.getElementsByTagName('input')

for (const i of inp) {
  if (i.type != 'submit') {
    i.addEventListener('click', (e) => {
      e.target.nextElementSibling.hidden = false
    }
    )
  }
}

form_box.addEventListener('submit', (e) => {
  e.preventDefault()
  let pure = true;
  for (const key in formValue) {
    formValue[key] === null | undefined ?
      pure = false : null

  }
  if (pure) {
    localStorage.setItem("formData", formValue)
    console.table(formValue)
    subMess = document.getElementById('err_con')
    subMess.innerHTML = `
        <div id="subMess" >
      <p>Form is submited </p>
      <div></div>
    </div>`;
    location.reload()
    setTimeout(() => { document.getElementById('err_con').innerHTML = `` }, 1200)

  } else {

    console.error(new Error('Enter all details completely'))
    document.getElementById('err_con').innerHTML = `
        <div id="main_err">
      <p>Enter all details correctly</p>
      <div></div>
    </div>`;
    setTimeout(() => { document.getElementById('err_con').innerHTML = `` }, 1200)

  }
})
form_box.addEventListener('input', (e) => {
  if (d_handler) {
    inputValue = e.target.value
    type = e.target.dataset
    errorMess = e.target

    if (type.typeInput == "username" && /[?:\w\d\W\-_]{5}/g.test(inputValue) === true && inputValue.length <= 15 && inputValue.length >= 5) {
      errorMess.nextElementSibling.hidden = true;
      formValue.username = inputValue

    } else if (type.typeInput == "email" && /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(inputValue) === true) {
      errorMess.nextElementSibling.hidden = true;
      formValue.email = inputValue
    } else if (type.typeInput == 'phoneNum' && inputValue.length === 10 && /[\d]{9,11}/g.test(inputValue) === true) {
      errorMess.nextElementSibling.hidden = true;
      formValue.phoneNum = inputValue

    } else if (type.typeInput == 'password' && /(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\W_]).{8,}/g.test(inputValue) === true) {
      errorMess.nextElementSibling.hidden = true;
      formValue.password = inputValue

    } else if (type.typeInput == 'confirm-password' && formValue.password === inputValue) {
      errorMess.nextElementSibling.hidden = true;
      formValue.passwordConfirm = inputValue

    }
    d_handler = false
    d_handler = setTimeout(() => {
      d_handler = true
    }, 100)
  }
})