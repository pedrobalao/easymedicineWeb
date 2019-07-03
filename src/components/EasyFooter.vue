<!-- Footer -->
<template>
<footer class="page-footer font-small pt-4 mt-4" style="background: #f6f9fc">

    <!-- Footer Links -->
    <div class="container-fluid text-center text-md-left">

      <!-- Grid row -->
      <div class="row">

        <!-- Grid column -->
        <div class="col-md-6 mt-md-0 mt-3">

          <!-- Content -->
          <h5 class="text-uppercase">Importante</h5>
          <p>A informação presente no easyPed pode conter erros. Não nos responsabilizamos por consequências do uso da mesma. Toda a informação deve ser validada pelo médico.</p>

        </div>
        <!-- Grid column -->

        <hr class="clearfix w-100 d-md-none pb-3">

        <!-- Grid column -->
        <div class="col-md-3 mb-md-0 mb-3">

            <!-- Links -->
            <h5 class="text-uppercase">Apps</h5>

            <ul class="list-unstyled">
              <li>
                <a href="https://itunes.apple.com/pt/app/easyped/id1158594702?mt=8">iOS</a>
              </li>
              <li>
                <a href="https://play.google.com/store/apps/details?id=com.easymedicine.easymedicine&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">Android</a>
              </li>
            </ul>

          </div>
          <!-- Grid column -->

          <!-- Grid column -->
          <div class="col-md-3 mb-md-0 mb-3">

            <!-- Links -->
            <h5 class="text-uppercase"><a href="http://facebook.com/easyped/">Facebook</a></h5>
            <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Ffacebook.com%2Feasyped&width=147&layout=button_count&action=like&size=large&show_faces=true&share=true&height=46&appId" width="147" height="46" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>

            
          </div>
          <!-- Grid column -->

      </div>
      <!-- Grid row -->

    </div>
    <!-- Footer Links -->

    <!-- Copyright -->
    <div class="footer-copyright text-center py-3">
      Made with <span style="color: #e25555;">&hearts;</span> in Porto | © {{ new Date().getFullYear() }} easyPed
    </div>
    <!-- Copyright -->

  </footer>
  <!-- Footer -->
</template>

<script>
export default {
  name: 'fixfooter',
  data () {
    return {
      dummy: ''
    }
  }
}
</script>

<style>
.footer {
  background: #f6f9fc
}
</style>

