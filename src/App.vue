<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col">
        <Control weapon="weapon" v-for="weapon in weapons" :key="weapon.name" />
      </div>
      <div class="col">
        <div class="row">
          <div class="col">radar</div>
        </div>
        <div class="row" v-for="graph in graphs">
          <div class="col">
            {{ graph }}
          </div>
        </div>
      </div>
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
      weapons: []
    };
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
</style>
