<template>
<div>
    <md-button @click="active = true" class="md-raised md-primary"> Pin It! </md-button>
    <md-dialog :md-active.sync="active">
        <md-dialog-title> <b> For a more personalized advisory, please fill in the form </b> </md-dialog-title>
        <md-dialog-content>
            <p style="font-size:120%;"> Date of Travel <p>
            <md-datepicker v-model="selectedDate" />
            <div>
                <p style="font-size:120%;"> No. of Travellers </p>
                <div>
                    <md-field>
                        <label for="adult"> Adult (16+) </label>
                        <md-select v-model="numAdult">
                            <md-option value="1"> 1 </md-option>
                            <md-option value="2"> 2 </md-option>
                            <md-option value="3"> 3 </md-option>
                            <md-option value="4"> 4 </md-option>
                            <md-option value="5"> 5 </md-option>
                            <md-option value="5++"> 5++ </md-option>
                        </md-select>
                    </md-field>
                </div>
                <div>
                    <md-field>
                        <label for="child"> Child (below 15) </label>
                        <md-select v-model="numChild">
                            <md-option value="1"> 1 </md-option>
                            <md-option value="2"> 2 </md-option>
                            <md-option value="3"> 3 </md-option>
                            <md-option value="4"> 4 </md-option>
                            <md-option value="5"> 5 </md-option>
                            <md-option value="5++"> 5++ </md-option>
                        </md-select>
                    </md-field>
                </div>
                <div>
                    <md-field>
                        <label for="elder"> Elder (65+) </label>
                        <md-select v-model="numElder">
                            <md-option value="1"> 1 </md-option>
                            <md-option value="2"> 2 </md-option>
                            <md-option value="3"> 3 </md-option>
                            <md-option value="4"> 4 </md-option>
                            <md-option value="5"> 5 </md-option>
                            <md-option value="5++"> 5++ </md-option>
                        </md-select>
                    </md-field>
                </div>
            </div>
            <p style="font-size:120%;"> Purpose of Travel </p>
            <md-field>
                <md-select v-model="purpose">
                    <md-option value="business"> Business </md-option>
                    <md-option value="study"> Study </md-option>
                    <md-option value="leisure"> Leisure </md-option>
                    <md-option value="medical"> Medical Care </md-option>
                    <md-option value="employment"> Employment </md-option>
                    <md-option value="others"> Others </md-option>
                </md-select>
            </md-field>
            <p style="font-size:120%;"> Does any of the traveller have existing medical condition? </p>
            <md-switch v-model="medical" value="medical"> Yes </md-switch>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button @click="active = false"> Cancel </md-button>
            <!-- add function call to save inputs -->
            <md-button @click="active = false"> Submit </md-button>
        </md-dialog-actions>
    </md-dialog>
</div>

</template>

<script>
export default {
    data() {
            return {
                selectedDate:null,
                numAdult:0,
                numChild:0,
                numElder:0,
                purpose:'',
                medical:false,
                active: false
            }
        }
    
}
</script>

<style scoped>

    .md-dialog {
        transform: translate(0%,0%) scale(1) !important;
        }

</style>