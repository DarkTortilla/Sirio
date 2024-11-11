export default function getCookie(nombre) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === nombre) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

function setCookie(nombre, valor, dias) {
  let expires = '';
  if (dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime()+(dias*24*60*60*1000));
    expires = "; expires="+fecha.toUTCString();

  }
  document.cookie= nombre +"="+ encodeURIComponent(valor) + expires + "; path=/";
}


function removeAll() {
  const cookies = document.cookie.split(";");

  cookies.forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
  
}

export {setCookie, removeAll}
