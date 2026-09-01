/* Machine-readable version of program.html and the exercise ladders.
   Consumed by today.html (session runner), rungs.html (rung finder),
   cards.html (printables), and _partials/mkladders.js, which regenerates the
   static ladders on exercises.html from this file. Change an exercise here and
   every one of them updates.

   Each rung carries:
     n      the name
     gate   the performance that earns the next rung
     how    setup and execution, in the order you actually do them
     cue    the one thing that matters most while you are doing it
     avoid  the mistake most people make on this specific rung */

(function () {
  var LADDERS = {
    push: {
      name: 'Horizontal push', page: 'exercises.html#hpush', unit: 'reps',
      trains: 'Chest, front deltoids, triceps, and the whole anterior core if you brace properly.',
      rungs: [
        { n: 'Wall push-up', gate: '3 × 20',
          how: 'Stand an arm\'s length from a wall, hands flat on it at chest height and slightly wider than your shoulders. Step your feet back until your body is a straight line from ears to heels. Bend your elbows to bring your chest to the wall over two seconds, then press back.',
          cue: 'Squeeze your glutes so your hips do not lead or trail — the whole body moves as one plank.',
          avoid: 'Standing too close, which turns it into an arm bend with no load.' },
        { n: 'High incline push-up (counter)', gate: '3 × 15',
          how: 'Hands on a kitchen counter or a solid desk, slightly wider than your shoulders, feet walked back so your body is a straight diagonal. Lower until your chest touches the edge, elbows tracking about 45° from your torso, then press away.',
          cue: 'The higher your hands, the easier it is — use that to dial the difficulty precisely.',
          avoid: 'A surface that slides or tips. Push on it hard before you trust it.' },
        { n: 'Low incline push-up (chair)', gate: '3 × 15',
          how: 'Hands on a chair seat, a stair, or the arm of a couch, roughly 18 inches up. Same straight line and same 45° elbows; chest touches the surface each rep.',
          cue: 'Push the floor away rather than thinking about lifting yourself — it keeps the shoulder blades from collapsing.',
          avoid: 'Letting the hips sag as the angle gets harder. If they sag, go back to a higher surface.' },
        { n: 'Knee push-up', gate: '3 × 15',
          how: 'Kneel with your knees a foot or so behind your hips, hands under your shoulders, and cross your ankles. Push your hips forward until you are a straight line from knees to head, then lower your chest to the floor and press up.',
          cue: 'Hips fully extended. If you are folded at the hip this becomes a much shorter, much easier rep.',
          avoid: 'Sitting back toward your heels, which shortens the lever and skips most of the work.' },
        { n: 'Negative push-up (5s down)', gate: '3 × 8',
          how: 'Start at the top of a full push-up on your toes. Lower yourself for a slow five-count until your chest touches the floor. Drop to your knees, press back to the top, get back on your toes, repeat.',
          cue: 'Count out loud. The last rep should still take a full five seconds — when it does not, the set is over.',
          avoid: 'Collapsing in the last foot. That final stretch is the part building the strength you are missing.' },
        { n: 'Full push-up', gate: '3 × 12',
          how: 'Hands slightly wider than shoulders and under or just below them, fingers spread and gripping the floor, feet together. Brace your abs and squeeze your glutes into one rigid line. Inhale, lower for two seconds until your sternum touches the floor, exhale and press to a full lockout.',
          cue: 'Elbows at about 45° from your body — from above your arms and torso make an arrow, not a T.',
          avoid: 'Half reps. Chest to the floor or drop back a rung; nobody is impressed by forty partial push-ups.' },
        { n: 'Feet-elevated push-up', gate: '3 × 12',
          how: 'Feet on a chair or step 12–18 inches up, hands on the floor. Everything else is a full push-up. The higher the feet, the more weight goes through your shoulders and upper chest.',
          cue: 'Keep the ribs pulled down. Elevated feet make the lower back want to arch.',
          avoid: 'Going straight to a high box. Add height in small steps — six inches at a time.' },
        { n: 'Diamond push-up', gate: '3 × 12',
          how: 'Hands together directly under your sternum, index fingers and thumbs touching to form a triangle. Lower until your chest touches your hands, elbows staying close to your ribs, then press up.',
          cue: 'Elbows brush past your sides, not out wide — that is what shifts the work onto the triceps.',
          avoid: 'Letting the wrists take a bad angle. Turn the hands out slightly or use fists if they complain.' },
        { n: 'Deficit push-up', gate: '3 × 12',
          how: 'Hands on parallettes, push-up handles, or two stacks of books 4–6 inches high. Lower until your chest drops below the level of your hands, pause for a beat in that stretched position, and press up.',
          cue: 'The pause at the bottom is the point — it kills the bounce and loads the chest at full stretch.',
          avoid: 'Diving deeper than your shoulders are comfortable with. Add depth gradually.' },
        { n: 'Archer push-up', gate: '3 × 8 /side',
          how: 'Hands wider than a normal push-up. Lower toward your left hand, bending that elbow while the right arm stays straight and slides out to the side, palm rotating so the fingers point away. Press back to centre and alternate.',
          cue: 'Almost all the weight on the bending arm. The straight arm is a kickstand, not a second pressing arm.',
          avoid: 'Twisting the hips to cheat the load across. Keep them square to the floor.' },
        { n: 'Pseudo-planche push-up', gate: '3 × 8',
          how: 'Hands down at waist level rather than under the shoulders, fingers turned out to the sides. Lean your shoulders forward well past your hands and hold that lean through the whole rep as you lower and press.',
          cue: 'The lean is the exercise. If your shoulders drift back over your hands it becomes an ordinary push-up.',
          avoid: 'Doing these with cold wrists. This rung demands the full wrist prep, every session.' },
        { n: 'One-arm push-up progression', gate: 'years away — listed so the ladder does not look finished',
          how: 'Elevated one-arm push-ups first (hands on a counter, then a chair), then on the floor with feet very wide, then progressively narrower.',
          cue: 'Resist rotating. The free hand stays behind your back and the hips stay level.',
          avoid: 'Attempting these before archer push-ups are comfortable. The elbow is what pays.' }
      ]
    },

    vpush: {
      name: 'Vertical push', page: 'exercises.html#vpush', unit: 'reps',
      trains: 'All three heads of the deltoid, triceps, upper traps, and overhead stability. This is how you build shoulders without a barbell.',
      rungs: [
        { n: 'Incline pike push-up', gate: '3 × 12',
          how: 'Hands on a chair, walk your feet in and push your hips up high so your torso is as close to vertical as your hamstrings allow. Lower the top of your head toward the seat between your hands, then press back up.',
          cue: 'Hips high. The higher the hips, the more this is a shoulder press and not an incline push-up.',
          avoid: 'Straight legs at the cost of a rounded back — bend the knees instead.' },
        { n: 'Floor pike push-up', gate: '3 × 12',
          how: 'From a push-up position walk your feet toward your hands into a downward-dog shape. Hands slightly wider than shoulders. Lower the crown of your head to the floor between and slightly in front of your hands, so head and hands form a triangle. Touch lightly, press straight back up.',
          cue: 'Your head goes down between your hands; your chest does not travel forward.',
          avoid: 'Letting the hips drop, which turns it into a decline push-up and takes the shoulders out of it.' },
        { n: 'Feet-elevated pike push-up', gate: '3 × 10',
          how: 'Feet on a chair or couch, hands on the floor, hips stacked high so your torso is close to vertical. Same head-to-triangle path, same lockout.',
          cue: 'This is a genuine overhead press — treat the reps with the same respect.',
          avoid: 'Raising the feet so high that you cannot control the descent to the floor.' },
        { n: 'Wall plank / wall walk', gate: '60 s hold',
          how: 'Start in a push-up position with your feet against the base of a wall. Walk your feet up the wall and your hands in toward it, a few inches at a time, until your body is vertical and your chest is close to the wall. Hold, then walk back out under control.',
          cue: 'Push tall through your shoulders the whole time, as if trying to make yourself an inch taller.',
          avoid: 'Walking your hands in further than you can walk back out from.' },
        { n: 'Chest-to-wall handstand hold', gate: '60 s total',
          how: 'Face the wall, hands about a hand-span from it, and walk up into a vertical handstand with your chest and thighs toward the wall. Squeeze glutes, tuck the pelvis, pull the ribs down, push tall.',
          cue: 'Chest to wall, never back to wall — back-to-wall teaches a banana-shaped arch you then have to unlearn.',
          avoid: 'Craning your neck to look forward. Look at the floor between your hands.' },
        { n: 'Partial wall handstand push-up', gate: '3 × 5',
          how: 'Kick up with your back to the wall, heels resting on it. Lower a few inches by bending the elbows, then press back to a full lockout. Increase the depth over weeks.',
          cue: 'Elbows track forward and slightly out, and your head moves toward a spot in front of your hands.',
          avoid: 'Going to failure. Failure here means your head hits the floor — always leave two reps.' },
        { n: 'Full wall handstand push-up', gate: '3 × 8',
          how: 'Same setup, but lower until the top of your head touches a folded towel on the floor, then press all the way up.',
          cue: 'Head and hands form a triangle, exactly as in the pike push-up.',
          avoid: 'A hard head-to-floor contact. Touch the towel, do not rest on it.' }
      ]
    },

    vpull: {
      name: 'Vertical pull', page: 'exercises.html#vpull', unit: 'reps',
      trains: 'Lats, biceps, brachialis, forearms and grip, lower traps, and core. The single most valuable movement on this site.',
      rungs: [
        { n: 'Dead hang', gate: '60 s accumulated, one unbroken 30 s',
          how: 'Grip the bar just outside shoulder width with your thumbs wrapped around it. Hang with straight arms and let your shoulders relax up toward your ears, then pull them down away from your ears and hold. Alternate relaxed and active hanging.',
          cue: 'Grip hard and breathe normally. This builds the grip that otherwise caps your pull-ups.',
          avoid: 'Dropping off the bar. Step or lower down — dropping is how wrists and shoulders get tweaked.' },
        { n: 'Scapular pull-up', gate: '3 × 10 with a visible 2-inch rise',
          how: 'Hang with completely straight arms. Without bending your elbows at all, pull your shoulder blades down and back so your whole body rises an inch or two. Hold for a second, lower under control.',
          cue: 'Elbows stay locked. If they bend, it has become a tiny pull-up and you have skipped the skill.',
          avoid: 'Rushing. This is the position every pull-up starts from, and most failed pull-ups skip it.' },
        { n: 'Band- or foot-assisted pull-up', gate: '3 × 8 on your lightest band',
          how: 'Loop a resistance band over the bar and put one knee or foot in it, or use a bar low enough to keep your toes on the ground. Set your shoulder blades down and back, then pull your elbows toward your ribs until your chin clears the bar. Lower over three seconds.',
          cue: 'Take only as much help as you need — the band should make the last two reps possible, not the whole set easy.',
          avoid: 'Living on a heavy band forever. Step down a band as soon as you can get eight reps.' },
        { n: 'Negative pull-up (5s down)', gate: '3 × 5, last rep still 5 seconds',
          how: 'Jump or step up so your chin is over the bar. Hold there for a second, then lower yourself for a slow five-count until your arms are completely straight. Step back up and repeat.',
          cue: 'Fight the whole way down, especially the last third where most people just drop.',
          avoid: 'Only doing negatives. They build the top; you also need assisted reps to learn to start from a dead hang.' },
        { n: 'Chin-up (underhand)', gate: '3 × 5',
          how: 'Palms facing you, hands about shoulder-width. Dead hang, set the shoulder blades, then pull until your chin clears the bar and your chest is close to it. Lower all the way to straight arms.',
          cue: 'Drive your elbows down into your back pockets rather than pulling your chin up.',
          avoid: 'Kipping. Cross your feet, squeeze your glutes, and stay slightly hollow so you cannot swing.' },
        { n: 'Pull-up', gate: '3 × 5',
          how: 'Palms facing away, hands just outside shoulder width. Dead hang, set the scapula, pull your elbows down and back until your chin is over the bar, then lower over two to three seconds to a full hang.',
          cue: 'Full extension at the bottom of every rep. That is where the strength is built and where people cheat.',
          avoid: 'A very wide grip. It shortens the range, stresses the shoulder, and builds nothing extra.' },
        { n: 'Pull-up for reps', gate: '3 × 10 strict',
          how: 'The same strict pull-up, now for volume. Rest a full three minutes between sets — if set three is much worse than set one, you rushed the rest.',
          cue: 'Keep every rep identical. The moment they start getting shorter, the set is finished.',
          avoid: 'Chasing a rep count by shortening the range as you fatigue.' },
        { n: 'Weighted / archer pull-up', gate: '3 × 6 with 25 lb',
          how: 'Wear a backpack loaded with books or plates, or use a dip belt. Alternatively pull toward one hand while the other arm straightens along the bar. Add 5 lb at a time.',
          cue: 'Small jumps. Your lats can handle a big increase; your elbows cannot.',
          avoid: 'Adding weight before you have ten clean bodyweight reps.' }
      ]
    },

    hpull: {
      name: 'Horizontal pull', page: 'exercises.html#hpull', unit: 'reps',
      trains: 'Rhomboids, mid and lower traps, rear deltoids, lats, biceps. The anti-hunchback pattern, and the most-skipped one.',
      rungs: [
        { n: 'Doorway towel row', gate: '3 × 15 with feet well forward',
          how: 'Loop a towel around a solid door handle with the door open, and stand on the hinge side so it cannot swing shut. Hold both ends, walk your feet forward and lean back with straight arms, then pull your chest toward your hands.',
          cue: 'Squeeze your shoulder blades together at the end of each pull and hold for a second.',
          avoid: 'Only bending your elbows. Without the shoulder-blade squeeze this is a biceps curl.' },
        { n: 'Table row, knees bent', gate: '3 × 12',
          how: 'Lie under a sturdy dining table, grip the edge with both hands about shoulder-width, knees bent and feet flat. Brace your core, then pull your chest to the underside of the table and lower under control.',
          cue: 'Body straight from knees to head — do not let the hips sag toward the floor.',
          avoid: 'Trusting a table you have not tested. Push up on it hard first and weight the far side if it can tip.' },
        { n: 'Inverted row, legs straight', gate: '3 × 12',
          how: 'Same setup but with your legs straight and only your heels on the floor. Chest touches the bar or table edge every rep.',
          cue: 'Lead with the elbows and finish by pinching the shoulder blades together.',
          avoid: 'A head-first reach. The chest travels, not the chin.' },
        { n: 'Feet-elevated inverted row', gate: '3 × 12',
          how: 'Heels on a chair so your body is horizontal or slightly head-down. Everything else is the same, with more of your weight on your arms.',
          cue: 'Keep the glutes squeezed — the higher the feet, the more the hips want to sag.',
          avoid: 'Raising the feet before you can do twelve clean flat-footed reps.' },
        { n: 'Archer row', gate: '3 × 8 /side',
          how: 'Take a wide grip. Pull your chest toward one hand while the other arm straightens along the bar, then lower and alternate sides.',
          cue: 'Hips stay square. Rotating to reach the bar defeats the purpose.',
          avoid: 'Letting the straight arm do half the pull.' },
        { n: 'Tuck front lever row', gate: '3 × 6',
          how: 'Hang, pull into a tuck front lever with your back horizontal and knees to your chest, then row your chest to the bar while holding that shape.',
          cue: 'Hold the tuck. The moment your hips drop it becomes an awkward pull-up.',
          avoid: 'Attempting this before you can hold a tuck front lever for twenty seconds.' }
      ]
    },

    dip: {
      name: 'Dip', page: 'exercises.html#dip', unit: 'reps',
      trains: 'Lower chest, triceps heavily, front deltoids. The closest bodyweight equivalent to a heavy press.',
      rungs: [
        { n: 'Bench dip, knees bent', gate: '3 × 15',
          how: 'Sit on the edge of a chair, hands beside your hips gripping the edge, fingers forward. Slide your hips off the front, knees bent and feet flat and close. Lower until your upper arms are parallel to the floor, then press back up.',
          cue: 'Keep your back close to the chair — drifting forward puts the shoulder in a bad position.',
          avoid: 'Dropping below parallel because it feels easy. Depth is where dips hurt people.' },
        { n: 'Bench dip, legs straight', gate: '3 × 15',
          how: 'Same, with your legs extended and only your heels on the floor. Longer lever, more of your weight on the arms.',
          cue: 'Shoulders stay pressed down away from your ears at the bottom.',
          avoid: 'Shrugging at the bottom, which is the position that irritates shoulders.' },
        { n: 'Bench dip, feet elevated', gate: '3 × 12',
          how: 'Heels on a second chair so your body is level between the two. Lower to parallel and press.',
          cue: 'Treat this as a stepping stone, not a home. Get to parallel bars.',
          avoid: 'Living on this rung. The behind-the-back arm position gets less shoulder-friendly the harder it gets.' },
        { n: 'Parallel-bar support hold', gate: '3 × 30 s',
          how: 'Jump or step up between parallel bars with your arms locked straight. Push your shoulders down away from your ears, brace your core, point your toes, and hold completely still.',
          cue: 'Actively push down through the bars. A passive hang in the support position is what you are training out of.',
          avoid: 'Swinging your legs. Stillness is the skill here.' },
        { n: 'Negative dip (5s down)', gate: '3 × 5',
          how: 'Get to the top support position, then lower for a slow five-count until your upper arms reach parallel. Step off and reset.',
          cue: 'Slight forward lean held constant through the descent.',
          avoid: 'Letting the shoulders roll forward and up as you tire.' },
        { n: 'Parallel-bar dip', gate: '3 × 10',
          how: 'From the support hold, lower under control until your upper arms are parallel to the floor, then press back to a full lockout. A slight forward lean emphasises the chest; staying vertical emphasises the triceps.',
          cue: 'Stop at parallel. Going deeper feels impressive and is where labrum and biceps-tendon problems come from.',
          avoid: 'Bouncing out of the bottom. Pause for a beat instead.' },
        { n: 'Weighted or ring dip', gate: '3 × 8, rings turned out at the top',
          how: 'Add a loaded backpack or dip belt, or move to rings and let the stability demand do the work. On rings, turn the rings out at the top so your palms face forward.',
          cue: 'On rings, keep them pressed against your body — letting them drift out is how the shoulder gets loaded badly.',
          avoid: 'Adding weight before you have ten clean bodyweight dips.' }
      ]
    },

    squat: {
      name: 'Squat pattern', page: 'exercises.html#squat', unit: 'reps /leg',
      trains: 'Quadriceps, glutes, adductors, plus a large amount of balance and hip stability once you go single-leg.',
      rungs: [
        { n: 'Box squat', gate: '3 × 15',
          how: 'Stand in front of a chair, feet shoulder-width and toes turned slightly out. Push your hips back and sit down until you just touch the seat, then stand up by driving through your whole foot.',
          cue: 'Touch, do not flop. Controlling the last inch is the whole point.',
          avoid: 'Letting the knees fall inward as you stand. Push them out over your second toe.' },
        { n: 'Bodyweight squat', gate: '3 × 20',
          how: 'Feet shoulder-width, toes slightly out, arms forward for balance. Sit down between your hips until the crease of your hip is below your kneecap, keeping your heels flat and chest up, then stand.',
          cue: 'Heels stay down. If they lift, put a book under them and work on ankle mobility.',
          avoid: 'Stopping at parallel because it is easier. Below parallel or it is a partial.' },
        { n: 'Split squat', gate: '3 × 12 /leg',
          how: 'Step one foot forward into a stance about two to three feet long, both feet flat and pointing forward. Lower straight down until your back knee is an inch off the floor, then press through the front foot to stand. All reps on one leg, then switch.',
          cue: 'Straight down, not forward. Your torso stays over your hips.',
          avoid: 'A stance too short, which jams the front knee and cramps the back leg.' },
        { n: 'Bulgarian split squat', gate: '3 × 12 /leg',
          how: 'Stand two to three feet in front of a chair and place the top of your rear foot on it. Lower straight down until your rear knee nearly touches and your front thigh is at or below parallel, then drive through the whole front foot.',
          cue: 'Most of your weight on the front foot — the back leg is a kickstand, not a driver.',
          avoid: 'Falling over and giving up. Hold a doorframe with one hand for the first few sessions.' },
        { n: 'Assisted / box pistol squat', gate: '3 × 8 /leg to a low box',
          how: 'Stand on one leg with the other extended in front. Sit back to a box or chair, tap, and stand back up on that one leg. Lower the box height over weeks, or hold a doorframe with one hand instead.',
          cue: 'Reach both arms forward as a counterweight — it is the difference between standing up and falling backward.',
          avoid: 'Dropping onto the box. Control the descent or raise the box.' },
        { n: 'Shrimp squat', gate: '3 × 8 /leg',
          how: 'Standing on one leg, bend the other knee and hold that foot behind you with the same-side hand. Lower until the held knee touches the floor, then stand back up.',
          cue: 'Keep your chest up and the working knee tracking over your toes.',
          avoid: 'Crashing the back knee into the floor. Put a folded towel down and touch it lightly.' },
        { n: 'Pistol squat', gate: '3 × 5 /leg',
          how: 'Stand on one leg with the other held straight out in front. Sit all the way down, keeping the free leg off the floor and the heel of the standing foot planted, then stand back up without touching down.',
          cue: 'Arms forward, weight over midfoot. Ankle mobility, not strength, is what stops most people.',
          avoid: 'Attempting these before you can do eight clean box pistols to a low box.' }
      ]
    },

    hinge: {
      name: 'Hinge & hamstrings', page: 'exercises.html#hinge', unit: 'reps',
      trains: 'Glutes, hamstrings, spinal erectors. Squatting barely touches the hamstrings — this is the fix, and it protects knees and lower back.',
      rungs: [
        { n: 'Glute bridge', gate: '3 × 20',
          how: 'Lie on your back with knees bent and heels close to your butt, arms flat at your sides. Drive through your heels to lift your hips until your body is a straight line from knees to shoulders, squeeze the glutes hard for two seconds, then lower.',
          cue: 'Squeeze the glutes to lift, do not arch the lower back to lift.',
          avoid: 'Pushing off your toes. Drive through the heels.' },
        { n: 'Single-leg glute bridge', gate: '3 × 15 /leg',
          how: 'Same setup with one foot planted and the other knee pulled toward your chest. Drive up through the planted heel, keeping your hips level side to side.',
          cue: 'Hips stay square — if one side drops, lower the range and build up.',
          avoid: 'Rushing. Two seconds up, two-second squeeze, two seconds down.' },
        { n: 'Shoulder-elevated hip thrust', gate: '3 × 15',
          how: 'Sit on the floor with your upper back against the edge of a couch, knees bent, feet flat and about shoulder-width. Drive your hips up until your torso is parallel to the floor, chin tucked, then lower.',
          cue: 'Finish with a hard glute squeeze at the top and ribs down.',
          avoid: 'Hyperextending the lower back at the top instead of finishing with the glutes.' },
        { n: 'Sliding leg curl', gate: '3 × 10',
          how: 'Lie on your back with your heels on towels or furniture sliders on a hard floor. Bridge your hips up, then slowly slide your feet away until your legs are almost straight, and curl them back in — all without letting your hips touch down.',
          cue: 'Hips stay high the entire time. The moment they drop, the hamstrings stop working.',
          avoid: 'Extending further than you can curl back from.' },
        { n: 'Single-leg Romanian deadlift', gate: '3 × 12 /leg, slow',
          how: 'Stand on one leg with a soft knee. Hinge at the hip, letting the free leg extend straight behind you as your torso lowers, until you feel a strong stretch in the standing hamstring. Keep your back flat, then return by driving the hip forward.',
          cue: 'Hips square to the floor — do not let the free-leg hip rotate open.',
          avoid: 'Rounding the back to reach lower. Stop where the stretch is, not where your fingers reach.' },
        { n: 'Nordic curl negative', gate: '3 × 5 with a 4-second lower',
          how: 'Kneel on a folded towel with your ankles wedged under a heavy couch or held by a partner. Keeping your body straight from knees to head, lower your torso forward as slowly as you can, catch yourself with your hands, and push back to the start.',
          cue: 'Hips stay extended — the moment you fold at the hip the hamstrings are off the hook.',
          avoid: 'Doing three sets of ten the first time. Do one set of three. This causes the worst soreness of anything in the program.' },
        { n: 'Full Nordic curl', gate: '3 × 3',
          how: 'The same movement, lowering and returning under hamstring power with no push from the hands.',
          cue: 'Control the whole range; a fast drop is a strain waiting to happen.',
          avoid: 'Attempting it before you can do five clean four-second negatives.' }
      ]
    },

    core: {
      name: 'Core — anti-extension', page: 'exercises.html#core', unit: 'sec',
      trains: 'Rectus abdominis, transverse abdominis, obliques, hip flexors. The core\'s job here is resisting movement, which is why holds beat crunches.',
      rungs: [
        { n: 'Dead bug', gate: '3 × 10 /side, no lower-back gap',
          how: 'Lie on your back with arms pointing at the ceiling and knees bent at 90° over your hips. Press your lower back flat into the floor. Slowly lower one arm overhead and the opposite leg toward the floor, then return and switch sides.',
          cue: 'Press the lower back down so hard nobody could slide a hand under it. If it lifts, shorten the reach.',
          avoid: 'Going fast. Three seconds out, three seconds back.' },
        { n: 'Plank', gate: '3 × 60 s',
          how: 'Forearms on the floor under your shoulders, feet together, body in one line. Squeeze the glutes, tuck the pelvis slightly, pull the ribs down, and push the floor away so the upper back is not collapsed.',
          cue: 'Actively brace as if bracing for a punch — a plank you can hold for three minutes is not a plank, it is a rest.',
          avoid: 'Adding time past sixty seconds. Add difficulty instead.' },
        { n: 'Tuck hollow hold', gate: '3 × 45 s',
          how: 'Lie on your back and press your lower back flat. Lift your shoulders and head slightly off the floor, arms reaching forward, and hold your knees tucked toward your chest.',
          cue: 'Lower back glued to the floor. That contact is the entire exercise.',
          avoid: 'Straining the neck. Keep a tennis-ball-sized gap under your chin.' },
        { n: 'One-leg hollow hold', gate: '3 × 45 s',
          how: 'From the tuck hollow, extend one leg out straight and low while keeping the other tucked. Alternate legs between sets.',
          cue: 'Extend only as far as you can keep the back flat.',
          avoid: 'Extending both legs before one is easy.' },
        { n: 'Full hollow hold', gate: '3 × 45 s',
          how: 'Arms extended overhead by your ears, legs straight and low, shoulders and heels both off the floor, lower back pressed flat. The most transferable core position in calisthenics.',
          cue: 'The lower the arms and legs, the harder it gets — use that as the dial.',
          avoid: 'Letting the back arch to get the legs lower. Raise the legs instead.' },
        { n: 'Hollow rock', gate: '3 × 20',
          how: 'Hold a rigid full hollow shape and rock back and forth on your lower back, driven from the shoulders, without changing the shape at all.',
          cue: 'The body stays one rigid banana-shaped piece; only the contact point moves.',
          avoid: 'Piking to generate the rock.' },
        { n: 'Long-lever plank / ab wheel', gate: '3 × 30 s or 3 × 10',
          how: 'Walk your elbows well out in front of your shoulders and hold. Or kneel with an ab wheel and roll out only as far as you can return from with a flat back.',
          cue: 'Ribs down and glutes squeezed the whole way. Range comes later.',
          avoid: 'Rolling out until the lower back arches. That is where people hurt themselves.' }
      ]
    },

    legraise: {
      name: 'Leg raise', page: 'exercises.html#legraise', unit: 'reps',
      trains: 'Lower abdominals, hip flexors, and — from the bar — grip and lats.',
      rungs: [
        { n: 'Lying knee tuck', gate: '3 × 20',
          how: 'Lie on your back with your hands tucked under your hips for support. Pull your knees toward your chest, lifting your hips slightly off the floor at the top, then lower under control without letting your feet touch down.',
          cue: 'Keep the lower back pressed down throughout.',
          avoid: 'Swinging the legs to build momentum.' },
        { n: 'Lying straight-leg raise', gate: '3 × 15',
          how: 'Same position with legs straight. Raise them to vertical, then lower until just before your lower back lifts off the floor, and raise again.',
          cue: 'Stop lowering at the point where the back would arch — that point is your current range.',
          avoid: 'Letting the back arch to get the legs lower. That is where lower-back pain comes from.' },
        { n: 'Hanging knee raise', gate: '3 × 15',
          how: 'Hang from the bar with shoulders active. Raise your knees above hip height, curling the pelvis slightly at the top, then lower slowly to a full hang.',
          cue: 'Pause for a full second at the bottom of every rep to kill the swing.',
          avoid: 'Using a body swing to throw the knees up.' },
        { n: 'Hanging straight-leg raise', gate: '3 × 12',
          how: 'Hang with active shoulders and legs straight, toes pointed. Keeping the knees locked, raise your legs to horizontal or above, curling the pelvis slightly at the top, then lower over three seconds to a full hang and pause before the next rep.',
          cue: 'Point your toes and keep the legs locked — bent knees are the easier version.',
          avoid: 'Kipping. If you cannot do it strictly, go back to knee raises.' },
        { n: 'Toes to bar', gate: '3 × 8',
          how: 'From a hang, raise your legs all the way until your feet touch the bar between your hands, then lower with control.',
          cue: 'Lean back slightly and pull with the lats to get the last part of the range.',
          avoid: 'Turning it into a kipping swing to reach the bar.' }
      ]
    },

    lsit: {
      name: 'L-sit', page: 'exercises.html#legraise', unit: 'sec',
      trains: 'Abs, hip flexors, quads, triceps, and scapular depression — the exact quality that makes handstands, dips and levers possible.',
      rungs: [
        { n: 'Foot-supported L-sit', gate: '3 × 20 s',
          how: 'Sit on the floor with legs straight, hands flat beside your hips (or on two books). Push down hard through your hands to lift your hips off the floor, keeping your heels lightly touching.',
          cue: 'Push your shoulders down away from your ears. That is the strength you are actually building.',
          avoid: 'Shrugging up into your ears, which is what happens the moment you tire.' },
        { n: 'Tuck L-sit', gate: '3 × 20 s',
          how: 'Same setup, but tuck your knees to your chest and lift your feet completely clear of the floor. Hold.',
          cue: 'Straight, locked arms and a tall push through the shoulders.',
          avoid: 'Letting the hips sag back below the hands.' },
        { n: 'One-leg-extended L-sit', gate: '3 × 15 s /side',
          how: 'From the tuck, extend one leg straight out horizontally while keeping the other tucked. Alternate between sets.',
          cue: 'Extend the leg without letting the hips drop.',
          avoid: 'Rushing to both legs before one is solid.' },
        { n: 'Full L-sit', gate: '3 × 15 s',
          how: 'Both legs straight out horizontally, toes pointed, arms locked, shoulders depressed, chest up.',
          cue: 'Tight hamstrings, not weak abs, are what usually stop the legs straightening here.',
          avoid: 'Bending the knees slightly and calling it a full L-sit. Film it from the side.' }
      ]
    },

    handstand: {
      name: 'Handstand', page: 'exercises.html#skills', unit: 'sec',
      trains: 'Shoulders, wrists, core, and balance. Practised fresh, short of failure, and often — this is motor learning, not fatigue.',
      rungs: [
        { n: 'Plank → pike hold', gate: '60 s plank, 45 s pike',
          how: 'Hold a straight-arm plank, then walk your feet in and hold a high pike with your hips stacked over your shoulders. Alternate the two.',
          cue: 'Push tall through the shoulders in both positions.',
          avoid: 'Skipping the wrist prep beforehand. Every session, two minutes.' },
        { n: 'Wall walk', gate: 'walk in and back out 5 times',
          how: 'Start in a push-up position with feet against the wall. Walk your feet up and your hands in until your chest is close to the wall, then walk back out under control.',
          cue: 'Small steps with the hands, and never go further in than you can come back from.',
          avoid: 'Sagging through the middle. Ribs down, glutes on.' },
        { n: 'Chest-to-wall handstand hold', gate: '60 s',
          how: 'Walk up into a vertical handstand facing the wall, hands a hand-span away from it. Squeeze the glutes, tuck the pelvis, pull the ribs down, push tall, and look at the floor between your hands.',
          cue: 'A straight line from hands through shoulders, hips and heels. This is the shape you are training.',
          avoid: 'Practising back-to-wall instead. It teaches an arched banana you then have to unlearn.' },
        { n: 'Kick-up to wall', gate: '10 controlled kick-ups',
          how: 'Back to the wall, hands about a foot from it. Step one foot forward, kick the other up and follow with the first, landing your heels lightly on the wall. Practise controlling the kick so you never slam into it.',
          cue: 'Kick just hard enough to reach vertical. Over-kicking is a habit that is hard to break later.',
          avoid: 'Never practising the bail. Learn to turn sideways and step down before you go freestanding.' },
        { n: 'Heel pulls / toe pulls', gate: '3-second free hold',
          how: 'From the chest-to-wall hold, peel one foot off the wall, then the other, and hold your balance for a moment before touching back.',
          cue: 'Balance comes from your fingers — press through the fingertips when falling forward, through the heel of the hand when falling back.',
          avoid: 'Trying to correct with your hips. Correct with your hands.' },
        { n: 'Freestanding handstand', gate: '30 s',
          how: 'Kick up away from the wall into the same straight shape, and correct continuously with fingertip pressure.',
          cue: 'Small constant corrections, not big saves.',
          avoid: 'Practising when tired. A tired handstand teaches the wrong movement.' }
      ]
    }
  };

  /* Accessories that don't need a whole ladder, but still need instructions. */
  var FIXED = {
    calf: { n: 'Standing calf raise', unit: 'reps',
      how: 'Stand tall, ideally with the balls of your feet on a step and your heels hanging off. Let your heels drop below the step for a full stretch, then rise as high onto your toes as you can and pause for two seconds at the top.',
      cue: 'Full range in both directions — a deep stretch at the bottom and a hard squeeze at the top.',
      avoid: 'Bouncing through short reps. Calves respond to range and high reps, not to speed.' },
    calf1: { n: 'Single-leg calf raise', unit: 'reps /leg',
      how: 'Same as above on one leg, with the other foot hooked behind your ankle and one hand on a wall for balance. Heel drops below the step, then rise to full tiptoe and pause.',
      cue: 'This is the version that actually loads the calf at bodyweight. Two seconds up, two seconds down.',
      avoid: 'Pulling yourself up with the hand on the wall — it is for balance only.' },
    sideplank: { n: 'Side plank', unit: 'sec /side',
      how: 'Lie on your side, forearm on the floor under your shoulder, feet stacked. Lift your hips until your body is a straight line from ankle to head, and hold. Switch sides.',
      cue: 'Hips high and stacked — do not let the top hip roll forward or the bottom hip sag.',
      avoid: 'Propping on a bent lower leg once it gets hard. Shorten the hold instead.' },
    superman: { n: 'Superman hold', unit: 'sec',
      how: 'Lie face down with arms extended overhead. Lift your chest, arms and legs off the floor at the same time and hold, squeezing your glutes.',
      cue: 'Lift with the glutes and mid-back, and keep your neck neutral by looking at the floor.',
      avoid: 'Cranking the neck back to look forward.' },
    deadbug: { n: 'Dead bug', unit: 'reps /side',
      how: 'On your back, arms up and knees over hips at 90°. Press your lower back flat into the floor, then slowly lower one arm overhead and the opposite leg toward the floor, return, and switch.',
      cue: 'The lower back never leaves the floor. If it lifts, do not reach as far.',
      avoid: 'Going quickly. Three seconds out, three seconds back.' },
    hang: { n: 'Dead hang', unit: 'sec',
      how: 'Hang from the bar with your thumbs wrapped around it, arms straight, and simply hold until your grip gives out.',
      cue: 'Grip hard and breathe. This is the grip work that stops your pull-ups being capped by your hands.',
      avoid: 'Dropping off at the end. Step or lower down.' },
    hollowrock: { n: 'Hollow rock', unit: 'reps',
      how: 'Hold a rigid hollow shape — arms overhead, legs low, lower back pressed flat — and rock back and forth on your lower back from the shoulders.',
      cue: 'The shape never changes. Only the point of contact with the floor moves.',
      avoid: 'Piking at the hips to generate the rocking motion.' }
  };

  /* e(ladderKey, sets, min, max, rest_seconds, [note]) */
  function e(k, sets, min, max, rest, note) {
    return { k: k, sets: sets, min: min, max: max, rest: rest, note: note || '' };
  }
  function skill(k, sets, min, max, rest, note) {
    var x = e(k, sets, min, max, rest, note); x.skill = true; return x;
  }

  var PHASES = [
    {
      name: 'Onramp', from: 1, to: 4,
      blurb: 'Floor only. Learn the patterns, build the habit, let your joints catch up. Finish every session feeling like you had more in you.',
      sessions: {
        A: { title: 'Push emphasis', items: [
          skill('core', 4, 20, 40, 60, 'Plank → pike hold → wall walk. Short of failure.'),
          e('push', 4, 6, 12, 90), e('hpull', 4, 8, 12, 90),
          e('vpush', 3, 6, 10, 90), e('squat', 3, 8, 12, 90),
          e('core', 3, 20, 45, 60), e('calf', 2, 20, 25, 60)
        ]},
        B: { title: 'Pull emphasis', items: [
          skill('lsit', 5, 15, 20, 60),
          e('hpull', 4, 8, 12, 90), e('dip', 4, 8, 15, 90),
          e('push', 3, 8, 12, 90, 'One rung easier than session A.'),
          e('hinge', 3, 10, 15, 90), e('legraise', 3, 10, 15, 60),
          e('sideplank', 2, 30, 45, 45)
        ]},
        C: { title: 'Legs & full body', items: [
          skill('handstand', 5, 20, 30, 60),
          e('squat', 4, 8, 12, 120), e('push', 3, 6, 12, 90), e('hpull', 3, 8, 12, 90),
          e('hinge', 3, 8, 15, 90), e('deadbug', 3, 10, 10, 45),
          e('superman', 2, 30, 30, 45), e('calf1', 2, 15, 15, 45)
        ]}
      }
    },
    {
      name: 'Foundation', from: 5, to: 12,
      blurb: 'Bar is up. Chasing your first pull-up, full-range push-ups for real sets, and a chest-to-wall handstand.',
      sessions: {
        A: { title: 'Push emphasis', items: [
          skill('handstand', 5, 20, 40, 60),
          e('push', 4, 6, 12, 90), e('vpull', 4, 3, 8, 90),
          e('vpush', 3, 6, 10, 90), e('hpull', 3, 8, 12, 90),
          e('squat', 3, 8, 12, 120), e('core', 3, 30, 45, 60), e('hang', 2, 20, 60, 60)
        ]},
        B: { title: 'Pull emphasis', items: [
          skill('lsit', 5, 15, 20, 60),
          e('vpull', 4, 3, 8, 120, 'Underhand grip — chin-ups are easier and build the pull-up.'),
          e('dip', 4, 5, 12, 120), e('hpull', 3, 8, 12, 90), e('push', 3, 8, 12, 90),
          e('hinge', 3, 6, 12, 90), e('legraise', 3, 10, 15, 60), e('sideplank', 2, 45, 45, 45)
        ]},
        C: { title: 'Legs & skill', items: [
          skill('handstand', 6, 20, 40, 60, 'Wall walks, kick-up practice, heel pulls.'),
          e('squat', 4, 6, 10, 120), e('vpull', 3, 3, 8, 90), e('vpush', 3, 6, 10, 90),
          e('hinge', 3, 12, 15, 90), e('hpull', 3, 8, 12, 90),
          e('calf1', 3, 15, 20, 45), e('hollowrock', 3, 15, 20, 60)
        ]}
      }
    },
    {
      name: 'Build', from: 13, to: 24,
      blurb: 'Pull-ups and dips for real sets, wall handstand push-ups, pistol squats, first L-sit. Add load where a rung has stalled.',
      sessions: {
        A: { title: 'Push emphasis', items: [
          skill('handstand', 6, 20, 45, 75, 'Freestanding work.'),
          e('push', 4, 6, 10, 120, 'Add a loaded backpack if this rung has stalled.'),
          e('vpull', 4, 5, 8, 120), e('vpush', 4, 4, 8, 120), e('hpull', 4, 8, 12, 90),
          e('squat', 3, 8, 12, 120), e('core', 3, 45, 45, 60), e('hang', 2, 30, 90, 60)
        ]},
        B: { title: 'Pull emphasis', items: [
          skill('lsit', 6, 15, 25, 60, 'Then tuck front lever, if you have 8 strict pull-ups.'),
          e('vpull', 5, 5, 8, 150), e('dip', 5, 6, 10, 150),
          e('hpull', 4, 6, 10, 90), e('push', 4, 6, 10, 90),
          e('hinge', 3, 5, 8, 90), e('legraise', 3, 10, 12, 60), e('sideplank', 2, 45, 60, 45)
        ]},
        C: { title: 'Legs & skill', items: [
          skill('handstand', 6, 20, 45, 75),
          e('squat', 4, 5, 8, 150), e('vpull', 4, 5, 8, 120), e('vpush', 3, 6, 10, 90),
          e('hpull', 3, 10, 12, 90), e('hinge', 3, 12, 15, 90),
          e('hollowrock', 3, 15, 20, 60), e('sideplank', 2, 45, 60, 45)
        ]}
      }
    }
  ];

  var DELOAD_WEEKS = [6, 12, 18, 24];
  var ORDER = ['A', 'B', 'C'];

  function phaseForWeek(week) {
    for (var i = 0; i < PHASES.length; i++) {
      if (week >= PHASES[i].from && week <= PHASES[i].to) return PHASES[i];
    }
    return PHASES[PHASES.length - 1];
  }

  function isDeload(week) { return DELOAD_WEEKS.indexOf(week) >= 0; }

  /* Weeks 1–3 ramp volume so a beginner isn't crippled in week one. */
  function setsForWeek(baseSets, week) {
    if (week === 1) return Math.max(2, baseSets - 2);
    if (week === 2) return Math.max(2, baseSets - 1);
    if (isDeload(week)) return Math.max(1, Math.round(baseSets / 2));
    return baseSets;
  }

  function label(key, rungs) {
    if (FIXED[key]) return FIXED[key].n;
    var l = LADDERS[key];
    if (!l) return key;
    var i = Math.min(Math.max(rungs && rungs[key] != null ? rungs[key] : 0, 0), l.rungs.length - 1);
    return l.rungs[i].n;
  }

  function unit(key) {
    if (FIXED[key]) return FIXED[key].unit;
    return LADDERS[key] ? LADDERS[key].unit : 'reps';
  }

  /* The how-to for whichever rung you are currently on. */
  function guide(key, rungs) {
    if (FIXED[key]) return FIXED[key];
    var l = LADDERS[key];
    if (!l) return null;
    var i = Math.min(Math.max(rungs && rungs[key] != null ? rungs[key] : 0, 0), l.rungs.length - 1);
    return l.rungs[i];
  }

  window.CAL = {
    LADDERS: LADDERS, FIXED: FIXED, PHASES: PHASES, ORDER: ORDER,
    DELOAD_WEEKS: DELOAD_WEEKS,
    phaseForWeek: phaseForWeek, isDeload: isDeload, setsForWeek: setsForWeek,
    label: label, unit: unit, guide: guide,
    defaultRungs: function () {
      return { push: 1, vpush: 0, vpull: 0, hpull: 0, dip: 0, squat: 1, hinge: 0, core: 0, legraise: 0, lsit: 0, handstand: 0 };
    }
  };
})();
