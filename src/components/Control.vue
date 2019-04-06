<template>
  <div class="row">
    {{ weapon }}
    <div class="col">{{ weapon.name }}</div>
    <div class="col">
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="'width:' + weapon.level + '%'"
        ></div>
      </div>
    </div>
    <div class="col">
      <button @click="fire" type="button">FIRE</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Control",
  props: {
    weapon: Object
  },
  methods: {
    fire: function() {
      console.log("fire");
      this.weapon -= 1;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
