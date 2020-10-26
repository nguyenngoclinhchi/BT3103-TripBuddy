<template>
  <div class="mainPage">
    <navBar></navBar>
    <h1 class="title">Welcome to your dashboard!</h1>
    <section class="container">
        <div class="left-half">
            <article>
            <h1>Left side (insert components)</h1>
            </article>
        </div>
        <div class="right-half">
            <article>
            <h1>Right side (insert components)</h1>
            </article>
        </div>
    </section>
</div>

</template>
<script>

export default {
  name: "MainPage",
  components: {

  },
  data: function() {
    return {
      name: 'Person',
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
.container {
  display: grid;
  height: 500px;
}
article {
  position: relative;
  top: 50%;
  text-align: center;
  transform: translate(0, -50%);
  padding: 1rem;
}
.left-half {
  background: #94806a;
  grid-column: 1;
}
.right-half {
  background: #857c72;
  grid-column: 2;
}
.title {
  height: 50px;
  text-align:left;
  padding: 15px;
}
</style>