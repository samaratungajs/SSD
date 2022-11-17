import Swal from 'sweetalert2'

export function success(message){
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 2000
      })
}

export function unsuccess(message){
  Swal.fire({
    icon: 'error',
    title: 'Error',
    timer: 2000,
    showCloseButton: true,
    text: message,
  })
}
