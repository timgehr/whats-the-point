<template>
  <div class="nearest-furthest-points">
    <div class="nearest-furthest-table">
      {{
        nearestPoints?.points.legnth > 0
          ? 'Nearest point' + nearestPoints?.points.length > 1
            ? 's'
            : '' + ' at distance' + nearestPoints?.distance
          : 'No other points exist'
      }}
      <div class="table">
        <div class="labels">
          <div class="label">Name</div>
          <div class="label">X</div>
          <div class="label">Y</div>
        </div>
        <div class="row-scroll">
          <div v-for="point in nearestPoints?.points" v-bind:key="point.name" class="row">
            <div class="cell">
              {{ point.point.name }}
            </div>
            <div class="cell">
              {{ point.point.x }}
            </div>
            <div class="cell">
              {{ point.point.y }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nearest-furthest-table">
      {{
        furthestPoints?.points.legnth > 0
          ? 'Nearest point' + furthestPoints?.points.length > 1
            ? 's'
            : '' + ' at distance' + furthestPoints?.distance
          : 'No other points exist'
      }}
      <div class="table">
        <div class="labels">
          <div class="label">Name</div>
          <div class="label">X</div>
          <div class="label">Y</div>
        </div>
        <div class="row-scroll">
          <div v-for="point in furthestPoints?.points" v-bind:key="point.name" class="row">
            <div class="cell">
              {{ point.point.name }}
            </div>
            <div class="cell">
              {{ point.point.x }}
            </div>
            <div class="cell">
              {{ point.point.y }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { usePointStore } from '@/stores/points'
const props = defineProps({
  point: Object
})

const store = usePointStore()
const points = ref(store.points)
const newPoint = ref(props.point)
const nearestPoints = ref(null)
const furthestPoints = ref(null)

const calculateNearestPoint = () => {
  let _nearestPoints = []
  let minDistance = Infinity
  for (const point of store.points) {
    const distance = calculateEuclideanDistance(point, newPoint.value)
    if (distance < minDistance && point.id !== newPoint.value.id) {
      minDistance = distance
      _nearestPoints = []
      _nearestPoints.push({ point, distance: minDistance })
    } else if (distance === minDistance) {
      _nearestPoints.push({ point, distance: minDistance })
    }
  }
  nearestPoints.value = {
    points: [..._nearestPoints],
    distance: +(Math.round(parseFloat(minDistance) + 'e+1') + 'e-1')
  }
}

const calculateFurthestPoint = () => {
  let _furthestPoints = []
  let maxDistance = -1

  for (const point of store.points) {
    const distance = calculateEuclideanDistance(point, newPoint.value)
    if (distance > maxDistance && point.id !== newPoint.value.id) {
      maxDistance = distance
      _furthestPoints = []
      _furthestPoints.push({ point, distance: maxDistance })
    } else if (distance === maxDistance) {
      _furthestPoints.push({ point, distance: maxDistance })
    }
  }
  furthestPoints.value = {
    points: [..._furthestPoints],
    distance: +(Math.round(maxDistance + 'e+1') + 'e-1')
  }
}

const calculateEuclideanDistance = (point1, point2) => {
  const dx = point2.x - point1.x
  const dy = point2.y - point1.y
  return Math.sqrt(dx * dx + dy * dy)
}

watch(
  () => props.point,
  () => {
    newPoint.value = props.point
    calculateNearestPoint()
    calculateFurthestPoint()
  },
  { deep: true }
)

onMounted(() => {
  newPoint.value = props.point
  calculateNearestPoint()
  calculateFurthestPoint()
})
</script>

<style>
.nearest-furthest-table {
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-weight: bold;
  font-size: 1.2rem;
}
.nearest-furthest-points {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  position: fixed;
  bottom: 0;
  background-color: #4f4239;
  box-shadow: 0px 0px 20px -5px #0a0807;
  width: 90%;
  height: 300px;
  padding: 50px;
  border-radius: 40px 40px 0px 0px;
  z-index: 9998;
  border: 2px solid #0b0806;
}

.nearest-furthest-points .table {
  font-size: 1rem;
  gap: 5px;
  scrollbar-gutter: stable;
  width: calc(100% + 17px);
}
.nearest-furthest-points .labels {
  font-size: 1.2rem;
}
.nearest-furthest-points .row {
  height: 30px;
  min-height: 30px;
  border: solid 2px #0a0807;
}
.nearest-furthest-points .cell {
  border-width: 2px;
  font-size: 1rem;
}

.nearest-furthest-points .row-scroll {
  max-height: 200px;
  overflow-y: auto;
  width: 100%;
  gap: 5px;
}
</style>
