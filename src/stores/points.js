import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePointStore = defineStore('points', () => {
  const points = ref([
    { id: 1, x: 0, y: 0, name: 'origin' },
    { id: 2, x: 1, y: -1, name: 'test' },
    { id: 3, x: 0, y: 0, name: 'origin1' },
    { id: 4, x: 1, y: -1, name: 'test2' },
    { id: 5, x: 0, y: 0, name: 'origin' },
    { id: 6, x: 1, y: -1, name: 'test' },
    { id: 7, x: 0, y: 0, name: 'origin' },
    { id: 8, x: 1, y: -1, name: 'test' },
    { id: 9, x: 0, y: 0, name: 'origin' },
    { id: 10, x: 1, y: -1, name: 'test' },
    { id: 11, x: 0, y: 0, name: 'origin' },
    { id: 12, x: 1, y: -1, name: 'test' }
  ])
  function addPoint(point) {
    points.value.push({ x: point.x, y: point.y, name: point.name })
  }
  function savePoint(point) {
    for (let _point of points.value) {
      if (_point.id === point.id) {
        _point.x = point.x
        _point.y = point.y
        _point.name = point.name
      }
    }
  }
  function deletePoint(point) {
    points.value = points.value.filter((_point) => _point.id !== point.id)
  }

  return { points, addPoint, savePoint, deletePoint }
})
