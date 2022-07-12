<template>
  <div bg-blue-300 p-10 min-h-screen>
    <div bg-blue-7 py-5rem px-2rem m-auto max-w-60rem border-rd-20 h-full>
      <div max-w-35rem m-auto>
        <h2 block text-2xl font-bold mb-4>
          ThirdTime, a more flexible work rest timer.
        </h2>

        <h3 text-xl>
          🤨 What's this about?
        </h3>
        <div
          w-48 h2 border-blue-300 border-4 content-empty
        />
        <p>
          Trying to focus hard all day leads to distracted and tired half-work.
          It's much more effective to work hard for a period, and then let your brain rest for the next round.
          Unlimited breaks are tricky too, because they can easily tempt procrastination.
        </p>
        <p font-bold>
          ThirdTime aims to fix these issues simply, letting you break when you need it while keeping to your productivity goal.
        </p>
        <p>You automatically earn one fraction (default 1/3) of your work time as rest time.</p>
        <p>You can rest at any point, but only for as long as you've earned.</p>
        <p>ThirdTime does all the bookkeeping for you.</p>
        <h3 text-xl mt-4>
          🍅 What about Pomodoro?
        </h3>
        <div
          w-48 h2 border-blue-300 border-4 content-empty
        />
        <p><a href="https://pomofocus.io" pomodoro-link>Pomodoro</a> is another solution to rest management, that uses 25 minute work blocks and 5 minute breaks. </p>
        <p>25 minute periods can be good for:</p>
        <ul class="goods">
          <li>
            Making large tasks seem manageable
          </li>
          <li>Providing a motivating sense of urgency</li>
          <li>Making sure you actually take breaks before you're exhausted</li>
          <li>Fitting 30 minute blocks nicely into a timetable</li>
        </ul>
        <p>But there are downsides to consider:</p>
        <ul class="bads">
          <li>25 minutes isn't magically the right amount of time to work. Some people or tasks benefit from longer sessions or shorter sessions, and you can learn to break when you need it.</li>
          <li>Forced breaks can interrupt your flow and when you're settled in.</li>
          <li>Sometimes your work day just doesn't fit nicely into uninterrupted 25+5 minute blocks, and it'd be nice to have a system that survives anyway.</li>
        </ul>
        <p>
          If you have great difficulty getting yourself to take a break without an alarm, or you never feel 25 minutes blocks are too long or short,
          then I'd go for <a pomodoro-link href="https://pomofocus.io">Pomodoro</a>.
        </p>
        <p>If you Pomodoro's bugged you, or want to optimize your break-taking, this is for you ❤️</p>
        <p text-sm op-70>
          ThirdTime's default rest ratio of 1/3 is actually the same as Pomodoro rest, when you take into account their periodic long-breaks.
        </p>
        <h3 text-xl mt-4>
          ▶️💻 Working
        </h3>
        <div
          w-48 h2 border-blue-300 border-4 content-empty
        />
        <p>
          Work time is for single task, focused effort -
          the kind of productivity that's often only attainable with effective resting.
          If you notice yourself distractedly half-working, you should stop tracking it as work time and take a rest.
        </p>
        <p>
          Unitasking - working on one thing at a time, is very important for efficiency.
          Consider choosing a concrete task for yourself each time you press ▶️
        </p>
        <h3 text-xl mt-4>
          ⏸️🛋️ Resting
        </h3>
        <div
          w-48 h2 border-blue-300 border-4 content-empty
        />
        <p>
          The key idea in ThirdTime is to take your breaks when you need them.
          That can be short, like if you're brain-tired doing something unpleasant, or can be long if you get into a good flow.
        </p>
        <p>
          When you take a break, you don't need to take up all the rest time time.
          Get refreshed and jump back into things - your unspent rest will be stored for later.
        </p>
        <p>
          But don't go over your earned rest time.
          Stored rest time can go negative, but you shouldn't be letting it run negative on purpose.
          If you regularly find you need more rest time than you have, consider eliminating distractions, or changing the rest ratio to 1/2 for a while.
        </p>
        <p>
          Many people work for too long without rest, ending up tired, cranky, and ineffective.
          If that sounds like you, watch for the symptoms and force your brain to cool off when it's starting to suffer.
          You'll get more done!
          It may help to set small concrete tasks and break when you complete one.
          If it feels impossible, maybe switch to <a pomodoro-link href="https://pomofocus.io">Pomodoro</a> which tells you exactly when to take your breaks.
        </p>
        <p>What you do during your break matters. Relax your brain, don't keep mentally engaging with the work, or you won't come back refreshed.</p>
        <h3 text-xl mt-4>
          ⏹️🛏️ Stopping
        </h3>
        <div
          w-48 h2 border-blue-300 border-4 content-empty
        />
        <p>Stopping is for rest that doesn't need tracking. The end of the work day, a sit-down meal, an emergency away from your desk - any time you don't care if an alarm says you should get back to work.</p>
        <p>Stopping still takes rest time, but it'll never go below 0.</p>

        <h4 text-lg mt-4 mb--2>
          Acknowledgements
        </h4>
        <p text-sm>
          Credit is owed to
          <a pomodoro-link href="https://www.lesswrong.com/posts/RWu8eZqbwgB9zaerh/third-time-a-better-way-to-work">Bfinn</a> for creating the ThirdTime system,<br>
          and <a pomodoro-link href="https://medium.com/@lightsandcandy/the-flowtime-technique-7685101bd191#.ag0za2e33">Urgent Pigeon</a> for developing the related system Flowtime.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  margin-top: 0.5rem;
}
li {
  display: list-item;
  margin-left: 1.5rem;
}

.goods {
  list-style-type: checks-list-style;
}

.bads {
  list-style-type: x-list-style;
}

@counter-style checks-list-style {
  system: cyclic;
  symbols: "✔️";
  suffix: " ";
}

@counter-style x-list-style {
  system: cyclic;
  symbols: "❌";
  suffix: " ";
}
</style>
