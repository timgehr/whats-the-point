<script setup>
import PointTable from '@/components/PointTable.vue'
import AddModal from '@/components/AddModal.vue'
</script>

<template>
  <div class="home">
    <AddModal></AddModal>
    <PointTable></PointTable>
  </div>
</template>

<style>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 100px);
  flex-grow: 1;
  padding: 50px;
  width: 100%;
}

@media screen and (max-width: 900px) {
  .home {
    padding: 20px;
  }
  .table {
    width: 100%;
  }
  .row {
    font-size: 1.5rem;
    min-height: 30px;
    height: 50px;
    border: 3px solid #0a0807;
    width: 100%;
  }
  .cell:nth-of-type(1),
  .cell:nth-of-type(2) {
    border-right: 3px solid #0a0807;
  }

  .nearest-furthest-points {
    padding: 20px;
    height: 200px;
    border-radius: 20px 20px 0px 0px;
    gap: 10px;
    flex-direction: column;
    height: 400px;
  }
  .nearest-furthest-table {
    gap: 0px;
    width: 100%;
  }
  .nearest-furthest-points .row-scroll::-webkit-scrollbar {
    width: 10px;
  }
  .nearest-furthest-points .row-scroll {
    margin: 0px;
    width: 100%;
    height: 120px;
  }
  .labels {
    font-size: 2rem;
  }
  .add {
    height: 50px;
    width: 50px;
    font-size: 1.5rem !important;
    border: 3px solid #0a0807;
  }
}
</style>
