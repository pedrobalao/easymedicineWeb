<template>
<div class="hellocarousel">
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="slide-1"></swiper-slide>
        <swiper-slide class="slide-2"></swiper-slide>
        <swiper-slide class="slide-3"></swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
        <!--<div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>-->
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
    }
  }
</script>

<style lang="scss" scoped>
  .swiper-box {
    width: 100%;
    height: 500px;
    margin: 0 auto;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;

    &.slide-1 {
      background-image:url('https://images.unsplash.com/photo-1519781542704-957ff19eff00?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c351475860e8248dcd543ebbba1aa24f&auto=format&fit=crop&w=846&q=80')
    }

    &.slide-2 {
      background-image:url('https://images.unsplash.com/photo-1522308300961-fdb949cac8aa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=850933625affc754732eff3b7faef33a&auto=format&fit=crop&w=750&q=80')
    }

    &.slide-3 {
      background-image:url('https://images.unsplash.com/photo-1455849318743-b2233052fcff?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9da561905a3da8a8eb52a58208b4bfc0&auto=format&fit=crop&w=750&q=80')
    }
  }
</style>