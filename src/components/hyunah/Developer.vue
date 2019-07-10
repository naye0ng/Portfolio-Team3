<template>
  <div>
    <v-hover>
      <v-avatar @click="showModal" size=12vw slot-scope="{ hover }" color="rgb(255,255,255,0.3)">
        <v-img :aspect-ratio="16/9" :src="image">
          <div v-if="hover" class="display-3 dev-frame">
            <span class="dev-content">{{status}}</span>
          </div>
        </v-img>
      </v-avatar>
    </v-hover>

    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-img :src="image" min-height="200px" max-height="300px"></v-img>
          <v-card-title primary-title>
              <div class="headline">{{name}}</div>
              <span class="grey--text">{{status}}</span>
          </v-card-title>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
export default {
  name : 'Developer',
  props : {
    status : {type: String},
    name : {type: String},
    image : {type: String}
  },
  data() {
    return {
      hover: false,
      dialog: false
    }
  },
  methods : {
    showModal() {
      this.dialog = true;
    }
  }
}
</script>

<style>

.dev-content {
  font-size:9vw;
}

.dev-frame {
  height: 100%;
  background-color: rgb(255, 255, 255, 0.3);
}

</style>
