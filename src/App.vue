<template>
  <div id="app" class="control-panel container">
    <div class="row">
      <div class="col">
        <h1 class="mt-2 pb-2 mb-2 border-bottom">Weapons Control Panel</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Control
          :weapon="weapon"
          v-for="weapon in weapons"
          :key="weapon.name"
          :disabled="!panel_on"
          :recharge="rechargeControl"
        />
        <div class="row mb-2">
          <div class="col">
            <h2>Main Battery</h2>
          </div>
        </div>
        <div class="row mb-2">
          <div class="col">
            <div class="btn-group" role="group" aria-label="Panel On/Off">
              <button
                type="button"
                @click="on"
                class="btn btn-success"
                :disabled="charging"
                :class="{ active: panel_on, faded: !panel_on }"
              >On</button>
              <button
                type="button"
                @click="off"
                class="btn btn-danger"
                :class="{ active: !panel_on, faded: panel_on }"
              >Off</button>
            </div>
          </div>
          <div class="col">
            <button
              type="button"
              @click="recharge"
              class="btn btn-warning"
              :disabled="!panel_on"
            >Charge</button>
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
                :style="power_level_style"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style>
html,
body {
  background-color: #111;
  color: #EEE;
}

.control-panel {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.faded {
  opacity: 0.5;
}
</style>


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

    this.power_level = this.max_power;
  },
  data: function() {
    return {
      weapons: [],
      panel_on: false,
      power_level: 0,
      charging: false,
      warning_level: 25
    };
  },
  computed: {
    max_power: function() {
      return this.weapons.length * 100;
    },
    power_level_style: function() {
      return "width:" + (this.power_level / this.max_power) * 100 + "%";
    }
  },
  methods: {
    on: function() {
      this.panel_on = true;
    },
    off: function() {
      this.panel_on = false;
    },
    recharge: function() {
      var self = this;
      this.charging = true;
      // turn panel off
      this.panel_on = false;
      // recharge batteries
      var interval = setInterval(function() {
        // if we are charged we can exit
        if (self.power_level >= this.max_power) {
          clearInterval(interval);
          // turn panel on
          self.charging = false;
          self.panel_on = true;
          return;
        }
        // if we are not charged yet, increase charge
        self.power_level++;
      }, 50);
    },
    rechargeControl: function(deficit) {
      // take deficit from power level,
      // making sure we don't go below 0
      if (this.power_level >= deficit) {
        this.power_level -= deficit;
        return deficit;
      }

      // if we can't return it all, return what we can
      var all_that_we_have = this.power_level;
      this.power_level = 0;
      return all_that_we_have;
    }
  }
};
</script>
