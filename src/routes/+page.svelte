<script lang="ts">
	import ExcerptWorkoutPlan from './examples/excerpt-plan.md';
</script>
<main>
	<section>
		<h2><strong>FitPlan</strong></h2>
		<p>Your personalized workout starts here. No fuzz, ready in seconds.</p>
		<hr />

		<h3>Personalize your plan</h3>

		<form action="#" method="post">
			<input type="text" name="name" id="name" />
			<label for="email">
				Your email address:
				<br>
				<small>Where you will receive the workout plan</small>
			</label>
			<input id="email" name="email" type="email"
						 placeholder="email@address.com"
						 required />

			<label for="fitness-level">Your fitness level:</label>
			<select id="fitness-level" name="level" required>
				<option value="beginner" selected>Beginner</option>
				<option value="intermediate">Intermediate</option>
				<option value="advanced">Advanced</option>
			</select>

			<label for="goal">Your fitness goal:</label>
			<select id="goal" name="goal" required>
				<option value="muscle-gain" selected>Muscle gain</option>
				<option value="weight-loss">Weight loss</option>
				<option value="flexibility">Flexibility</option>
				<option value="endurance">Endurance</option>
			</select>

			<fieldset id="facilities">
				<legend>Available facilities:</legend>
				<div>
					<input type="checkbox" id="gym" name="gym" checked />
					<label for="gym">Gym</label>
				</div>
				<div>
					<input type="checkbox" id="outside" name="outside" checked />
					<label for="outside">Outside</label>
				</div>
				<div>
					<input type="checkbox" id="weights" name="home" checked />
					<label for="weights">Home</label>
				</div>
			</fieldset>

			<label for="details">Other Details:</label>
			<textarea id="details" name="details"
								placeholder="Include any other important details such as target muscles, pains, equipment or other things to consider."
								rows="3" />
			<button type="submit">Get my plan - €1</button>
		</form>

		<hr />

		<h4>Example Plan:</h4>
		<blockquote class="plan-example">
			<ExcerptWorkoutPlan />
		</blockquote>
	</section>
	<figure>
		<img src="https://source.unsplash.com/featured/?gym&workout" alt="Gym Image">
	</figure>
</main>
<!--        <footer>-->
<!--            <small><a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a></small>-->
<!--        </footer>-->


<style>
    main {
        flex: 1;
        display: flex;
        gap: 1rem;
        margin: auto 0;
        max-height: 90vh;
    }

    section {
        max-width: 50%;
        flex-grow: 1;
    }

    figure {
        max-width: 50%;
        max-height: 90vh;
        height: 100%;
    }

    img {
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    /*footer {*/
    /*    text-align: center;*/
    /*    padding: 10px;*/
    /*    position: fixed;*/
    /*    bottom: 0;*/
    /*    width: 100%;*/
    /*}*/

    #facilities {
        display: flex;
        flex-direction: row;
        gap: 10px;
    }

    .plan-example {
        padding: 10px;
        border-radius: 5px;
        margin-top: 20px;
    }

    @media screen and (max-width: 768px) {
        main {
            flex-direction: column;
        }

        section {
            max-width: 100%;
        }

        figure {
            display: none;
        }
    }

    /** Honey pot field **/
    #name {
        display: none;
    }
</style>
