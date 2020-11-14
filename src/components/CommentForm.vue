<template>
    <div>
        <div class = "md-layout md-gutter">
            <div class = "md-layout-item">
                <md-field>
                    <label for = "movie">Movie</label>
                    <md-select id = "movie" name = "movie" v-model = "movie">
                        <md-option value = "fight-club">Fight Club</md-option>
                        <md-option value = "godfather">Godfather</md-option>
                        <md-option value = "godfather-ii">Godfather II</md-option>
                        <md-option value = "godfather-iii">Godfather III</md-option>
                        <md-option value = "godfellas">Godfellas</md-option>
                        <md-option value = "pulp-fiction">Pulp Fiction</md-option>
                        <md-option value = "scarface">Scarface</md-option>
                    </md-select>
                </md-field>
            </div>
            
            <div class = "md-layout-item">
                <md-field>
                    <md-select id = "country" name = "country" placeholder = "Country" v-model = "country">
                        <md-option value = "australia">Australia</md-option>
                        <md-option value = "brazil">Brazil</md-option>
                        <md-option value = "japan">Japan</md-option>
                        <md-option value = "united-states">United States</md-option>
                    </md-select>
                </md-field>
            </div>
            
            <div class = "md-layout-item">
                <md-field>
                    <label for = "font">Font</label>
                    <md-select id = "font" name = "font" v-model = "font">
                        <md-option value = "arial">Arial</md-option>
                        <md-option value = "calibri">Calibri</md-option>
                        <md-option value = "cambria">Cambria</md-option>
                        <md-option value = "comic-sans">Comic Sans</md-option>
                        <md-option value = "consolas">Consolas</md-option>
                        <md-option value = "courier">Courier</md-option>
                        <md-option value = "droid-sans">Droid Sans</md-option>
                        <md-option value = "georgia">Georgia</md-option>
                        <md-option value = "helvetica">Helvetica</md-option>
                        <md-option value = "impact">Impact</md-option>
                        <md-option value = "roboto">Roboto</md-option>
                        <md-option value = "segoe-ui">Segoe UI</md-option>
                        <md-option value = "times-new-roman">Times New Roman</md-option>
                        <md-option value = "ubuntu">Ubuntu</md-option>
                        <md-option value = "verdana">Verdana</md-option>
                    </md-select>
                </md-field>
            </div>
        </div>
        <md-button @click = "movie = 'pulp-fiction'" class = "md-primary md-raised">Set Pulp Fiction</md-button>
    </div>
</template>

<script>
	export default {
		name: 'BasicSelect',
		data: () => ({
			movie: 'godfather',
			country: null,
			font: null
		})
	}
</script>
