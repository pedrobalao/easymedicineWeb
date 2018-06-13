<template>
    <div class="container" style="margin-top: 50px">
        <div class="row">
            <div class="offset-md-5 col-sm-2 text-center">
                <div class="loader" />
            </div>
        </div>
    </div>  
</template>

<script>

export default {
  name: 'loading'
}
</script>

<style scope="">
.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
