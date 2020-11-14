<template>
    <div id = "aboutContent">
        <div class = "container">
            <div class = "content-container">
                <h3>What is COVID-19?</h3>
                <div class = "block"></div>
                <p>
                    Coronavirus disease (COVID-19) is an infectious disease caused by a newly
                    discovered coronavirus. Coronaviruses are a large family of viruses that can cause
                    illness in animals or humans. In humans there are several known coronaviruses that
                    cause respiratory infections. COVID-19 was identified in Wuhan, China in December 2019.
                    COVID-19 is caused by the virus severe acute respiratory syndrome coronavirus 2
                    (SARS-CoV-2), a new virus in humans causing respiratory illness which can be spread
                    from person-to-person. Early in the outbreak, many patients were reported to have a
                    link to a large seafood and live animal market, however, later cases with no link to
                    the market confirmed person-to-person transmission of the disease. Most people infected
                    with the COVID-19 virus will experience mild to moderate respiratory illness and recover
                    without requiring special treatment. Older people, and those with underlying medical
                    problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer
                    are more likely to develop serious illness.
                </p><br>
                <h3>About tripBUDDY</h3>
                <div class = "block"></div>
                <p>
                    With the COVID-19 pandemic impacting many countries across the globe, travelling
                    has become harder than before. To limit the spread of COVID-19, more than 200 countries
                    and territories worldwide have imposed measures that restrict or deter people from
                    entering their respective borders, according to a report released by the United Nations
                    World Tourism Organization. Governments are taking a wide range of measures in response
                    to the COVID-19 outbreak. <br><br>Using several policy indicators of government responses
                    like containment and restrictions/closure policies, as well as their health system
                    policies, we help you access the potential
                    risks involved and provide a travel advisory tailored just for you. 
                </p><br>
                <h3>Meet our team</h3>
                <div class = "block"></div>
                <team-members></team-members>
            </div>
        </div>
    </div>
</template>

<script>
	import TeamMembers from "@/components/TeamMembers";
	
	export default {
		components: {
			TeamMembers,
		},
	}
</script>