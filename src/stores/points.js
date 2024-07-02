import { ref } from 'vue'
import { defineStore } from 'pinia'
import { Service } from '@/service'
const service = new Service()
export const usePointStore = defineStore('points', () => {
  const points = ref([])
  async function addPoint(point) {
    await service.addPoint(point).then((response) => {
      points.value = response.data
    }).catch((error) => console.log(error))
  }
  async function savePoint(point) {
    await service.savePoint(point).then((response) => {
      points.value = response.data
    }).catch((error) => console.log(error))
  }
  async function deletePoint(point) {
    await service.deletePoint(point).then((response) => {
      points.value = response.data
    }).catch((error) => console.log(error))
  }
  async function initPoints() {
    let _points = await service.getPoints().catch((error) => console.log(error))
    points.value = _points
  }

  return { points, addPoint, savePoint, deletePoint, initPoints }
})
