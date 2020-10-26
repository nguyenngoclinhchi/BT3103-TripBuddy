<template>
    <div class="topnav">
        <a><img src="../../public/logo_words.png" style="height:25px;width:130px;padding-bottom:5px" /></a>
        <a class="home" href="home">Home</a>
        <a class="about" href="#/about">About our app</a>
        <a class="dashboard" href="#/dashboard">Dashboard</a>
        <a class="statistics" href="#/statistics">Explore statistics</a>
        <a class="logout" href="#/login">
            <img src="../../public/logout.png" style="height:25px;width:25px;padding-bottom:5px" />
        </a>
    </div>
</template>
<script>

export default {
  name: "Navigation",
  components: {
  },
  data: function() {
    return {
    };
  }
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif !important;
}
.topnav {
  overflow: hidden;
  background-color:white;
}

.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #4CAF50;
  color: white;
}
</style>