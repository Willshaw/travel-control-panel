<template>
  <div class="row mb-2 pb-2 border-bottom">
    <div class="col-sm weapon-name">{{ weapon.name }}</div>
    <div class="col-sm">
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
      <button class="btn btn-danger" :disabled="disabled" @click="fire(1)" type="button">FIRE</button>
    </div>
    <div class="col">
      <button class="btn btn-danger" :disabled="disabled" @click="fire(10)" type="button">SUPER</button>
    </div>
    <div class="col">
      <button
        class="btn btn-warning"
        :disabled="disabled"
        @click="rechargePower"
        type="button"
      >Charge</button>
    </div>
  </div>
</template>

<style scoped>
.weapon-name {
  text-transform: capitalize;
}

@media (max-width: 575px) {
  .progress {
    margin-bottom: 1em;
  }
}

@media (min-width: 576px) {
  .progress {
    height: 100%;
  }
}
</style>

<script>
export default {
  name: "Control",
  props: {
    weapon: Object,
    disabled: Boolean,
    recharge: Function
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
      this.weapon.level = Math.max(0, this.weapon.level - power);
    },
    rechargePower: function() {
      // if we need power, ask for it from parent
      var deficit = 100 - this.weapon.level;
      if (deficit) {
        this.weapon.level += this.recharge(deficit);
      }
    }
  }
};
</script>
