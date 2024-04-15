<script lang="ts">
	import Example from './example-plan.md';

</script>

<!--<main>-->
<section class="split">
	<article>
		<header>
			<hgroup>
				<h2><strong>FitPlan</strong></h2>
				<p>Your personalized workout starts here. In your inbox in seconds.</p>
			</hgroup>
		</header>

		<h3>Personalize your plan</h3>

		<form action="#" method="post">
			<input type="text" name="name" id="name" />

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
	</article>
	<figure />
</section>
<!--	<figure>-->
<!--	</figure>-->
<!--</main>-->

<section>
	<article>
		<header>
			<hgroup>
				<h3>What to expect</h3>
				<p>Below is an example based on a beginner level with a goal of gaining muscle with every facility available</p>
			</hgroup>
		</header>
		<Example/>
	</article>
</section>

<style lang="scss">
  #toast {
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 1em;
    background: #ffbf00;
    color: black;
  }

  section.split {
    flex: 1;
    display: flex;
    gap: 1rem;
    margin: auto 0;
    max-height: 90vh;
    position: relative;

    > * {
      width: 50%;
      flex-grow: 1;
    }

    article {
      align-self: start;
    }

    figure {
      margin-bottom: 1em;
      background: url('https://source.unsplash.com/featured/?gym&workout') no-repeat center center / cover;
      border-radius: var(--pico-border-radius);
    }
  }


  #facilities {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  //
  //.plan-example {
  //  padding: 10px;
  //  border-radius: 5px;
  //  margin-top: 20px;
  //}

  @media screen and (max-width: 768px) {
    section.split {
      flex-direction: column;

      > * {
        width: 100%;
      }

      figure {
        display: none;
      }
    }
  }

  #name {
    display: none;
  }
</style>
