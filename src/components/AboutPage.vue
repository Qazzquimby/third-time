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

        <h3 text-xl mt-4>
          ⚙️ Effective Workflow
        </h3>
        <div
          w-48 h2 border-blue-300 border-4 content-empty
        />
        <p>
          https://www.lesswrong.com/posts/RWu8eZqbwgB9zaerh/third-time-a-better-way-to-work
          how to take good breaks
          when to break. why breaks matter https://medium.com/@lightsandcandy/flowtime-troubleshooting-if-you-find-yourself-not-taking-breaks-d33da913c7dd#.scsbl6bid
          When to take long breaks
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  margin-top: 0.3rem;
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
