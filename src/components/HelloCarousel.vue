<template>
<div class="hellocarousel">
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="slide-1">
          <b-container fluid class="p-4">
            <b-row>
                <b-col><span class="carousseltitle">
                    A FERRAMENTA QUE O TORNA
                    <br/>
                    MAIS PRODUTIVO
              </span></b-col>
                <b-col><b-img :src="paracetamolimg" fluid right alt="image" /></b-col>
            </b-row>
          </b-container>
        </swiper-slide>
        <swiper-slide class="slide-2">
          <b-container fluid class="p-4">
            <b-row>
                <b-col>
            <span class="carousseltitle">
                  MAIS DE 1200 UTILIZADORES MENSAIS
                  <br/>
                  USAM EASYPED
                </span> </b-col>
                <b-col><b-img :src="indicemassacorporal" fluid right alt="image" /></b-col>
            </b-row>
          </b-container>
        </swiper-slide>
        <swiper-slide class="slide-3">
          <b-container fluid class="p-4">
            <b-row>
                <b-col>
            <span class="carousseltitle">
                  DISPONÍVEL PARA <b-link class="text-success" href="https://itunes.apple.com/pt/app/easyped/id1158594702?mt=8">IOS</b-link> E <b-link class="text-success" href="https://play.google.com/store/apps/details?id=com.easymedicine.easymedicine&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">ANDROID</b-link>  
                </span></b-col>
                <b-col><b-img :src="calculardosesimg" fluid right alt="image" /></b-col>
            </b-row>
          </b-container>
        </swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      </swiper>
</div>
</template>

<script>
  export default {
    name: 'hellocarousel',
    data () {
      return {
        swiperOption: {
          slidesPerView: 1,
          spaceBetween: 30,
          effect: 'fade',
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        }
      }
    },
    computed: {
      paracetamolimg () {
        return require('../assets/ParacetamolDetail_s.png')
      },
      calculardosesimg () {
        return require('../assets/CalcularDoses_s.png')
      },
      indicemassacorporal () {
        return require('../assets/IndiceMassaCorporal_s.png')
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import url('https://fonts.googleapis.com/css?family=Roboto');


  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    font-size: 18px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 40px 60px;
    background-color: transparent!important;
    justify-content: space-around!important;

    &.slide-1 {
      background: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url("https://images.unsplash.com/photo-1519781542704-957ff19eff00?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c351475860e8248dcd543ebbba1aa24f&auto=format&fit=crop&w=846&q=80");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      
      
    }

    &.slide-2 {
      background: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url("https://images.unsplash.com/photo-1522308300961-fdb949cac8aa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=850933625affc754732eff3b7faef33a&auto=format&fit=crop&w=750&q=80");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;

    }

    &.slide-3 {
      background: linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url("https://images.unsplash.com/photo-1517271023557-20d13b255594?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=54529f44821f5f5ef411bd156c0732da&auto=format&fit=crop&w=750&q=80");
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;

    }
  }

  

  .carousseltitle {
      font-size: 4vw;
      font-family: 'Open Sans', sans-serif;
      position: absolute;
      color: #fff;
  }
  

</style>