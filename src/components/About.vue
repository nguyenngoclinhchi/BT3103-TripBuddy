<template>
    <div id = "mainContent">
        <div id="aboutCOVID">   
        <h5><br><br><br><br><br>What is COVID-19?</h5>
        <p><br>
            <sub>Coronavirus disease (COVID-19) is an infectious disease caused by a newly 
            discovered coronavirus. Coronaviruses are a large family of viruses that can cause 
            illness in animals or humans. In humans there are several known coronaviruses that 
            cause respiratory infections. COVID-19 was identified in Wuhan, China in December 2019. 
            COVID-19 is caused by the virus severe acute respiratory syndrome coronavirus 2 
            (SARS-CoV-2), a new virus in humans causing respiratory illness which can be spread 
            from person-to-person. Early in the outbreak, many patients were reported to have a 
            link to a large seafood and live animal market, however, later cases with no link to 
            the market confirmed person-to-person transmission of the disease. Most people infected 
            with the COVID-19 virus will experience mild to moderate respiratory illness and recover 
            without requiring special treatment.  Older people, and those with underlying medical 
            problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer 
            are more likely to develop serious illness.</sub>
        </p>
    </div>
    <header id="aboutApp">
        <h5><br><br><br>About tripBuddy</h5>
        <p><br>
            <sub>With the COVID-19 pandemic impacting many countries across the globe, travelling 
                has become harder than before. To limit the spread of COVID-19, more than 200 countries 
                and territories worldwide have imposed measures that restrict or deter people from 
                entering their respective borders, according to a report released by the United Nations 
                World Tourism Organization. Governments are taking a wide range of measures in response 
                to the COVID-19 outbreak. <br><br>Using several policy indicators of government responses
                like containment and restrictions/closure policies, as well as their health system 
                policies, we intend to develop a website that is able to help users access the potential 
                risks involved and provide travel advisory for them. The travel advisory and risk 
                assessment website is targeted at those who are intending to travel overseas during 
                the COVID-19 pandemic. It can be for several reasons such as business purposes, studying 
                abroad, vacation, or a trip back to their hometown.
            </sub>
        </p>
    </header>
    <br>
    <div class="row">
        <br><br><br><br>
        <h4>Meet the Team</h4>
        <br><br>
        <div class="column">
            <div class="card">
            <img src="https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg" alt="Jane" style="width:100%">
            <div class="container">
                <p class="name">Bryan Koh</p>
                <p class="title">Title</p>
                <p>Description</p>
                <p>example@example.com</p>
            </div>
            </div>
        </div>

        <div class="column">
            <div class="card">
            <img src="https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg" alt="Mike" style="width:100%">
            <div class="container">
                <p class="name">Ho Ying Rong</p>
                <p class="title">Title</p>
                <p>Description</p>
                <p>example@example.com</p>
            </div>
            </div>
        </div>

        <div class="column">
            <div class="card">
            <img src="https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg" alt="John" style="width:100%">
            <div class="container">
                <p class="name">Lim Jermaine</p>
                <p class="title">Title</p>
                <p>Description</p>
                <p>example@example.com</p>
            </div>
            </div>
        </div>

        <div class="column">
            <div class="card">
            <img src="https://cdn1.vectorstock.com/i/thumb-large/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.jpg" alt="John" style="width:100%">
            <div class="container">
                <p class="name">Linh Chi</p>
                <p class="title">Title</p>
                <p>Description</p>
                <p>example@example.com</p>
            </div>
            </div>
        </div>

        </div>
    </div>
</template>

<script>
	export default {}
</script>


<style>
    body {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
        Ubuntu, Droid Sans, Helvetica Neue, sans-serif !important;
    }
    
    .topnav {
        overflow: hidden;
        background-color: white;
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
    
    h1 {
        height: 50px;
        text-align: left;
        padding: 15px;
    }

    .row h4 {
        font-size: 30px;
        height: 50px;
        text-align: center;
        padding: 15px;
    }

    #mainContent {
        background-color: white;
    }
    
    #aboutCOVID {
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        background-image: url('https://stories.uh.edu/covid-19/assets/ag2dSlL11z/covidbackground05-2560x1440.jpeg');
        background-size: cover;
        height:530px;
        color:#BF0000;
    }

    #aboutApp {
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        display: block;
        position:relative;
        color:rgb(255, 255, 255)
    }

    #aboutApp::after {
        content:"";
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        background-image: url('https://media.cntraveler.com/photos/5ecfbc8a0877597c10c84052/16:9/w_2560%2Cc_limit/Travel-GettyImages-482761951.jpg');
        background-size: cover;
        background-attachment: fixed;
        background-color: #da554b;
        background-blend-mode: multiply;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1; 
        height:500px;
    }

    #aboutCOVID p {
    font-size: 18px;
    padding-left: 200px;
    padding-right: 200px;
    }

    #aboutApp p {
    font-size: 18px;
    padding-left: 200px;
    padding-right: 200px;
    }

    #aboutCOVID h5 {
    font-size: 30px;
    padding-left: 150px;
    padding-right: 150px;
    }

    #aboutApp h5 {
    font-size: 30px;
    padding-left: 150px;
    padding-right: 150px;
    }

    .name {
        font-weight: bold;
    font-size: 20px;
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    }

    .row {
        font-family: "Trebuchet MS", Helvetica, sans-serif;
        background: linear-gradient(white, #efb3ab, #ec9488);
    padding-left: 100px;
    padding-right: 100px;
    }

    .column {
    float: left;
    width: 25%;
    margin-bottom: 16px;
    padding: 0 16px;
    }

    /* Display the columns below each other instead of side by side on small screens */
    @media screen and (max-width: 650px) {
    .column {
        width: 100%;
        display: block;
    }
    }

    /* Add some shadows to create a card effect */
    .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    background: white;
    }

    .title {
    color: grey;
    }

    .column p {
    font-size: 16px;
    padding-left: 10px;
    padding-right: 10px;
    height: 0px;
    }
    
    .container {
        height: 200px;
    }
    /* Clear floats */
    .container::after, .row::after {
    content: "";
    clear: both;
    display: table;
    }

</style>