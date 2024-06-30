import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modals', () => {
  const modals = ref({ add: false, edit: false })
  const point = ref({ name: '', x: 0, y: 0 })
  function toggleModal(modal, newPoint = { name: '', x: 0, y: 0 }) {
    modals.value[modal] = !modals.value[modal]
    if (newPoint) point.value = newPoint
  }

  return { modals, point, toggleModal }
})
