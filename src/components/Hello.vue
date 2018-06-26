<template>
<div>
  <div class="hello" v-if="user != null">
    <h1>Welcome {{ user.displayName }}</h1>
  </div>
  <div class="search">
    <div class="searchdiv">
      <b-form>
        <div>
          <b-form-input type="text" class="searchinput" placeholder="Medicamento, Principio Ativo, Indicação..." v-model="searchstr" @keyup.enter.native="search"/>
        </div>
        <div class="searchbutton">
          <b-button  variant="success"  v-on:click="search">Pesquisar</b-button>
        </div>
      </b-form>
    </div>
  </div>
  <div class="stores">
    <div class="" style="width:300px">
    <a href="https://itunes.apple.com/pt/app/easyped/id1158594702?mt=8" style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/assets/shared/badges/en-us/appstore-lrg.svg) no-repeat;width:135px;height:40px;background-size:contain;"></a>
  </div>
  <div class="" style="width:300px">
    <a href='https://play.google.com/store/apps/details?id=com.easymedicine.easymedicine&hl=en&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' >
        <img alt='Get it on Google Play' style="height:60px;" src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/>
      </a>
  </div>
    
    </div>
</div>  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'hello',
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  data () {
    return {
      searchstr: ''
    }
  },
  methods: {
    search: function (event) {
      if (this.searchstr) {
        this.$router.push({ name: 'Search', query: { searchstr: this.searchstr } })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

.search {
  display: flex;
  justify-content: center;
  align-items: center;
}

.searchdiv {
  width: 70%;
  padding: 20px;
  resize: both;
  overflow: auto;
}

.searchbutton{
  align-items: center;
  padding-top: 5px;
}

img {
    max-width: 100%;
    height: auto;
}

</style>
