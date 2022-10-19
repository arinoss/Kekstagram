const SEND_URL = 'https://22.javascript.pages.academy/kekstagram';
const GET_URL = 'https://22.javascript.pages.academy/kekstagram/data'

const sendRequest = (url, form) =>{
  const heders = {
 'Content-type': 'multipart/form'
  }
return fetch(url, {
  method: 'POST',
  body: new FormData(form),
  heders: heders
})
.then(response =>{
  if(response.ok){
    return response.json();
  }
  else {
 return Promise.reject();
  }

})

}
const getRequest = (url) =>{
  return fetch(url).then(response =>{
    if(response.ok){
      return response.json();
    }
    else {
   return Promise.reject();
    }})
}


export{sendRequest, getRequest, SEND_URL, GET_URL};
