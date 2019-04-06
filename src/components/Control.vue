<template>
  <div class="row mb-4">
    <div class="col">{{ weapon.name }}</div>
    <div class="col">
      <div class="progress">
        <div
          class="progress-bar"
          :class="{ 'bg-danger': weapon.level <= warning_level }"
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="'width:' + weapon.level + '%'"
        ></div>
      </div>
    </div>
    <div class="col">
      <button :disabled="disabled" @click="fire(1)" type="button">FIRE</button>
      <button :disabled="disabled" @click="fire(10)" type="button">
        SUPER
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Control",
  props: {
    weapon: Object,
    disabled: Boolean
  },
  data: function() {
    return {
      warning_level: 25
    };
  },
  methods: {
    fire: function(power) {
      if (typeof power === "undefined") {
        power = 1;
      }
      this.weapon.level -= power;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
