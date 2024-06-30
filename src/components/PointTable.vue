<script setup>
import { ref } from 'vue'
import { usePointStore } from '../stores/points'
import { useModalStore } from '../stores/modals'

const pointStore = usePointStore()
const modalStore = useModalStore()
const toggleModal = modalStore.toggleModal
const points = ref(pointStore.points)
</script>

<template>
  <div class="table">
    <div class="labels">
      <div class="label">Name</div>
      <div class="label">X</div>
      <div class="label">Y</div>
    </div>
    <div class="row-scroll">
      <div
        v-for="point in points"
        v-bind:key="point.name"
        class="row"
        @click="toggleModal('edit', point)"
      >
        <div class="cell">
          {{ point.name }}
        </div>
        <div class="cell">
          {{ point.x }}
        </div>
        <div class="cell">
          {{ point.y }}
        </div>
      </div>
    </div>
    <button class="add" @click="toggleModal('add', { name: '', x: 0, y: 0 })">
      <span class="material-symbols-outlined"> add </span>
      <div class="cell">Name</div>
      <div class="cell">X</div>
      <div class="cell">Y</div>
    </button>
  </div>
</template>

<style>
.row-scroll {
  overflow-y: auto;
  max-height: calc(100vh - 376px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-right: 10px;
  padding-left: 10px;
  width: calc(100% + 17px);
  max-width: 1017px;
  margin-left: 17px;
  box-sizing: border-box;
  scrollbar-gutter: stable;
}
.table {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.row {
  width: 100%;
  max-width: 1000px;
  background-color: #e8d8ce4c;
  height: 80px;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  border-radius: 40px;
  border: 4px solid #0a0807;
  cursor: pointer;
  transition: background-color 0.5s, box-shadow 0.5s;
  /* box-shadow: 0px 0px 10px -2px #00000019; */
}
.row:hover {
  background-color: #e8d8ce93;
}
.cell {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cell:nth-of-type(1),
.cell:nth-of-type(2) {
  border-right: 4px solid #0a0807;
}

.labels {
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  font-size: 3rem;
  padding-right: 10px;
  padding-left: 10px;
  margin: auto;
}
.label {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #e8d8ce;
}
.add {
  width: 80px;
  max-width: 1000px;
  background-color: #e8d8ce4c;
  height: 80px;
  font-size: 3rem !important;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  border: 4px solid #0a0807;
  /* box-shadow: 0px 0px 10px -2px #e8d8ce19; */
  cursor: pointer;
  transition: background-color 0.5s;
  margin: auto;
}
.add:hover {
  background-color: #e8d8ce93;
}

.add .cell {
  display: none;
  font-size: 3rem;
  height: 72px;
  color: #00000091;
}
</style>
