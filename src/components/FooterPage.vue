<template>
    <footer>
        <div class = "flex-rw">
            <div class = "footer-social-section flex-rw">
                <span class = "footer-social-overlap footer-social-connect" style="background: #17A2B8; padding-left: 10px; padding-right: 10px">
                    CONNECT <span class = "footer-social-small">with</span> US
                </span>
                <span class = "footer-social-overlap footer-social-icons-wrapper" style="background: #17A2B8; padding-left: 10px; padding-right: 10px">
                    <a href = "https://www.google.com.sg/maps/place/National+University+of+Singapore/@1.2966426,103.7741999,17z/data=!3m1!4b1!4m5!3m4!1s0x31da1a56784202d9:0x488d08d6c1f88d6b!8m2!3d1.2966426!4d103.7763939"
                       target = "_blank" title = "NUSLink">
                        <i class = "fas fa-map-marker-alt generic-anchor"></i>
                    </a>
                    <a href = "mailto:qcjy3103@gmail.com" target = "_blank" title = "EmailLink">
                        <i class = "fas fa-envelope-open-text generic-anchor"></i>
                    </a>
                    <a href = "https://github.com/nguyenngoclinhchi/BT3103-TripBuddy" target = "_blank" title = "GithubLink">
                        <i class = "fab fa-github-square generic-anchor"></i>
                    </a>
                    <a href = "https://www.linkedin.com/in/ngoc-linh-chi-nguyen-53463217a/" target = "_blank" title = "LinkedInLink">
                        <i class = "fab fa-linkedin generic-anchor"></i>
                    </a>
                    <a href = "https://www.facebook.com/profile.php?id=100009045380956" target = "_blank" title = "FacebookLink">
                        <i class = "fab fa-facebook-square generic-anchor"></i>
                    </a>
                </span>
            </div>
        </div>
    </footer>
</template>

<script>
	export default {
		name: "Footer"
	}
</script>
<style>
    .generic-anchor {
        color: white;
        cursor: pointer;
        text-decoration: none;
    }
    
    .generic-anchor:hover {
        color: #ccc;
        text-decoration: none;
    }
    
    .flex-rw {
        display: flex;
        flex-flow: row wrap;
    }
    
    .footer-social-section {
        width: 100%;
        align-items: center;
        justify-content: space-around;
        position: relative;
        margin-top: 5px;
    }
    
    .footer-social-section::after {
        content: "";
        position: absolute;
        z-index: 1;
        top: 50%;
        border-top: 1px solid #ccc;
        width: 100%;
    }
    
    .footer-social-overlap {
        position: relative;
        z-index: 2;
        padding: 0;
    }
    
    .footer-social-connect {
        display: flex;
        align-items: center;
        font-size: 2.8rem;
        color: #fff;
    }
    
    .footer-social-small {
        font-size: 2rem;
        padding: 0 20px;
    }
    
    .footer-social-overlap > a {
        font-size: 2.8rem;
    }
    
    .footer-social-overlap > a:not(:first-child) {
        margin-left: 12px;
    }
    
    .footer-bottom-section > div:first-child {
        margin-right: auto;
    }
    
    @media only screen and (max-width: 768px) {
        .footer-social-connect {
            font-size: 2.5em;
        }
        
        .footer-social-overlap > a {
            font-size: 2.24em;
        }
    }
    
    @media only screen and (max-width: 568px) {
        .footer-social-section {
            justify-content: center;
        }
        
        .footer-social-section::after {
            top: 25%;
        }
        
        .footer-social-connect {
            margin-bottom: 10px;
            padding: 0 10px;
        }
        
        .footer-social-overlap {
            display: flex;
            justify-content: center;
        }
        
        .footer-social-icons-wrapper {
            width: 100%;
            padding: 0;
        }
        
        .footer-social-overlap > a:not(:first-child) {
            margin-left: 20px;
        }
    }
    
    @media only screen and (max-width: 480px) {
        .footer-social-overlap > a {
            margin: auto;
        }
        
        .footer-social-overlap > a:not(:first-child) {
            margin-left: 0;
        }
    }
    
    @media only screen and (max-width: 320px) {
        .footer-social-connect {
            font-size: 2.4em;
        }
        
        .footer-social-overlap > a {
            font-size: 2.24em;
        }
    }
</style>