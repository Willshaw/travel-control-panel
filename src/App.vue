<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col">
        <Control
          :weapon="weapon"
          v-for="weapon in weapons"
          :key="weapon.name"
          :disabled="!panel_on"
        />
        <div class="row mb-2">
          <div class="col">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                @click="on"
                class="btn btn-success"
                :class="{ active: panel_on, faded: !panel_on }"
              >
                On
              </button>
              <button
                type="button"
                @click="off"
                class="btn btn-danger"
                :class="{ active: !panel_on, faded: panel_on }"
              >
                Off
              </button>
            </div>
          </div>
          <div class="col">
            <button
              type="button"
              @click="recharge"
              class="btn btn-warning"
              :disabled="!panel_on"
            >
              Recharge
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="progress">
              <div
                class="progress-bar bg-success"
                :class="{ 'bg-danger': power_level <= warning_level }"
                role="progressbar"
                aria-valuenow="0"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="'width:' + power_level + '%'"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="col">
        <div class="row">
          <div class="col">radar</div>
        </div>
        <div class="row" v-for="graph in graphs">
          <div class="col">
            {{ graph }}
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import Control from "./components/Control";

export default {
  name: "App",
  components: {
    Control
  },
  created: function() {
    var self = this;
    ["laser", "canon", "fire ball"].forEach(function(name) {
      self.weapons.push({
        name: name,
        level: 100
      });
    });
  },
  data: function() {
    return {
      graphs: ["red", "blue"],
      weapons: [],
      panel_on: false,
      power_level: 0,
      charging: false,
      warning_level: 25
    };
  },
  methods: {
    on: function() {
      this.panel_on = true;
    },
    off: function() {
      this.panel_on = false;
    },
    recharge: function() {
      // turn panel off
      this.panel_on = false;
      // recharge batteries
      this.power_level = 100;
      // turn panel on
      this.panel_on = true;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.faded {
  opacity: 0.5;
}
</style>
