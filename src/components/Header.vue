<template>
  <v-layout>
    <v-toolbar app fixed dense>
      <v-toolbar-side-icon class="hidden-md-and-up">
        <v-btn flat icon @click.stop="drawer = !drawer">
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar-side-icon>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-for="item in items">
        <v-btn flat :to="item.to">{{ item.title }}</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn icon @click="notify()">
          <v-icon>star</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- navigation area -->
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list class="pa-1">
        <v-list-tile avatar to="/">
          <v-list-tile-avatar>
            <v-icon color="pink">favorite</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
          <v-list-tile-action>
            <v-icon color="pink">{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

  </v-layout>
</template>

<script>
export default {
	name: 'main-header',
  data() {
    return {
      drawer : null,
      items : [
        { title : 'HOME', icon : 'home', to : '/' },
        { title : 'POST', icon : 'web', to : '/post' },
        { title : 'PORTFOLIO', icon : 'border_color', to : '/portfolio' },
        { title : 'LOGIN', icon : 'mood', to : 'login' }

      ]
    }
  },
  methods : {
    notify : function() {
      this.$swal({
        type : 'info',
        title : 'Notification',
        text : '우측 상단에 ☆을 눌러 즐겨찾기로 추가하세요!'
      });
    }
  }
}
</script>
