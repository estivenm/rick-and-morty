const createLocalStorage = (key, data) => localStorage.setItem(key, data)
const getLocalStorage = (item) => JSON.parse(localStorage.getItem(item))

// Notificar otros tabs sobre el cambio en el local storage
const notificationToTab = (nameEvent, data) => {
  window.dispatchEvent(new StorageEvent(nameEvent, data))
}

function useLocalStorage() {
  const synchronizeLocalStorage = ({ keyStorage, typeEvent }, callBack) => {
    // escuchar evento storage para actualizar la información en caso de cambios en otras pestañas
    window.addEventListener(typeEvent, (event) => callBack(event, keyStorage))
    // Remover el event listener cuando el componente se desmonte
    return () =>
      window.removeEventListener(typeEvent, (evn) => callBack(evn, keyStorage))
  }

  return { synchronizeLocalStorage }
}

export { createLocalStorage, getLocalStorage, useLocalStorage }
