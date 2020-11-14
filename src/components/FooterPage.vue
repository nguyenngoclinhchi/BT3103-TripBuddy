<template>
    <footer>
        <div class = "container">
            <div class = "nine columns">
                <p>Created with love by Jeff.</p>
            </div>
        </div>
    </footer>
</template>

<script>
	export default {
		name: "Footer"
	}
</script>

<style scoped>
    body {
        font-size: 1.5em;
        line-height: 1.6;
        font-weight: 400;
        color: #222;
    }
    
    /* Footer Section
    ********************************************************************* */
    footer {
        margin-top: 50px;
        min-height: 120px;
        padding: 40px 0 40px 0;
        background: #e55d87;
        background: -moz-linear-gradient(-45deg, #e55d87 0%, #5fc3e4 100%);
        background: -webkit-linear-gradient(-45deg, #e55d87 0%, #5fc3e4 100%);
        background: linear-gradient(135deg, #e55d87 0%, #5fc3e4 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#e55d87', endColorstr='#5fc3e4', GradientType=1);
        box-sizing: border-box;
    }
    
    footer p {
        color: #FFFFFF;
        margin: 20px 0 0 0;
    }
    
    .socialIcons {
        font-size: 34px;
        color: rgba(255, 255, 255, 0.7);
    }
</style>