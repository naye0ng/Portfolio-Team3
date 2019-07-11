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
          <v-layout row>
            <v-flex xs4>
              <v-img :src="image" height="300px" width="auto"></v-img>
            </v-flex>
            <v-layout column>
              <v-card-title primary-title>
                <div class="headline">{{name}}</div>
              </v-card-title>
              <v-card-text>
                {{intro}}
              </v-card-text>
            </v-layout>
          </v-layout>
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
    image : {type: String},
    intro : {type: String},
    repo : {type: String}
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
