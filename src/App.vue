<script setup>
import { RouterView } from 'vue-router'
import { onBeforeUpdate } from 'vue'
import { config } from '../config'
import { usePointStore } from './stores/points'
import { useModalStore } from './stores/modals'
const pointStore = usePointStore()

pointStore.initPoints()
</script>

<template>
  <div class="app-wrapper">
    <!-- <div class="header">
      <h1>What's The Point?</h1>
    </div> -->
    <RouterView />
  </div>
</template>

<style>
#app::-webkit-scrollbar {
  display: none;
}

.app-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.header {
  /* background-color: #75757539; */
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 2rem;
  /* position: fixed; */
  width: 100%;
}

@supports (scrollbar-width: auto) {
}
@supports selector(::-webkit-scrollbar) {
  #app {
    scrollbar-width: none;
  }
}
@supports selector(::-webkit-scrollbar) {
  main:has(input[name='fix-safari']:checked) {
    --safari-fix: ; /* This custom property forces Safari to re-render the scrollbars on hover */
  }
  *::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.473);
    border-radius: 10px;
  }
  *::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.22);
    margin: 20px 0px;
    border-radius: 10px;
    max-width: 100px;
  }
  *::-webkit-scrollbar {
    max-height: 30px;
  }
}
</style>
