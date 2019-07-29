<template>
  <v-container id="admin">
    <v-layout row wrap>
      <v-flex xs12 mt-5>
        <h2
            class="mt-3 py-5 text-xs-center text-shadow homepage-title"
            style="color:#181818;font-size:4.3vw;"
            >관리자 페이지</h2>
      </v-flex>
      <v-flex xs12>
        <AdminCount></AdminCount>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
        <v-flex xs12>
          <h2
            class="mt-3 py-5 text-xs-center text-shadow homepage-title"
            style="color:#181818;font-size:4.3vw;"
            >사용자 권한 관리</h2>
        <!-- <h3 class="headline mb-2" style="width:100%;text-align:center;">사용자 권한 관리</h3> -->
        </v-flex>
        <v-flex xs12 my-3>
            <AdminTable></AdminTable>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import AdminCount from "../components/admin/AdminCount";
import AdminTable from "../components/admin/AdminTable";

export default {
	name: 'Admin',
	components: {
        AdminCount,
        AdminTable,
	},
	methods: {

	},
	mounted() {
	}
}
</script>
<style>
.card-title{
    font-size: 1.3rem !important;
    width:100%;
    text-align:center;
    letter-spacing: normal !important;
}
.result-num{
    font-size: 4.3rem !important;
    text-align:center;
    margin-bottom: 10px;
}
#admin .v-card__title{
    padding-bottom: 0;
}
</style>