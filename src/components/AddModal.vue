<template>
  <div :class="showModal ? '' : 'hide'" class="modal">
    <!-- Modal content -->
    <div class="modal-wrapper">
      <div class="modal-content">
        <span
          v-show="modalType === 'edit'"
          class="material-symbols-outlined trash"
          @click="deletePoint"
        >
          delete
        </span>
        <h1>{{ modalType === 'add' ? 'Add New' : 'Edit' }} Point</h1>
        <!-- Form to add name, x, and y coordinates -->
        <form @submit.prevent="addSavePoint">
          <div class="flex center gap">
            <label for="name">Name:</label>
            <input
              type="text"
              id="name"
              :class="pointStore.points?.find((p) => p.name === point.name) ? 'red' : ''"
              v-model="point.name"
              required
            />
          </div>
          <div class="flex center gap">
            <label for="x">X Coordinate:</label>
            <input
              :class="point.x % 1 != 0 ? 'red' : ''"
              type="number"
              id="x"
              v-model="point.x"
              required
            />
          </div>
          <div class="flex center gap">
            <label for="y">Y Coordinate:</label>
            <input type="number" id="y" v-model="point.y" required />
          </div>

          <div class="form-buttons">
            <button class="form-button" type="button" @click="toggleModal(modalType)">
              Cancel
            </button>
            <button class="form-button" type="submit">
              {{ modalType === 'add' ? 'Add' : 'Save' }} Point
            </button>
          </div>
        </form>
      </div>
    </div>
    <ClosestPoints :point="point" />
    <div class="modal-overlay"></div>
  </div>
</template>

<script setup>
import ClosestPoints from './ClosestPoints.vue'
import { ref, watch } from 'vue'
import { useModalStore } from '../stores/modals'
import { usePointStore } from '../stores/points'
const modalStore = useModalStore()
const pointStore = usePointStore()

const point = ref({ name: '', x: 0, y: 0 })

const toggleModal = modalStore.toggleModal
const points = ref(pointStore.points || [])
const showModal = ref(false)
const modalType = ref(null)

modalStore.$subscribe((value, state) => {
  modalType.value = value.events.target.add ? 'add' : value.events.target.edit ? 'edit' : ''
  showModal.value = value.events.target.add || value.events.target.edit
  let _point = { ...state.point }
  point.value = structuredClone(_point)
})

const addSavePoint = () => {
  if (pointStore.points?.find((p) => p.name === point.value.name)) {
    alert('That point name already exists, please use a different name')
    return
  }
  modalType.value === 'add' ? pointStore.addPoint(point.value) : pointStore.savePoint(point.value)
  modalStore.toggleModal(modalType.value)
}
const deletePoint = () => {
  pointStore.deletePoint(point.value)
  modalStore.toggleModal(modalType.value)
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-wrapper {
  position: absolute;
  z-index: 9999;
  height: calc(100vh - 300px);
  min-height: 270px;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
}

.trash {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

.modal-content {
  position: relative;
  background-color: #4f4239;
  padding: 20px;
  z-index: 9999;
  border-radius: 10px;
  box-shadow: 0px 5px 12px -3px #0b0806;
  max-width: 500px;
  width: 90%;
  border: 2px solid #0b0806;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.modal-content h1 {
  width: 100%;
  text-align: center;
  /* margin-bottom: 20px; */
}
.modal-content label {
  font-weight: bold;
}
.modal-content input {
  flex-grow: 1;
  padding: 5px;
  border-radius: 3px;
  border: 0px;
  margin-top: 5px;
  background-color: #f3d6c330;
}
.modal-content input:focus {
  outline: none;
  border: none;
}

/* Additional styling for the form and button */
form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  text-wrap: nowrap;
}

input {
  font: inherit;
  margin-bottom: 10px;
  min-width: 0px;
}

.form-buttons {
  display: flex;
  justify-content: space-between;
}

.form-button {
  font: inherit;
  margin-top: 10px;
  background-color: #f3d6c330;
  border: 2px solid #0b0806;
  border-radius: 15px;
  height: 30px;
  width: fit-content;
  padding: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.form-button:hover {
  background-color: #0b0806;
  color: #fff;
}
</style>