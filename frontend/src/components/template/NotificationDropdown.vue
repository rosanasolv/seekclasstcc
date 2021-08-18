<template>
    <div class="user-dropdown1">
      <div class="user-dropdown-img1">
        <div style="font-size: 25px">
          <router-link to="/notificacoes">
            <i class="fa fa-bell" aria-hidden="false">
              <b-badge class="badge" variant="light">{{notification}}</b-badge>
            </i></router-link>
        </div>
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from "axios";
import { baseApiUrl /*showError*/ } from "@/global";
export default {
	name: 'NotificationDropdown',
  data: function () {
    return {
      numero: null,
    }
  },
  computed: mapState(['notification']),
  methods: {
    loadNotificacoes() {
      const url = `${baseApiUrl}/notificacoes`;
      axios.get(url).then((res) => {
        res.data.sort((a, b) => {
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;
          return 0;
        });
        //this.$store.commit("setNotification", res.data.length);
        

      });
    },
  },
  
  mounted() {
    this.loadNotificacoes();
  },
}
</script>

<style scoped>
.user-dropdown1 {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}
.user-dropdown1:hover {
  background-color: rgb(11, 78, 11);
}
.user-dropdown-img1 {
  margin: 0px 10px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-dropdown-img1 > i {
  justify-content: center;
}
.badge{
  font-size: 12px;
  width: 18px;
  height: 3%;
}
</style>