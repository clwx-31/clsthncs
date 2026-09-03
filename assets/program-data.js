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
        {
          n: 'Wall push-up',
          gate: '3 × 20',
          equip: 'Nothing but a wall.',
          how: 'Stand an arm\'s length from a wall, hands flat on it at chest height and slightly '
               + 'wider than your shoulders. Step your feet back until your body is a straight line '
               + 'from ears to heels. Bend your elbows to bring your chest to the wall over two '
               + 'seconds, then press back.',
          cue: 'Squeeze your glutes so your hips do not lead or trail — the whole body moves as '
               + 'one plank.',
          avoid: 'Standing too close, which turns it into an arm bend with no load.',
          easier: 'If your hips sag or your shoulders shrug up to your ears, step in closer to the '
                  + 'wall and take a set off.',
          harder: '3 sets of 20 clean reps with a two-second lower. Then move to a kitchen counter.',
          first: 'This will feel too easy, and that is correct. You are teaching your shoulder '
                 + 'blades and your midsection to hold one rigid line. Nothing should hurt. If your '
                 + 'wrists complain, put your hands on fists instead.'
        },
        {
          n: 'High incline push-up (counter)',
          gate: '3 × 15',
          equip: 'A kitchen counter, a windowsill, or a solid desk at roughly hip-to-chest height.',
          sub: 'A wall at first, then the back of a heavy couch pushed against a wall. Any fixed '
               + 'surface works — what matters is that it cannot slide.',
          how: 'Hands on a kitchen counter or a solid desk, slightly wider than your shoulders, '
               + 'feet walked back so your body is a straight diagonal. Lower until your chest '
               + 'touches the edge, elbows tracking about 45° from your torso, then press away.',
          cue: 'The higher your hands, the easier it is — use that to dial the difficulty '
               + 'precisely.',
          avoid: 'A surface that slides or tips. Push on it hard before you trust it.',
          easier: 'If your chest cannot touch the edge without your hips dropping, use a higher '
                  + 'surface. There is no penalty for going higher.',
          harder: '3 sets of 15 with your chest touching the edge every rep. Then drop to a chair '
                  + 'seat.',
          first: 'Your triceps will tell you about it the next day more than your chest will. That '
                 + 'is normal at this angle. Push hard on the surface before you trust it with your '
                 + 'weight.'
        },
        {
          n: 'Low incline push-up (chair)',
          gate: '3 × 15',
          equip: 'A chair seat, a stair, or the arm of a couch — roughly 18 inches up.',
          sub: 'The second or third step of a staircase gives you every height between here and '
               + 'the floor. It is the most adjustable free equipment you own.',
          how: 'Hands on a chair seat, a stair, or the arm of a couch, roughly 18 inches up. Same '
               + 'straight line and same 45° elbows; chest touches the surface each rep.',
          cue: 'Push the floor away rather than thinking about lifting yourself — it keeps the '
               + 'shoulder blades from collapsing.',
          avoid: 'Letting the hips sag as the angle gets harder. If they sag, go back to a higher '
                 + 'surface.',
          easier: 'If the last two reps break form, move up one stair. Half a step is a real jump in '
                  + 'difficulty at this height.',
          harder: '3 sets of 15 with your chest touching the surface. Then either drop a stair or '
                  + 'switch to knee push-ups.',
          first: 'This is the rung where most people first feel their chest working rather than just '
                 + 'their arms. Make sure the chair is against a wall so it cannot slide out from '
                 + 'under you.'
        },
        {
          n: 'Knee push-up',
          gate: '3 × 15',
          equip: 'Floor. A folded towel or a rug under the knees if the floor is hard.',
          how: 'Kneel with your knees a foot or so behind your hips, hands under your shoulders, '
               + 'and cross your ankles. Push your hips forward until you are a straight line from '
               + 'knees to head, then lower your chest to the floor and press up.',
          cue: 'Hips fully extended. If you are folded at the hip this becomes a much shorter, '
               + 'much easier rep.',
          avoid: 'Sitting back toward your heels, which shortens the lever and skips most of the '
                 + 'work.',
          easier: 'If your hips fold as you tire, go back to a low incline. A folded knee push-up is '
                  + 'a worse exercise than a clean incline one.',
          harder: '3 sets of 15 with hips fully extended and your chest touching the floor. Then '
                  + 'start negatives.',
          first: 'Watch for the hip fold — it is the near-universal fault here and it makes the rep '
                 + 'about a third shorter. Film one set from the side if you are unsure.'
        },
        {
          n: 'Negative push-up (5s down)',
          gate: '3 × 8',
          equip: 'Floor.',
          how: 'Start at the top of a full push-up on your toes. Lower yourself for a slow '
               + 'five-count until your chest touches the floor. Drop to your knees, press back to '
               + 'the top, get back on your toes, repeat.',
          cue: 'Count out loud. The last rep should still take a full five seconds — when it does '
               + 'not, the set is over.',
          avoid: 'Collapsing in the last foot. That final stretch is the part building the strength '
                 + 'you are missing.',
          easier: 'If the last rep takes less than three seconds, the set is over. Stop, do not grind '
                  + 'out sloppy ones.',
          harder: '3 sets of 8 where the last rep still takes a full five seconds. That is your full '
                  + 'push-up.',
          first: 'Negatives make you sore. Genuinely sore, for two or three days, the first two '
                 + 'times you do them. That is the eccentric loading doing its job and it fades fast. '
                 + 'Do not add sets because it felt easy during the session.'
        },
        {
          n: 'Full push-up',
          gate: '3 × 12',
          equip: 'Floor.',
          how: 'Hands slightly wider than shoulders and under or just below them, fingers spread '
               + 'and gripping the floor, feet together. Brace your abs and squeeze your glutes into '
               + 'one rigid line. Inhale, lower for two seconds until your sternum touches the '
               + 'floor, exhale and press to a full lockout.',
          cue: 'Elbows at about 45° from your body — from above your arms and torso make an arrow, '
               + 'not a T.',
          avoid: 'Half reps. Chest to the floor or drop back a rung; nobody is impressed by forty '
                 + 'partial push-ups.',
          easier: 'If your sternum does not reach the floor, or your hips lead, take a set off before '
                  + 'you take reps off. Still failing? Go back to negatives for two weeks.',
          harder: '3 sets of 12 with your sternum touching the floor. Then elevate your feet six '
                  + 'inches.',
          first: 'The one that counts. Sternum to the floor or it is not a rep — and nobody is '
                 + 'impressed by forty partial push-ups. Expect your first honest set to be far fewer '
                 + 'reps than you assumed.'
        },
        {
          n: 'Feet-elevated push-up',
          gate: '3 × 12',
          equip: 'A chair, step, or couch 12-18 inches high.',
          sub: 'Stairs, again — six inches at a time.',
          how: 'Feet on a chair or step 12–18 inches up, hands on the floor. Everything else is a '
               + 'full push-up. The higher the feet, the more weight goes through your shoulders and '
               + 'upper chest.',
          cue: 'Keep the ribs pulled down. Elevated feet make the lower back want to arch.',
          avoid: 'Going straight to a high box. Add height in small steps — six inches at a time.',
          easier: 'If your lower back arches, lower the feet. Ribs pulled down is the requirement, '
                  + 'not the suggestion.',
          harder: '3 sets of 12 at this height. Then add six inches, or move to diamond push-ups for '
                  + 'the triceps.',
          first: 'More weight goes through your shoulders here. If the front of your shoulder '
                 + 'pinches, drop the height and check that your elbows are at 45 degrees, not flared '
                 + 'to a T.'
        },
        {
          n: 'Diamond push-up',
          gate: '3 × 12',
          equip: 'Floor.',
          how: 'Hands together directly under your sternum, index fingers and thumbs touching to '
               + 'form a triangle. Lower until your chest touches your hands, elbows staying close '
               + 'to your ribs, then press up.',
          cue: 'Elbows brush past your sides, not out wide — that is what shifts the work onto the '
               + 'triceps.',
          avoid: 'Letting the wrists take a bad angle. Turn the hands out slightly or use fists if '
                 + 'they complain.',
          easier: 'If your wrists hurt, turn the hands out slightly or make fists. If your elbows '
                  + 'hurt, stop — go back to full push-ups and come back in a month.',
          harder: '3 sets of 12 with your chest touching your hands. Then move to a deficit.',
          first: 'Your triceps are the limit here, not your chest, so the rep count drops hard from '
                 + 'full push-ups. That is expected, not a regression.'
        },
        {
          n: 'Deficit push-up',
          gate: '3 × 12',
          equip: 'Parallettes, push-up handles, or two stacks of books 4-6 inches high.',
          sub: 'Two thick hardcover books, or two low stools. They only need to be stable and the '
               + 'same height.',
          how: 'Hands on parallettes, push-up handles, or two stacks of books 4–6 inches high. '
               + 'Lower until your chest drops below the level of your hands, pause for a beat in '
               + 'that stretched position, and press up.',
          cue: 'The pause at the bottom is the point — it kills the bounce and loads the chest at '
               + 'full stretch.',
          avoid: 'Diving deeper than your shoulders are comfortable with. Add depth gradually.',
          easier: 'If your shoulders pinch at the bottom, reduce the height. Add depth over weeks, '
                  + 'not in one session.',
          harder: '3 sets of 12 with a one-second pause at the bottom. Then archer push-ups.',
          first: 'The pause at the bottom is the exercise. It kills the bounce and loads your chest '
                 + 'at full stretch, which is exactly where the growth is — and exactly where it feels '
                 + 'hardest.'
        },
        {
          n: 'Archer push-up',
          gate: '3 × 8 /side',
          equip: 'Floor. Parallettes make the wrist angle kinder.',
          how: 'Hands wider than a normal push-up. Lower toward your left hand, bending that elbow '
               + 'while the right arm stays straight and slides out to the side, palm rotating so '
               + 'the fingers point away. Press back to centre and alternate.',
          cue: 'Almost all the weight on the bending arm. The straight arm is a kickstand, not a '
               + 'second pressing arm.',
          avoid: 'Twisting the hips to cheat the load across. Keep them square to the floor.',
          easier: 'If your hips twist to shift the load, you are not ready. Go back to deficit '
                  + 'push-ups, or do these with the straight arm on a low step.',
          harder: '3 sets of 8 per side with the hips square. Then pseudo-planche push-ups.',
          first: 'The straight arm is a kickstand, not a second pressing arm. Almost all the weight '
                 + 'belongs on the bending side, which is why 8 reps here is much harder than 12 full '
                 + 'push-ups.'
        },
        {
          n: 'Pseudo-planche push-up',
          gate: '3 × 8',
          equip: 'Floor, or parallettes. Full wrist prep is mandatory.',
          how: 'Hands down at waist level rather than under the shoulders, fingers turned out to '
               + 'the sides. Lean your shoulders forward well past your hands and hold that lean '
               + 'through the whole rep as you lower and press.',
          cue: 'The lean is the exercise. If your shoulders drift back over your hands it becomes '
               + 'an ordinary push-up.',
          avoid: 'Doing these with cold wrists. This rung demands the full wrist prep, every '
                 + 'session.',
          easier: 'If your wrists hurt at all, do these on parallettes or fists. If the lean '
                  + 'collapses, shorten the range.',
          harder: '3 sets of 8 holding the forward lean the whole rep. Then start one-arm work.',
          first: 'The lean is the exercise. If your shoulders drift back over your hands it has '
                 + 'quietly become an ordinary push-up. This rung demands the full wrist prep every '
                 + 'single session — no exceptions.'
        },
        {
          n: 'One-arm push-up progression',
          gate: 'years away — listed so the ladder does not look finished',
          equip: 'A counter, then a chair, then the floor.',
          how: 'Elevated one-arm push-ups first (hands on a counter, then a chair), then on the '
               + 'floor with feet very wide, then progressively narrower.',
          cue: 'Resist rotating. The free hand stays behind your back and the hips stay level.',
          avoid: 'Attempting these before archer push-ups are comfortable. The elbow is what pays.',
          easier: 'Raise your hands. A one-arm push-up on a counter is a real exercise and a '
                  + 'legitimate place to spend months.',
          harder: 'There is no gate here. This is years of work, listed so the ladder does not look '
                  + 'finished.',
          first: 'Do not attempt these until archer push-ups are comfortable. The elbow is what pays '
                 + 'for impatience here, and elbow tendinopathy takes months to settle.'
        }
      ]
    },

    vpush: {
      name: 'Vertical push', page: 'exercises.html#vpush', unit: 'reps',
      trains: 'All three heads of the deltoid, triceps, upper traps, and overhead stability. This is '
              + 'how you build shoulders without a barbell.',
      rungs: [
        {
          n: 'Incline pike push-up',
          gate: '3 × 12',
          equip: 'A chair or a low table.',
          sub: 'A bed edge or a couch arm works. Stairs let you fine-tune the height.',
          how: 'Hands on a chair, walk your feet in and push your hips up high so your torso is as '
               + 'close to vertical as your hamstrings allow. Lower the top of your head toward the '
               + 'seat between your hands, then press back up.',
          cue: 'Hips high. The higher the hips, the more this is a shoulder press and not an '
               + 'incline push-up.',
          avoid: 'Straight legs at the cost of a rounded back — bend the knees instead.',
          easier: 'If your back rounds trying to get your hips high, bend your knees. Rounded back '
                  + 'with straight legs is worse than a bent-knee pike every time.',
          harder: '3 sets of 12 with your head touching down between your hands. Then take it to the '
                  + 'floor.',
          first: 'Hips high is the whole game. The higher your hips, the more this is a shoulder '
                 + 'press and the less it is an incline push-up.'
        },
        {
          n: 'Floor pike push-up',
          gate: '3 × 12',
          equip: 'Floor.',
          how: 'From a push-up position walk your feet toward your hands into a downward-dog '
               + 'shape. Hands slightly wider than shoulders. Lower the crown of your head to the '
               + 'floor between and slightly in front of your hands, so head and hands form a '
               + 'triangle. Touch lightly, press straight back up.',
          cue: 'Your head goes down between your hands; your chest does not travel forward.',
          avoid: 'Letting the hips drop, which turns it into a decline push-up and takes the '
                 + 'shoulders out of it.',
          easier: 'If your hips drop and your chest travels forward, it has become a decline push-up. '
                  + 'Go back to the chair.',
          harder: '3 sets of 12 with a light head touch. Then elevate your feet.',
          first: 'Your head goes down between your hands and your chest does not travel forward — '
                 + 'head and hands make a triangle. Expect far fewer reps than a normal push-up; your '
                 + 'shoulders are much smaller than your chest.'
        },
        {
          n: 'Feet-elevated pike push-up',
          gate: '3 × 10',
          equip: 'A chair or couch.',
          sub: 'A bed, or the second stair.',
          how: 'Feet on a chair or couch, hands on the floor, hips stacked high so your torso is '
               + 'close to vertical. Same head-to-triangle path, same lockout.',
          cue: 'This is a genuine overhead press — treat the reps with the same respect.',
          avoid: 'Raising the feet so high that you cannot control the descent to the floor.',
          easier: 'If you cannot control the descent, lower the feet. You should never be dropping '
                  + 'the last few inches onto your head.',
          harder: '3 sets of 10 under control. Then move to wall walks and start the handstand line.',
          first: 'This is a genuine overhead press now. Treat the reps with the respect you would '
                 + 'give a barbell over your face.'
        },
        {
          n: 'Wall plank / wall walk',
          gate: '60 s hold',
          equip: 'A clear wall and about four feet of floor. Move anything breakable.',
          how: 'Start in a push-up position with your feet against the base of a wall. Walk your '
               + 'feet up the wall and your hands in toward it, a few inches at a time, until your '
               + 'body is vertical and your chest is close to the wall. Hold, then walk back out '
               + 'under control.',
          cue: 'Push tall through your shoulders the whole time, as if trying to make yourself an '
               + 'inch taller.',
          avoid: 'Walking your hands in further than you can walk back out from.',
          easier: 'Walk your hands out a few inches. Only ever walk in as far as you can walk back '
                  + 'out from.',
          harder: 'A 60-second hold close to the wall. Then chest-to-wall handstand holds.',
          first: 'Being upside down is disorienting the first few times and your heart rate spikes. '
                 + 'That fades within two or three sessions. Learn to walk back out before you go all '
                 + 'the way in.'
        },
        {
          n: 'Chest-to-wall handstand hold',
          gate: '60 s total',
          equip: 'A clear wall. A folded towel for your head on later rungs.',
          how: 'Face the wall, hands about a hand-span from it, and walk up into a vertical '
               + 'handstand with your chest and thighs toward the wall. Squeeze glutes, tuck the '
               + 'pelvis, pull the ribs down, push tall.',
          cue: 'Chest to wall, never back to wall — back-to-wall teaches a banana-shaped arch you '
               + 'then have to unlearn.',
          avoid: 'Craning your neck to look forward. Look at the floor between your hands.',
          easier: 'Hands further from the wall makes it easier. Shorten the hold before you break the '
                  + 'shape.',
          harder: '60 seconds of total hold time, in any number of sets. Then partial handstand '
                  + 'push-ups.',
          first: 'Chest to wall, never back to wall — back-to-wall teaches a banana-shaped arch you '
                 + 'then spend months unlearning. Look at the floor between your hands, not forward.'
        },
        {
          n: 'Partial wall handstand push-up',
          gate: '3 × 5',
          equip: 'A clear wall and a folded towel.',
          how: 'Kick up with your back to the wall, heels resting on it. Lower a few inches by '
               + 'bending the elbows, then press back to a full lockout. Increase the depth over '
               + 'weeks.',
          cue: 'Elbows track forward and slightly out, and your head moves toward a spot in front '
               + 'of your hands.',
          avoid: 'Going to failure. Failure here means your head hits the floor — always leave two '
                 + 'reps.',
          easier: 'Reduce the depth. An inch of honest range beats four inches of collapse.',
          harder: '3 sets of 5, then add depth over weeks until your head touches the towel.',
          first: 'Never go to failure here — failure means your head hits the floor. Always leave '
                 + 'two reps in the tank. This is the one place on the site where stopping short is a '
                 + 'safety rule, not a preference.'
        },
        {
          n: 'Full wall handstand push-up',
          gate: '3 × 8',
          equip: 'A clear wall and a folded towel.',
          how: 'Same setup, but lower until the top of your head touches a folded towel on the '
               + 'floor, then press all the way up.',
          cue: 'Head and hands form a triangle, exactly as in the pike push-up.',
          avoid: 'A hard head-to-floor contact. Touch the towel, do not rest on it.',
          easier: 'Reduce the depth or add a thicker towel.',
          harder: '3 sets of 8 full-range. Then start freestanding work, or add a deficit.',
          first: 'Touch the towel, do not rest on it. Head and hands form the same triangle as the '
                 + 'pike push-up.'
        }
      ]
    },

    vpull: {
      name: 'Vertical pull', page: 'exercises.html#vpull', unit: 'reps',
      trains: 'Lats, biceps, brachialis, forearms and grip, lower traps, and core. The single most '
              + 'valuable movement on this site.',
      rungs: [
        {
          n: 'Dead hang',
          gate: '60 s accumulated, one unbroken 30 s',
          equip: 'A pull-up bar. This is the Tier 1 purchase that unlocks the phase.',
          sub: 'A playground bar, a scaffolding pole, a tree branch thicker than your wrist, or '
               + 'the top of a door frame if your fingertips can take it.',
          how: 'Grip the bar just outside shoulder width with your thumbs wrapped around it. Hang '
               + 'with straight arms and let your shoulders relax up toward your ears, then pull '
               + 'them down away from your ears and hold. Alternate relaxed and active hanging.',
          cue: 'Grip hard and breathe normally. This builds the grip that otherwise caps your '
               + 'pull-ups.',
          avoid: 'Dropping off the bar. Step or lower down — dropping is how wrists and shoulders '
                 + 'get tweaked.',
          easier: 'Keep your toes on the ground and take some weight off. Accumulate the time in '
                  + 'short sets.',
          harder: '60 seconds of accumulated hang, including one unbroken 30 seconds. Then scapular '
                  + 'pull-ups.',
          first: 'Your hands will give out long before your arms do, and the skin on your palms will '
                 + 'complain for the first two weeks before it toughens. Wrap your thumbs around the '
                 + 'bar. Never drop off — step or lower down.'
        },
        {
          n: 'Scapular pull-up',
          gate: '3 × 10 with a visible 2-inch rise',
          equip: 'A pull-up bar.',
          sub: 'Same substitutes as the dead hang.',
          how: 'Hang with completely straight arms. Without bending your elbows at all, pull your '
               + 'shoulder blades down and back so your whole body rises an inch or two. Hold for a '
               + 'second, lower under control.',
          cue: 'Elbows stay locked. If they bend, it has become a tiny pull-up and you have '
               + 'skipped the skill.',
          avoid: 'Rushing. This is the position every pull-up starts from, and most failed pull-ups '
                 + 'skip it.',
          easier: 'If your elbows bend it has become a tiny pull-up. Keep your toes down and practise '
                  + 'the movement with less weight.',
          harder: '3 sets of 10 with a visible two-inch rise and locked elbows. Then add band '
                  + 'assistance.',
          first: 'An inch or two of movement is the whole rep, and it looks like nothing. This is '
                 + 'the position every pull-up starts from, and most failed pull-ups fail because this '
                 + 'was skipped.'
        },
        {
          n: 'Band- or foot-assisted pull-up',
          gate: '3 × 8 on your lightest band',
          equip: 'A pull-up bar and a resistance band, or a bar low enough to keep your toes down.',
          sub: 'A low bar, a sturdy table edge, or a partner holding your feet. Two chairs and a '
               + 'broomstick work if the broomstick is sound.',
          how: 'Loop a resistance band over the bar and put one knee or foot in it, or use a bar '
               + 'low enough to keep your toes on the ground. Set your shoulder blades down and '
               + 'back, then pull your elbows toward your ribs until your chin clears the bar. Lower '
               + 'over three seconds.',
          cue: 'Take only as much help as you need — the band should make the last two reps '
               + 'possible, not the whole set easy.',
          avoid: 'Living on a heavy band forever. Step down a band as soon as you can get eight '
                 + 'reps.',
          easier: 'Use a thicker band. Take only as much help as you need — the band should make the '
                  + 'last two reps possible, not the whole set easy.',
          harder: '3 sets of 8 on your lightest band. Then negatives.',
          first: 'Bands snap back. Set your foot in the loop deliberately and keep your face out of '
                 + 'the line of the band if it slips.'
        },
        {
          n: 'Negative pull-up (5s down)',
          gate: '3 × 5, last rep still 5 seconds',
          equip: 'A pull-up bar and something to step up on.',
          sub: 'A chair beside the bar, or jump to the top position.',
          how: 'Jump or step up so your chin is over the bar. Hold there for a second, then lower '
               + 'yourself for a slow five-count until your arms are completely straight. Step back '
               + 'up and repeat.',
          cue: 'Fight the whole way down, especially the last third where most people just drop.',
          avoid: 'Only doing negatives. They build the top; you also need assisted reps to learn to '
                 + 'start from a dead hang.',
          easier: 'If the last rep takes under three seconds, stop the set. Two good negatives beat '
                  + 'five falls.',
          harder: '3 sets of 5 where the last rep still takes five seconds. That is your first '
                  + 'chin-up.',
          first: 'Expect real soreness in your lats and biceps for a couple of days the first two '
                 + 'times. Also expect your first negative to be much faster than five seconds — that '
                 + 'gap is the strength you are building.'
        },
        {
          n: 'Chin-up (underhand)',
          gate: '3 × 5',
          equip: 'A pull-up bar.',
          sub: 'Same substitutes as the dead hang.',
          how: 'Palms facing you, hands about shoulder-width. Dead hang, set the shoulder blades, '
               + 'then pull until your chin clears the bar and your chest is close to it. Lower all '
               + 'the way to straight arms.',
          cue: 'Drive your elbows down into your back pockets rather than pulling your chin up.',
          avoid: 'Kipping. Cross your feet, squeeze your glutes, and stay slightly hollow so you '
                 + 'cannot swing.',
          easier: 'Go back to band assistance for the last set rather than cutting the range short. '
                  + 'Chin over the bar or it is not a rep.',
          harder: '3 sets of 5 strict, chin clearly over the bar. Then switch to an overhand grip.',
          first: 'Underhand is easier than overhand because your biceps contribute more. This is '
                 + 'deliberate — chin-ups build the pull-up. Getting one is a genuine milestone; most '
                 + 'beginners cannot do a single one.'
        },
        {
          n: 'Pull-up',
          gate: '3 × 5',
          equip: 'A pull-up bar.',
          sub: 'Same substitutes as the dead hang.',
          how: 'Palms facing away, hands just outside shoulder width. Dead hang, set the scapula, '
               + 'pull your elbows down and back until your chin is over the bar, then lower over '
               + 'two to three seconds to a full hang.',
          cue: 'Full extension at the bottom of every rep. That is where the strength is built and '
               + 'where people cheat.',
          avoid: 'A very wide grip. It shortens the range, stresses the shoulder, and builds nothing '
                 + 'extra.',
          easier: 'Drop back to chin-ups, or band-assist the last set. Kipping is not an easier '
                  + 'version, it is a different exercise.',
          harder: '3 sets of 5 strict. Then chase double digits.',
          first: 'Overhand is harder than underhand and your rep count will fall when you switch. '
                 + 'That is the grip change, not lost strength.'
        },
        {
          n: 'Pull-up for reps',
          gate: '3 × 10 strict',
          equip: 'A pull-up bar.',
          sub: 'Same substitutes as the dead hang.',
          how: 'The same strict pull-up, now for volume. Rest a full three minutes between sets — '
               + 'if set three is much worse than set one, you rushed the rest.',
          cue: 'Keep every rep identical. The moment they start getting shorter, the set is '
               + 'finished.',
          avoid: 'Chasing a rep count by shortening the range as you fatigue.',
          easier: 'Cut the reps, not the range. Three strict beats eight with a wriggle.',
          harder: '3 sets of 10 strict. Then add weight or start archer pull-ups.',
          first: 'Ten strict pull-ups puts you past almost everyone who has ever bought a gym '
                 + 'membership. From here, added load progresses faster than added reps.'
        },
        {
          n: 'Weighted / archer pull-up',
          gate: '3 × 6 with 25 lb',
          equip: 'A pull-up bar, plus a backpack with books or a dip belt.',
          sub: 'A backpack loaded with hardcovers — roughly 1-2 lb each — or a gallon of water at '
               + '8.3 lb.',
          how: 'Wear a backpack loaded with books or plates, or use a dip belt. Alternatively pull '
               + 'toward one hand while the other arm straightens along the bar. Add 5 lb at a time.',
          cue: 'Small jumps. Your lats can handle a big increase; your elbows cannot.',
          avoid: 'Adding weight before you have ten clean bodyweight reps.',
          easier: 'Take weight off before you take range off.',
          harder: '3 sets of 6 with 25 lb. Beyond this you are into one-arm territory.',
          first: 'Load the backpack tight to your body so it does not swing. A swinging weight turns '
                 + 'a strict pull-up into a shoulder-testing arc.'
        }
      ]
    },

    hpull: {
      name: 'Horizontal pull', page: 'exercises.html#hpull', unit: 'reps',
      trains: 'Rhomboids, mid and lower traps, rear deltoids, lats, biceps. The anti-hunchback '
              + 'pattern, and the most-skipped one.',
      rungs: [
        {
          n: 'Doorway towel row',
          gate: '3 × 15 with feet well forward',
          equip: 'A door and a towel. Nothing else.',
          sub: 'A sturdy table edge, a fence rail, or a post. Anything you can grip and lean back '
               + 'from.',
          how: 'Loop a towel around a solid door handle with the door open, and stand on the hinge '
               + 'side so it cannot swing shut. Hold both ends, walk your feet forward and lean back '
               + 'with straight arms, then pull your chest toward your hands.',
          cue: 'Squeeze your shoulder blades together at the end of each pull and hold for a '
               + 'second.',
          avoid: 'Only bending your elbows. Without the shoulder-blade squeeze this is a biceps '
                 + 'curl.',
          easier: 'Walk your feet back so you are more upright. The more upright you stand, the '
                  + 'easier it is.',
          harder: '3 sets of 15 with your feet well forward. Then get under a table.',
          first: 'Loop the towel around the handle with the door open and stand on the hinge side, '
                 + 'so the door cannot swing shut on you. This is the free substitute that keeps your '
                 + 'back training honest before the bar goes up.'
        },
        {
          n: 'Table row, knees bent',
          gate: '3 × 12',
          equip: 'A solid dining table.',
          sub: 'A desk, a low bar, or two chairs with a broomstick across them — test it hard '
               + 'first.',
          how: 'Lie under a sturdy dining table, grip the edge with both hands about '
               + 'shoulder-width, knees bent and feet flat. Brace your core, then pull your chest to '
               + 'the underside of the table and lower under control.',
          cue: 'Body straight from knees to head — do not let the hips sag toward the floor.',
          avoid: 'Trusting a table you have not tested. Push up on it hard first and weight the far '
                 + 'side if it can tip.',
          easier: 'Walk your feet in toward you and stay more upright. Bent knees with feet close is '
                  + 'the easiest version.',
          harder: '3 sets of 12 with your chest touching the underside. Then straighten your legs.',
          first: 'Check the table can hold your weight and cannot tip — weigh the far side down if '
                 + 'you need to. This is the single most valuable free exercise you have; your back '
                 + 'has no other good bodyweight option before the bar.'
        },
        {
          n: 'Inverted row, legs straight',
          gate: '3 × 12',
          equip: 'A table, a low bar, or rings at hip height.',
          sub: 'A table works for all of this. Rings or a bar are kinder on the wrists.',
          how: 'Same setup but with your legs straight and only your heels on the floor. Chest '
               + 'touches the bar or table edge every rep.',
          cue: 'Lead with the elbows and finish by pinching the shoulder blades together.',
          avoid: 'A head-first reach. The chest travels, not the chin.',
          easier: 'Bend your knees again, or raise the bar. Higher bar equals easier row.',
          harder: '3 sets of 12 with your chest touching and your body in one line. Then elevate your '
                  + 'feet.',
          first: 'Your hips will want to sag. One line from heels to head, and your chest touches — '
                 + 'not your stomach.'
        },
        {
          n: 'Feet-elevated inverted row',
          gate: '3 × 12',
          equip: 'A low bar or table, plus a chair for your feet.',
          sub: 'Any box, step, or stack of books at roughly bar height.',
          how: 'Heels on a chair so your body is horizontal or slightly head-down. Everything else '
               + 'is the same, with more of your weight on your arms.',
          cue: 'Keep the glutes squeezed — the higher the feet, the more the hips want to sag.',
          avoid: 'Raising the feet before you can do twelve clean flat-footed reps.',
          easier: 'Lower the feet. Every few inches counts.',
          harder: '3 sets of 12 with feet level with the bar. Then archer rows.',
          first: 'With your feet level with the bar this is close to a horizontal bodyweight row, '
                 + 'which is a genuinely hard pull. Rep counts drop.'
        },
        {
          n: 'Archer row',
          gate: '3 × 8 /side',
          equip: 'A low bar or rings.',
          sub: 'A table edge, though the hand position is more awkward.',
          how: 'Take a wide grip. Pull your chest toward one hand while the other arm straightens '
               + 'along the bar, then lower and alternate sides.',
          cue: 'Hips stay square. Rotating to reach the bar defeats the purpose.',
          avoid: 'Letting the straight arm do half the pull.',
          easier: 'Raise the bar, or go back to feet-elevated rows for another month.',
          harder: '3 sets of 8 per side with square hips. Then tuck front lever rows.',
          first: 'The straight arm assists more than it feels like it does. Keep the hips square and '
                 + 'resist the twist.'
        },
        {
          n: 'Tuck front lever row',
          gate: '3 × 6',
          equip: 'A pull-up bar or rings.',
          sub: 'Rings are much kinder here than a fixed bar.',
          how: 'Hang, pull into a tuck front lever with your back horizontal and knees to your '
               + 'chest, then row your chest to the bar while holding that shape.',
          cue: 'Hold the tuck. The moment your hips drop it becomes an awkward pull-up.',
          avoid: 'Attempting this before you can hold a tuck front lever for twenty seconds.',
          easier: 'Tuck tighter — knees closer to your chest shortens the lever and takes weight off.',
          harder: '3 sets of 6 holding the tuck. From here you are working the front lever proper.',
          first: 'Holding the tuck while rowing is the hard part, not the row. Your midsection will '
                 + 'fail before your back does.'
        }
      ]
    },

    dip: {
      name: 'Dip', page: 'exercises.html#dip', unit: 'reps',
      trains: 'Lower chest, triceps heavily, front deltoids. The closest bodyweight equivalent to a '
              + 'heavy press.',
      rungs: [
        {
          n: 'Bench dip, knees bent',
          gate: '3 × 15',
          equip: 'A chair, bench, step, or bed edge.',
          sub: 'The edge of a bathtub, a low wall, or a stair. Anything solid at roughly knee '
               + 'height.',
          how: 'Sit on the edge of a chair, hands beside your hips gripping the edge, fingers '
               + 'forward. Slide your hips off the front, knees bent and feet flat and close. Lower '
               + 'until your upper arms are parallel to the floor, then press back up.',
          cue: 'Keep your back close to the chair — drifting forward puts the shoulder in a bad '
               + 'position.',
          avoid: 'Dropping below parallel because it feels easy. Depth is where dips hurt people.',
          easier: 'Bring your feet closer in and take more weight through your legs. Reduce the depth '
                  + 'if your shoulders complain.',
          harder: '3 sets of 15. Then straighten your legs.',
          first: 'Bench dips put your shoulders in an internally rotated position that some people '
                 + 'simply do not tolerate. If the front of your shoulder pinches, stop and use '
                 + 'push-ups and pike push-ups for your triceps instead — this whole ladder is '
                 + 'skippable until you have parallel bars.'
        },
        {
          n: 'Bench dip, legs straight',
          gate: '3 × 15',
          equip: 'A chair, bench, or step.',
          sub: 'Same as above.',
          how: 'Same, with your legs extended and only your heels on the floor. Longer lever, more '
               + 'of your weight on the arms.',
          cue: 'Shoulders stay pressed down away from your ears at the bottom.',
          avoid: 'Shrugging at the bottom, which is the position that irritates shoulders.',
          easier: 'Bend your knees again and walk your feet in.',
          harder: '3 sets of 15 with legs straight and a controlled depth. Then elevate your feet.',
          first: 'Keep your back close to the bench. Drifting forward is what turns shoulder '
                 + 'discomfort into shoulder pain here.'
        },
        {
          n: 'Bench dip, feet elevated',
          gate: '3 × 12',
          equip: 'Two chairs, or a chair and a step.',
          sub: 'A bench and a coffee table.',
          how: 'Heels on a second chair so your body is level between the two. Lower to parallel '
               + 'and press.',
          cue: 'Treat this as a stepping stone, not a home. Get to parallel bars.',
          avoid: 'Living on this rung. The behind-the-back arm position gets less shoulder-friendly '
                 + 'the harder it gets.',
          easier: 'Lower the feet, or go back to legs straight on the floor.',
          harder: '3 sets of 12. Then move to parallel bars if you have access to them.',
          first: 'This is the top of what a chair can give you. Do not chase depth here — go find '
                 + 'parallel bars or rings instead, which are both safer and better.'
        },
        {
          n: 'Parallel-bar support hold',
          gate: '3 × 30 s',
          equip: 'Parallel bars, dip bars, gymnastic rings, or two very solid chair backs.',
          sub: 'A park has parallel bars. Two kitchen counters facing each other work if they are '
               + 'the right distance apart.',
          how: 'Jump or step up between parallel bars with your arms locked straight. Push your '
               + 'shoulders down away from your ears, brace your core, point your toes, and hold '
               + 'completely still.',
          cue: 'Actively push down through the bars. A passive hang in the support position is '
               + 'what you are training out of.',
          avoid: 'Swinging your legs. Stillness is the skill here.',
          easier: 'Keep a toe on the ground to take weight off. Hold for less time rather than '
                  + 'breaking the shape.',
          harder: '3 sets of 30 seconds with locked elbows and depressed shoulders. Then negatives.',
          first: 'Shoulders down and away from your ears, elbows locked. This hold is what '
                 + 'conditions the shoulder and elbow before you start loading them through range — do '
                 + 'not skip it to get to real dips faster.'
        },
        {
          n: 'Negative dip (5s down)',
          gate: '3 × 5',
          equip: 'Parallel bars or rings, and a step to get to the top.',
          sub: 'Jump or step up to the top position from the floor.',
          how: 'Get to the top support position, then lower for a slow five-count until your upper '
               + 'arms reach parallel. Step off and reset.',
          cue: 'Slight forward lean held constant through the descent.',
          avoid: 'Letting the shoulders roll forward and up as you tire.',
          easier: 'If the last rep takes under three seconds, stop. Reduce the depth before reducing '
                  + 'the tempo.',
          harder: '3 sets of 5 with a controlled five-second lower. Then full dips.',
          first: 'Dips load the shoulder and the sternum harder than almost anything else on this '
                 + 'site. Go to about 90 degrees at the elbow, not further, until you have months of '
                 + 'them behind you.'
        },
        {
          n: 'Parallel-bar dip',
          gate: '3 × 10',
          equip: 'Parallel bars or rings.',
          sub: 'A park dip station.',
          how: 'From the support hold, lower under control until your upper arms are parallel to '
               + 'the floor, then press back to a full lockout. A slight forward lean emphasises the '
               + 'chest; staying vertical emphasises the triceps.',
          cue: 'Stop at parallel. Going deeper feels impressive and is where labrum and '
               + 'biceps-tendon problems come from.',
          avoid: 'Bouncing out of the bottom. Pause for a beat instead.',
          easier: 'Band assistance, or drop back to negatives for the last set.',
          harder: '3 sets of 10 to 90 degrees. Then add weight or move to rings.',
          first: 'Lean forward slightly for more chest, stay upright for more triceps. Stop at 90 '
                 + 'degrees at the elbow — going deeper is the most common way people hurt their '
                 + 'shoulder on this movement.'
        },
        {
          n: 'Weighted or ring dip',
          gate: '3 × 8, rings turned out at the top',
          equip: 'Rings, or parallel bars plus a loaded backpack.',
          sub: 'A backpack with books. Rings cost about $40 and are the best value on the gear '
               + 'list.',
          how: 'Add a loaded backpack or dip belt, or move to rings and let the stability demand '
               + 'do the work. On rings, turn the rings out at the top so your palms face forward.',
          cue: 'On rings, keep them pressed against your body — letting them drift out is how the '
               + 'shoulder gets loaded badly.',
          avoid: 'Adding weight before you have ten clean bodyweight dips.',
          easier: 'Take the weight off, or go back to fixed bars. Rings are substantially harder than '
                  + 'bars.',
          harder: '3 sets of 8 with the rings turned out at the top.',
          first: 'Rings move, which is the point and also the difficulty. Expect to shake violently '
                 + 'the first few sessions — that is stabiliser recruitment, not a problem.'
        }
      ]
    },

    squat: {
      name: 'Squat pattern', page: 'exercises.html#squat', unit: 'reps',
      trains: 'Quadriceps, glutes, adductors, plus a large amount of balance and hip stability once '
              + 'you go single-leg.',
      rungs: [
        {
          n: 'Box squat',
          gate: '3 × 15',
          equip: 'A chair, bench, or bed edge.',
          sub: 'A stack of books, a low stool, or a step. Higher is easier.',
          how: 'Stand in front of a chair, feet shoulder-width and toes turned slightly out. Push '
               + 'your hips back and sit down until you just touch the seat, then stand up by '
               + 'driving through your whole foot.',
          cue: 'Touch, do not flop. Controlling the last inch is the whole point.',
          avoid: 'Letting the knees fall inward as you stand. Push them out over your second toe.',
          easier: 'Raise the surface. Sitting to a higher box is a legitimate month of training, not '
                  + 'a failure.',
          harder: '3 sets of 15 touching the seat under control. Then squat without the chair.',
          first: 'Push your hips back first, not down. Touch the seat, do not sit and rest on it. If '
                 + 'your heels lift, put a folded towel under them and work on your ankles separately.'
        },
        {
          n: 'Bodyweight squat',
          gate: '3 × 20',
          equip: 'Nothing.',
          how: 'Feet shoulder-width, toes slightly out, arms forward for balance. Sit down between '
               + 'your hips until the crease of your hip is below your kneecap, keeping your heels '
               + 'flat and chest up, then stand.',
          cue: 'Heels stay down. If they lift, put a book under them and work on ankle mobility.',
          avoid: 'Stopping at parallel because it is easier. Below parallel or it is a partial.',
          easier: 'Put the chair back. There is no shame in a target.',
          harder: '3 sets of 20 with your thighs at least parallel to the floor. Then move to one leg '
                  + 'at a time.',
          first: 'Knees tracking over your toes is fine and normal. Knees collapsing inward is not — '
                 + 'push them out as you stand. Most people find depth is limited by their ankles, not '
                 + 'their knees.'
        },
        {
          n: 'Split squat',
          unit: 'reps /leg',
          gate: '3 × 12 /leg',
          equip: 'Nothing. A wall or chair back for balance if you need it.',
          how: 'Step one foot forward into a stance about two to three feet long, both feet flat '
               + 'and pointing forward. Lower straight down until your back knee is an inch off the '
               + 'floor, then press through the front foot to stand. All reps on one leg, then '
               + 'switch.',
          cue: 'Straight down, not forward. Your torso stays over your hips.',
          avoid: 'A stance too short, which jams the front knee and cramps the back leg.',
          easier: 'Hold a wall with one hand, or shorten the range so your back knee stops higher.',
          harder: '3 sets of 12 per leg with your back knee lightly touching down. Then elevate the '
                  + 'back foot.',
          first: 'Single-leg work exposes a strength difference between your sides that you probably '
                 + 'did not know about. Do your weaker leg first and match the stronger one to it.'
        },
        {
          n: 'Bulgarian split squat',
          unit: 'reps /leg',
          gate: '3 × 12 /leg',
          equip: 'A chair, bench, or step for your back foot.',
          sub: 'A couch, a bed, or a low windowsill. Around knee height.',
          how: 'Stand two to three feet in front of a chair and place the top of your rear foot on '
               + 'it. Lower straight down until your rear knee nearly touches and your front thigh '
               + 'is at or below parallel, then drive through the whole front foot.',
          cue: 'Most of your weight on the front foot — the back leg is a kickstand, not a driver.',
          avoid: 'Falling over and giving up. Hold a doorframe with one hand for the first few '
                 + 'sessions.',
          easier: 'Lower the back foot, or go back to split squats.',
          harder: '3 sets of 12 per leg. Then start pistol work.',
          first: 'This is the hardest leg exercise most people ever do without a barbell, and it is '
                 + 'brutal the first time. Expect three or four days of soreness. Start with two sets, '
                 + 'not three.'
        },
        {
          n: 'Assisted / box pistol squat',
          unit: 'reps /leg',
          gate: '3 × 8 /leg to a low box',
          equip: 'A low box, chair, or stair, and something to hold for balance.',
          sub: 'A door frame to hold, or a doorway with a towel through the handles.',
          how: 'Stand on one leg with the other extended in front. Sit back to a box or chair, '
               + 'tap, and stand back up on that one leg. Lower the box height over weeks, or hold a '
               + 'doorframe with one hand instead.',
          cue: 'Reach both arms forward as a counterweight — it is the difference between standing '
               + 'up and falling backward.',
          avoid: 'Dropping onto the box. Control the descent or raise the box.',
          easier: 'Sit to a higher box, or hold on more. Both are real progressions.',
          harder: '3 sets of 8 per leg to a low box with minimal hand assistance. Then shrimp squats.',
          first: 'Balance and ankle mobility limit this long before strength does. That is normal '
                 + 'and it is why the box and the handhold exist.'
        },
        {
          n: 'Shrimp squat',
          unit: 'reps /leg',
          gate: '3 × 8 /leg',
          equip: 'Nothing. A folded towel under the back knee.',
          how: 'Standing on one leg, bend the other knee and hold that foot behind you with the '
               + 'same-side hand. Lower until the held knee touches the floor, then stand back up.',
          cue: 'Keep your chest up and the working knee tracking over your toes.',
          avoid: 'Crashing the back knee into the floor. Put a folded towel down and touch it '
                 + 'lightly.',
          easier: 'Hold a support, or touch down to a raised pad rather than the floor.',
          harder: '3 sets of 8 per leg with the back knee touching down under control.',
          first: 'Your back knee touches lightly — it does not crash. Put a folded towel down for '
                 + 'the first few weeks while you learn how far away the floor is.'
        },
        {
          n: 'Pistol squat',
          unit: 'reps /leg',
          gate: '3 × 5 /leg',
          equip: 'Nothing.',
          how: 'Stand on one leg with the other held straight out in front. Sit all the way down, '
               + 'keeping the free leg off the floor and the heel of the standing foot planted, then '
               + 'stand back up without touching down.',
          cue: 'Arms forward, weight over midfoot. Ankle mobility, not strength, is what stops '
               + 'most people.',
          avoid: 'Attempting these before you can do eight clean box pistols to a low box.',
          easier: 'Hold a doorframe, or sit to a low box. Both keep it a pistol squat.',
          harder: '3 sets of 5 per leg, full depth, no assistance.',
          first: 'A full pistol squat is a strength, mobility, and balance feat at once, and it '
                 + 'usually takes a beginner a year. If one of the three is missing, train that one '
                 + 'specifically rather than grinding the whole movement.'
        }
      ]
    },

    hinge: {
      name: 'Hinge & hamstrings', page: 'exercises.html#hinge', unit: 'reps',
      trains: 'Glutes, hamstrings, spinal erectors. Squatting barely touches the hamstrings — this is '
              + 'the fix, and it protects knees and lower back.',
      rungs: [
        {
          n: 'Glute bridge',
          gate: '3 × 20',
          equip: 'Floor. A mat or carpet is kinder on your spine.',
          how: 'Lie on your back with knees bent and heels close to your butt, arms flat at your '
               + 'sides. Drive through your heels to lift your hips until your body is a straight '
               + 'line from knees to shoulders, squeeze the glutes hard for two seconds, then lower.',
          cue: 'Squeeze the glutes to lift, do not arch the lower back to lift.',
          avoid: 'Pushing off your toes. Drive through the heels.',
          easier: 'Reduce the range — lift to where you can still feel your glutes rather than your '
                  + 'lower back.',
          harder: '3 sets of 20 with a two-second squeeze at the top. Then move to one leg.',
          first: 'You should feel this in your glutes. If you feel it mostly in your lower back or '
                 + 'hamstrings, you are arching rather than squeezing — tuck your pelvis before you '
                 + 'lift.'
        },
        {
          n: 'Single-leg glute bridge',
          gate: '3 × 15 /leg',
          equip: 'Floor.',
          how: 'Same setup with one foot planted and the other knee pulled toward your chest. '
               + 'Drive up through the planted heel, keeping your hips level side to side.',
          cue: 'Hips stay square — if one side drops, lower the range and build up.',
          avoid: 'Rushing. Two seconds up, two-second squeeze, two seconds down.',
          easier: 'Go back to two legs, or keep the non-working foot lightly touching down.',
          harder: '3 sets of 15 per leg with level hips. Then elevate your shoulders.',
          first: 'Your hips will want to drop on the unsupported side. Keep them level — that is '
                 + 'most of the exercise.'
        },
        {
          n: 'Shoulder-elevated hip thrust',
          gate: '3 × 15',
          equip: 'A couch, bed, or bench to rest your shoulder blades on.',
          sub: 'A sturdy chair pushed against a wall, or a step.',
          how: 'Sit on the floor with your upper back against the edge of a couch, knees bent, '
               + 'feet flat and about shoulder-width. Drive your hips up until your torso is '
               + 'parallel to the floor, chin tucked, then lower.',
          cue: 'Finish with a hard glute squeeze at the top and ribs down.',
          avoid: 'Hyperextending the lower back at the top instead of finishing with the glutes.',
          easier: 'Go back to floor bridges, or reduce the range.',
          harder: '3 sets of 15 with a full lockout and a two-second squeeze. Then sliding leg curls.',
          first: 'The extra range is the point. Make sure whatever you rest on is against a wall — '
                 + 'this is a movement that slides furniture.'
        },
        {
          n: 'Sliding leg curl',
          gate: '3 × 10',
          equip: 'Two towels on a hard floor, or furniture sliders.',
          sub: 'Paper plates on carpet, or socks on hardwood. Both work.',
          how: 'Lie on your back with your heels on towels or furniture sliders on a hard floor. '
               + 'Bridge your hips up, then slowly slide your feet away until your legs are almost '
               + 'straight, and curl them back in — all without letting your hips touch down.',
          cue: 'Hips stay high the entire time. The moment they drop, the hamstrings stop working.',
          avoid: 'Extending further than you can curl back from.',
          easier: 'Use both legs, shorten the range, or push through your hands on the way back out.',
          harder: '3 sets of 10 keeping your hips up throughout. Then single-leg Romanian deadlifts.',
          first: 'Only works on hardwood, tile, or laminate. Your hamstrings will cramp the first '
                 + 'couple of times — that is normal for a muscle that has never been trained through '
                 + 'this range.'
        },
        {
          n: 'Single-leg Romanian deadlift',
          gate: '3 × 12 /leg, slow',
          equip: 'Nothing. A wall for fingertip balance.',
          sub: 'A backpack with books adds load once bodyweight is easy.',
          how: 'Stand on one leg with a soft knee. Hinge at the hip, letting the free leg extend '
               + 'straight behind you as your torso lowers, until you feel a strong stretch in the '
               + 'standing hamstring. Keep your back flat, then return by driving the hip forward.',
          cue: 'Hips square to the floor — do not let the free-leg hip rotate open.',
          avoid: 'Rounding the back to reach lower. Stop where the stretch is, not where your '
                 + 'fingers reach.',
          easier: 'Touch the free foot down between reps, or hold a wall.',
          harder: '3 sets of 12 per leg, slow, with a flat back. Then Nordic negatives.',
          first: 'Push your hips back, do not bend forward at the waist. Your back stays flat and '
                 + 'your standing knee stays softly bent. Expect to wobble for the first month.'
        },
        {
          n: 'Nordic curl negative',
          gate: '3 × 5 with a 4-second lower',
          equip: 'Something immovable to hook your heels under, and a folded towel or pillow under '
                 + 'your knees.',
          sub: 'A partner holding your ankles, a loaded couch, or the underside of a bed frame. '
               + 'Test it holds hard before you trust it.',
          how: 'Kneel on a folded towel with your ankles wedged under a heavy couch or held by a '
               + 'partner. Keeping your body straight from knees to head, lower your torso forward '
               + 'as slowly as you can, catch yourself with your hands, and push back to the start.',
          cue: 'Hips stay extended — the moment you fold at the hip the hamstrings are off the '
               + 'hook.',
          avoid: 'Doing three sets of ten the first time. Do one set of three. This causes the worst '
                 + 'soreness of anything in the program.',
          easier: 'Push off your hands harder on the way down, or shorten the range and stop at 45 '
                  + 'degrees.',
          harder: '3 sets of 5 with a controlled four-second lower. Then the full Nordic curl.',
          first: 'This is a genuinely advanced hamstring exercise and it belongs in the back half of '
                 + 'the program, not week one. Your hands catch you — set them up before you start. '
                 + 'Expect severe soreness after your first session; do exactly one set the first '
                 + 'time.'
        },
        {
          n: 'Full Nordic curl',
          gate: '3 × 3',
          equip: 'Heel anchor and knee padding.',
          sub: 'Same as the negative.',
          how: 'The same movement, lowering and returning under hamstring power with no push from '
               + 'the hands.',
          cue: 'Control the whole range; a fast drop is a strain waiting to happen.',
          avoid: 'Attempting it before you can do five clean four-second negatives.',
          easier: 'Go back to negatives, or push off your hands to get back up.',
          harder: '3 sets of 3 under full control, both directions.',
          first: 'Very few people get here without months of negatives first. There is no shortcut '
                 + 'and the hamstring is a muscle that tears when rushed.'
        }
      ]
    },

    core: {
      name: 'Core — anti-extension', page: 'exercises.html#core', unit: 'sec',
      trains: 'Rectus abdominis, transverse abdominis, obliques, hip flexors. The core\'s job here is '
              + 'resisting movement, which is why holds beat crunches.',
      rungs: [
        {
          n: 'Dead bug',
          gate: '3 × 10 /side, no lower-back gap',
          equip: 'Floor.',
          how: 'Lie on your back with arms pointing at the ceiling and knees bent at 90° over your '
               + 'hips. Press your lower back flat into the floor. Slowly lower one arm overhead and '
               + 'the opposite leg toward the floor, then return and switch sides.',
          cue: 'Press the lower back down so hard nobody could slide a hand under it. If it lifts, '
               + 'shorten the reach.',
          avoid: 'Going fast. Three seconds out, three seconds back.',
          easier: 'Reach less far, or keep your knees bent. Range is the dial here.',
          harder: '3 sets of 10 per side with no gap under your lower back. Then hold a plank.',
          first: 'Press your lower back flat into the floor and keep it there. If it lifts, you have '
                 + 'reached too far — that is the entire skill, and it transfers to every other '
                 + 'movement on this site.'
        },
        {
          n: 'Plank',
          gate: '3 × 60 s',
          equip: 'Floor. A mat helps your elbows.',
          how: 'Forearms on the floor under your shoulders, feet together, body in one line. '
               + 'Squeeze the glutes, tuck the pelvis slightly, pull the ribs down, and push the '
               + 'floor away so the upper back is not collapsed.',
          cue: 'Actively brace as if bracing for a punch — a plank you can hold for three minutes '
               + 'is not a plank, it is a rest.',
          avoid: 'Adding time past sixty seconds. Add difficulty instead.',
          easier: 'Drop to your knees, or put your forearms on a chair. Shorten the hold before you '
                  + 'break the line.',
          harder: '3 sets of 60 seconds in a straight line with the pelvis tucked. Then tuck hollow '
                  + 'holds.',
          first: 'A plank is not about how long — it is about how hard. Squeeze your glutes, tuck '
                 + 'your pelvis, and pull your elbows toward your toes. Done properly, 60 seconds is '
                 + 'plenty.'
        },
        {
          n: 'Tuck hollow hold',
          gate: '3 × 45 s',
          equip: 'Floor.',
          how: 'Lie on your back and press your lower back flat. Lift your shoulders and head '
               + 'slightly off the floor, arms reaching forward, and hold your knees tucked toward '
               + 'your chest.',
          cue: 'Lower back glued to the floor. That contact is the entire exercise.',
          avoid: 'Straining the neck. Keep a tennis-ball-sized gap under your chin.',
          easier: 'Tuck tighter, or put your hands on your thighs.',
          harder: '3 sets of 45 seconds with your lower back glued to the floor. Then extend one leg.',
          first: 'Lower back pressed flat is the requirement. The moment a gap appears, the set is '
                 + 'over — no matter how long you have held it.'
        },
        {
          n: 'One-leg hollow hold',
          gate: '3 × 45 s',
          equip: 'Floor.',
          how: 'From the tuck hollow, extend one leg out straight and low while keeping the other '
               + 'tucked. Alternate legs between sets.',
          cue: 'Extend only as far as you can keep the back flat.',
          avoid: 'Extending both legs before one is easy.',
          easier: 'Bend the extended leg, or raise it higher. Higher is easier.',
          harder: '3 sets of 45 seconds per side with a flat lower back. Then extend both legs.',
          first: 'Swap sides between sets. The lower the extended leg, the harder it gets — that is '
                 + 'your fine adjustment.'
        },
        {
          n: 'Full hollow hold',
          gate: '3 × 45 s',
          equip: 'Floor.',
          how: 'Arms extended overhead by your ears, legs straight and low, shoulders and heels '
               + 'both off the floor, lower back pressed flat. The most transferable core position '
               + 'in calisthenics.',
          cue: 'The lower the arms and legs, the harder it gets — use that as the dial.',
          avoid: 'Letting the back arch to get the legs lower. Raise the legs instead.',
          easier: 'Raise your legs and arms higher, or tuck one knee.',
          harder: '3 sets of 45 seconds. Then start rocking.',
          first: 'This is the shape underneath the handstand, the front lever, and a good push-up. '
                 + 'Time spent here pays out across the whole site.'
        },
        {
          n: 'Hollow rock',
          gate: '3 × 20',
          equip: 'Floor. A mat or carpet — this is uncomfortable on bare boards.',
          how: 'Hold a rigid full hollow shape and rock back and forth on your lower back, driven '
               + 'from the shoulders, without changing the shape at all.',
          cue: 'The body stays one rigid banana-shaped piece; only the contact point moves.',
          avoid: 'Piking to generate the rock.',
          easier: 'Go back to the static hold. Rocking a shape you cannot hold just teaches a worse '
                  + 'shape.',
          harder: '3 sets of 20 with the shape unchanged throughout. Then long-lever planks or an ab '
                  + 'wheel.',
          first: 'The shape never changes; only the point of contact moves. If you find yourself '
                 + 'piking at the hips to generate the rock, you are not ready.'
        },
        {
          n: 'Long-lever plank / ab wheel',
          gate: '3 × 30 s or 3 × 10',
          equip: 'Floor, or an ab wheel (about $20).',
          sub: 'A barbell with plates rolls the same way. So does a towel on a hard floor.',
          how: 'Walk your elbows well out in front of your shoulders and hold. Or kneel with an ab '
               + 'wheel and roll out only as far as you can return from with a flat back.',
          cue: 'Ribs down and glutes squeezed the whole way. Range comes later.',
          avoid: 'Rolling out until the lower back arches. That is where people hurt themselves.',
          easier: 'Shorten the reach, or roll out to a wall stop and gradually move the wall further '
                  + 'away.',
          harder: '3 sets of 30 seconds, or 3 sets of 10 full roll-outs.',
          first: 'The ab wheel is one of the few genuinely worthwhile cheap purchases. Start with a '
                 + 'very short range — this is the exercise people most reliably hurt their lower back '
                 + 'on by going too far on day one.'
        }
      ]
    },

    legraise: {
      name: 'Leg raise', page: 'exercises.html#legraise', unit: 'reps',
      trains: 'Lower abdominals, hip flexors, and — from the bar — grip and lats.',
      rungs: [
        {
          n: 'Lying knee tuck',
          gate: '3 × 20',
          equip: 'Floor.',
          how: 'Lie on your back with your hands tucked under your hips for support. Pull your '
               + 'knees toward your chest, lifting your hips slightly off the floor at the top, then '
               + 'lower under control without letting your feet touch down.',
          cue: 'Keep the lower back pressed down throughout.',
          avoid: 'Swinging the legs to build momentum.',
          easier: 'Put your hands under your tailbone, or reduce the range.',
          harder: '3 sets of 20 with your lower back flat. Then straighten your legs.',
          first: 'Lower back stays flat. Hands under your tailbone is a legitimate assist, not '
                 + 'cheating.'
        },
        {
          n: 'Lying straight-leg raise',
          gate: '3 × 15',
          equip: 'Floor.',
          how: 'Same position with legs straight. Raise them to vertical, then lower until just '
               + 'before your lower back lifts off the floor, and raise again.',
          cue: 'Stop lowering at the point where the back would arch — that point is your current '
               + 'range.',
          avoid: 'Letting the back arch to get the legs lower. That is where lower-back pain comes '
                 + 'from.',
          easier: 'Bend your knees slightly, or stop the legs higher off the floor.',
          harder: '3 sets of 15 with your heels reaching the floor and your back still flat. Then '
                  + 'take it to the bar.',
          first: 'The moment your lower back arches off the floor, the set is over. That point is '
                 + 'usually much higher than people expect.'
        },
        {
          n: 'Hanging knee raise',
          gate: '3 × 15',
          equip: 'A pull-up bar.',
          sub: 'A playground bar, or dip bars in a support hold.',
          how: 'Hang from the bar with shoulders active. Raise your knees above hip height, '
               + 'curling the pelvis slightly at the top, then lower slowly to a full hang.',
          cue: 'Pause for a full second at the bottom of every rep to kill the swing.',
          avoid: 'Using a body swing to throw the knees up.',
          easier: 'Tuck tighter and raise less high. Or go back to the floor version until your grip '
                  + 'catches up.',
          harder: '3 sets of 15 with no swing. Then straighten your legs.',
          first: 'Your grip will fail before your abs do for the first month. That is normal and it '
                 + 'is why dead hangs are in the program. Control the swing — if you are pendulum-ing, '
                 + 'you are using momentum.'
        },
        {
          n: 'Hanging straight-leg raise',
          gate: '3 × 12',
          equip: 'A pull-up bar.',
          sub: 'Same as above.',
          how: 'Hang with active shoulders and legs straight, toes pointed. Keeping the knees '
               + 'locked, raise your legs to horizontal or above, curling the pelvis slightly at the '
               + 'top, then lower over three seconds to a full hang and pause before the next rep.',
          cue: 'Point your toes and keep the legs locked — bent knees are the easier version.',
          avoid: 'Kipping. If you cannot do it strictly, go back to knee raises.',
          easier: 'Bend the knees. Any amount of bend takes load off.',
          harder: '3 sets of 12 with straight legs to horizontal. Then toes to bar.',
          first: 'Hamstring flexibility limits this as much as strength does. If you cannot reach '
                 + 'horizontal with straight legs, that is usually your hamstrings talking.'
        },
        {
          n: 'Toes to bar',
          gate: '3 × 8',
          equip: 'A pull-up bar with room above and in front.',
          sub: 'Same as above.',
          how: 'From a hang, raise your legs all the way until your feet touch the bar between '
               + 'your hands, then lower with control.',
          cue: 'Lean back slightly and pull with the lats to get the last part of the range.',
          avoid: 'Turning it into a kipping swing to reach the bar.',
          easier: 'Stop at horizontal. Toes to bar is a long way past horizontal.',
          harder: '3 sets of 8, toes touching the bar, without swinging.',
          first: 'Strict toes to bar is genuinely hard. The version you see done fast with a kip is '
                 + 'a different exercise; do not compare yourself to it.'
        }
      ]
    },

    lsit: {
      name: 'L-sit', page: 'exercises.html#legraise', unit: 'sec',
      trains: 'Abs, hip flexors, quads, triceps, and scapular depression — the exact quality that '
              + 'makes handstands, dips and levers possible.',
      rungs: [
        {
          n: 'Foot-supported L-sit',
          gate: '3 × 20 s',
          equip: 'Floor, or two books to raise your hands.',
          sub: 'Parallettes, push-up handles, or the edges of two chairs make this far easier on '
               + 'the wrists.',
          how: 'Sit on the floor with legs straight, hands flat beside your hips (or on two '
               + 'books). Push down hard through your hands to lift your hips off the floor, keeping '
               + 'your heels lightly touching.',
          cue: 'Push your shoulders down away from your ears. That is the strength you are '
               + 'actually building.',
          avoid: 'Shrugging up into your ears, which is what happens the moment you tire.',
          easier: 'Raise your hands higher, or keep more weight on your feet.',
          harder: '3 sets of 20 seconds with your hands taking most of the weight. Then tuck your '
                  + 'knees up.',
          first: 'Raising your hands is the main difficulty dial for the entire L-sit ladder. Books, '
                 + 'parallettes, or chair edges all buy you months of progression.'
        },
        {
          n: 'Tuck L-sit',
          gate: '3 × 20 s',
          equip: 'Parallettes, push-up handles, two books, or the floor.',
          sub: 'Two stacks of hardcovers, or the edges of two sturdy chairs.',
          how: 'Same setup, but tuck your knees to your chest and lift your feet completely clear '
               + 'of the floor. Hold.',
          cue: 'Straight, locked arms and a tall push through the shoulders.',
          avoid: 'Letting the hips sag back below the hands.',
          easier: 'Raise your hands, or lift one foot at a time.',
          harder: '3 sets of 20 seconds with both feet clear of the floor. Then extend one leg.',
          first: 'Push the floor away and press your shoulders down away from your ears. Most people '
                 + 'fail their first tuck L-sit at the shoulders, not the abs.'
        },
        {
          n: 'One-leg-extended L-sit',
          gate: '3 × 15 s /side',
          equip: 'Parallettes, handles, or books.',
          sub: 'Chair edges.',
          how: 'From the tuck, extend one leg straight out horizontally while keeping the other '
               + 'tucked. Alternate between sets.',
          cue: 'Extend the leg without letting the hips drop.',
          avoid: 'Rushing to both legs before one is solid.',
          easier: 'Tuck the extended leg. Any bend takes load off.',
          harder: '3 sets of 15 seconds per side. Then extend both legs.',
          first: 'Alternate sides between sets. Hamstring tightness is often the real limit here '
                 + 'rather than strength.'
        },
        {
          n: 'Full L-sit',
          gate: '3 × 15 s',
          equip: 'Parallettes, handles, or the floor.',
          sub: 'Chair edges, or the floor once you are strong enough to clear it.',
          how: 'Both legs straight out horizontally, toes pointed, arms locked, shoulders '
               + 'depressed, chest up.',
          cue: 'Tight hamstrings, not weak abs, are what usually stop the legs straightening here.',
          avoid: 'Bending the knees slightly and calling it a full L-sit. Film it from the side.',
          easier: 'Bend one or both knees. Raise your hands.',
          harder: '3 sets of 15 seconds with legs level and knees locked.',
          first: 'A clean 15-second L-sit is a real milestone and it takes most people six months or '
                 + 'more. Legs level, knees locked, shoulders down.'
        }
      ]
    },

    handstand: {
      name: 'Handstand', page: 'exercises.html#skills', unit: 'sec',
      trains: 'Shoulders, wrists, core, and balance. Practised fresh, short of failure, and often — '
              + 'this is motor learning, not fatigue.',
      rungs: [
        {
          n: 'Plank → pike hold',
          gate: '60 s plank, 45 s pike',
          equip: 'Floor and a wall.',
          how: 'Hold a straight-arm plank, then walk your feet in and hold a high pike with your '
               + 'hips stacked over your shoulders. Alternate the two.',
          cue: 'Push tall through the shoulders in both positions.',
          avoid: 'Skipping the wrist prep beforehand. Every session, two minutes.',
          easier: 'Shorten the hold, or bend your knees in the pike.',
          harder: 'A 60-second plank and a 45-second pike hold. Then start wall walks.',
          first: 'This is the entry to the handstand line, and it is deliberately unglamorous. The '
                 + 'shape you build here is the shape you will hold upside down.'
        },
        {
          n: 'Wall walk',
          gate: 'walk in and back out 5 times',
          equip: 'A clear wall and four feet of floor.',
          how: 'Start in a push-up position with feet against the wall. Walk your feet up and your '
               + 'hands in until your chest is close to the wall, then walk back out under control.',
          cue: 'Small steps with the hands, and never go further in than you can come back from.',
          avoid: 'Sagging through the middle. Ribs down, glutes on.',
          easier: 'Walk in less far. Only go as far in as you can walk back out from.',
          harder: 'Walk all the way in and back out five times. Then hold at the wall.',
          first: 'Move anything breakable first. Being inverted spikes your heart rate and feels '
                 + 'alarming for the first two or three sessions, then stops.'
        },
        {
          n: 'Chest-to-wall handstand hold',
          gate: '60 s',
          equip: 'A clear wall.',
          how: 'Walk up into a vertical handstand facing the wall, hands a hand-span away from it. '
               + 'Squeeze the glutes, tuck the pelvis, pull the ribs down, push tall, and look at '
               + 'the floor between your hands.',
          cue: 'A straight line from hands through shoulders, hips and heels. This is the shape '
               + 'you are training.',
          avoid: 'Practising back-to-wall instead. It teaches an arched banana you then have to '
                 + 'unlearn.',
          easier: 'Hands further from the wall.',
          harder: '60 seconds of accumulated hold. Then practise kicking up.',
          first: 'Chest to wall, never back to wall. Back-to-wall teaches an arched banana shape '
                 + 'that takes months to unlearn once it is a habit.'
        },
        {
          n: 'Kick-up to wall',
          gate: '10 controlled kick-ups',
          equip: 'A clear wall.',
          how: 'Back to the wall, hands about a foot from it. Step one foot forward, kick the '
               + 'other up and follow with the first, landing your heels lightly on the wall. '
               + 'Practise controlling the kick so you never slam into it.',
          cue: 'Kick just hard enough to reach vertical. Over-kicking is a habit that is hard to '
               + 'break later.',
          avoid: 'Never practising the bail. Learn to turn sideways and step down before you go '
                 + 'freestanding.',
          easier: 'Kick up more gently and accept not reaching vertical. A controlled short kick '
                  + 'beats a wild one.',
          harder: '10 controlled kick-ups where you never slam into the wall. Then start taking your '
                  + 'heels off.',
          first: 'Learn the bail before you need it: turn sideways and step down. Practise it '
                 + 'deliberately, because you will need it the first time you over-kick.'
        },
        {
          n: 'Heel pulls / toe pulls',
          gate: '3-second free hold',
          equip: 'A clear wall.',
          how: 'From the chest-to-wall hold, peel one foot off the wall, then the other, and hold '
               + 'your balance for a moment before touching back.',
          cue: 'Balance comes from your fingers — press through the fingertips when falling '
               + 'forward, through the heel of the hand when falling back.',
          avoid: 'Trying to correct with your hips. Correct with your hands.',
          easier: 'Take one heel off at a time rather than both.',
          harder: 'A three-second free hold. Then go freestanding.',
          first: 'Balance comes from your fingers, not your hips. Press through the fingertips when '
                 + 'you fall forward, through the heel of the hand when you fall back.'
        },
        {
          n: 'Freestanding handstand',
          gate: '30 s',
          equip: 'Floor, ideally something forgiving. A clear space.',
          sub: 'Grass or a mat outdoors is more forgiving than a hardwood floor.',
          how: 'Kick up away from the wall into the same straight shape, and correct continuously '
               + 'with fingertip pressure.',
          cue: 'Small constant corrections, not big saves.',
          avoid: 'Practising when tired. A tired handstand teaches the wrong movement.',
          easier: 'Go back to the wall. The wall is a tool, not a crutch.',
          harder: 'A 30-second freestanding hold.',
          first: 'Small constant corrections, not big saves. Never practise this tired — a tired '
                 + 'handstand teaches the wrong movement and the practice actively sets you back.'
        }
      ]
    }
  };

  /* Accessories that don't need a whole ladder, but still need instructions. */
  var FIXED = {
    calf: {
      n: 'Standing calf raise',
      unit: 'reps', page: 'exercises.html#calf',
      equip: 'Nothing, but a step doubles the range.',
      sub: 'A stair, a thick book, or a doorstep.',
      how: 'Stand tall, ideally with the balls of your feet on a step and your heels hanging off. '
           + 'Let your heels drop below the step for a full stretch, then rise as high onto your '
           + 'toes as you can and pause for two seconds at the top.',
      cue: 'Full range in both directions — a deep stretch at the bottom and a hard squeeze at the '
           + 'top.',
      avoid: 'Bouncing through short reps. Calves respond to range and high reps, not to speed.',
      easier: 'Do them flat-footed on the floor, or hold a wall for balance.',
      harder: '3 sets of 25 with a two-second pause at the top. Then move to one leg.',
      first: 'Calves need range and volume, not speed. A deep stretch at the bottom and a hard '
             + 'squeeze at the top — bouncing through short reps does nothing.'
    },
    calf1: {
      n: 'Single-leg calf raise',
      unit: 'reps /leg', page: 'exercises.html#calf',
      equip: 'A step and a wall for balance.',
      sub: 'A stair and a doorframe.',
      how: 'Same as above on one leg, with the other foot hooked behind your ankle and one hand on '
           + 'a wall for balance. Heel drops below the step, then rise to full tiptoe and pause.',
      cue: 'This is the version that actually loads the calf at bodyweight. Two seconds up, two '
           + 'seconds down.',
      avoid: 'Pulling yourself up with the hand on the wall — it is for balance only.',
      easier: 'Use both legs, or take some weight through the hand on the wall.',
      harder: '3 sets of 20 per leg with a full pause. Then add a loaded backpack.',
      first: 'This is the version that actually loads a calf at bodyweight. The hand on the wall is '
             + 'for balance only — if you are pulling yourself up with it, you are doing a two-limb '
             + 'exercise.'
    },
    sideplank: {
      n: 'Side plank',
      unit: 'sec /side', page: 'exercises.html#core',
      equip: 'Floor. A mat helps your elbow.',
      how: 'Lie on your side, forearm on the floor under your shoulder, feet stacked. Lift your '
           + 'hips until your body is a straight line from ankle to head, and hold. Switch sides.',
      cue: 'Hips high and stacked — do not let the top hip roll forward or the bottom hip sag.',
      avoid: 'Propping on a bent lower leg once it gets hard. Shorten the hold instead.',
      easier: 'Drop to the bottom knee, or put your forearm on a chair.',
      harder: '3 sets of 60 seconds per side with stacked hips.',
      first: 'Hips high and stacked. Do not let the top hip roll forward or the bottom hip sag — '
             + 'shorten the hold instead.'
    },
    superman: {
      n: 'Superman hold',
      unit: 'sec', page: 'exercises.html#core',
      equip: 'Floor.',
      how: 'Lie face down with arms extended overhead. Lift your chest, arms and legs off the '
           + 'floor at the same time and hold, squeezing your glutes.',
      cue: 'Lift with the glutes and mid-back, and keep your neck neutral by looking at the floor.',
      avoid: 'Cranking the neck back to look forward.',
      easier: 'Lift arms and legs alternately rather than together.',
      harder: '3 sets of 45 seconds, or add a small pause at the top of each lift.',
      first: 'Lift with your glutes and mid-back, and keep your neck neutral by looking at the '
             + 'floor. Cranking your head back is the standard mistake.'
    },
    deadbug: {
      n: 'Dead bug',
      unit: 'reps /side', page: 'exercises.html#core',
      equip: 'Floor.',
      how: 'On your back, arms up and knees over hips at 90°. Press your lower back flat into the '
           + 'floor, then slowly lower one arm overhead and the opposite leg toward the floor, '
           + 'return, and switch.',
      cue: 'The lower back never leaves the floor. If it lifts, do not reach as far.',
      avoid: 'Going quickly. Three seconds out, three seconds back.',
      easier: 'Reach less far, or move only the legs.',
      harder: '3 sets of 12 per side, three seconds out and three back.',
      first: 'Your lower back never leaves the floor. If it lifts, do not reach as far. Slow is the '
             + 'point — three seconds out, three seconds back.'
    },
    hang: {
      n: 'Dead hang',
      unit: 'sec', page: 'exercises.html#vpull',
      equip: 'A pull-up bar.',
      sub: 'A playground bar, a scaffolding pole, or a solid tree branch.',
      how: 'Hang from the bar with your thumbs wrapped around it, arms straight, and simply hold '
           + 'until your grip gives out.',
      cue: 'Grip hard and breathe. This is the grip work that stops your pull-ups being capped by '
           + 'your hands.',
      avoid: 'Dropping off at the end. Step or lower down.',
      easier: 'Keep your toes on the ground and take weight off, or break it into shorter sets.',
      harder: 'Work toward 90 seconds unbroken, then hang from one arm at a time.',
      first: 'Your palms will hurt before your grip fails, for the first two weeks. Wrap your thumbs '
             + 'around the bar and never drop off — step or lower down.'
    },
    hollowrock: {
      n: 'Hollow rock',
      unit: 'reps', page: 'exercises.html#core',
      equip: 'Floor. A mat or carpet.',
      how: 'Hold a rigid hollow shape — arms overhead, legs low, lower back pressed flat — and '
           + 'rock back and forth on your lower back from the shoulders.',
      cue: 'The shape never changes. Only the point of contact with the floor moves.',
      avoid: 'Piking at the hips to generate the rocking motion.',
      easier: 'Hold the shape still instead of rocking, or tuck your knees.',
      harder: '3 sets of 25 with the shape unchanged.',
      first: 'The shape never changes; only the contact point moves. If you are piking at the hips '
             + 'to make the rock happen, go back to holding it still.'
    }
  };

  /* A prescription slot in a session.

     e(ladderKey, sets, min, max, rest_seconds, [note], [role])

     role drives the "why these numbers" explanation in the detail panel:
       skill      practised fresh, never to failure — it is a motor skill
       main       the movement this session exists to drive forward
       secondary  real work, but subordinate to the mains
       accessory  small, cheap, high-rep — joints, calves, core

     Volume is deliberately conservative. The 2026 ACSM position stand puts
     hypertrophy at roughly 10 hard sets per muscle per week, and beginner
     guidance sits lower still at 6-10. Three full-body sessions share that
     budget, so no single session carries more than 3-4 sets of any one
     pattern. Sessions that fit in an hour are sessions you keep doing. */
  function e(k, sets, min, max, rest, note, role) {
    return { k: k, sets: sets, min: min, max: max, rest: rest,
             note: note || '', role: role || 'secondary' };
  }
  function main(k, sets, min, max, rest, note) { return e(k, sets, min, max, rest, note, 'main'); }
  function acc(k, sets, min, max, rest, note) { return e(k, sets, min, max, rest, note, 'accessory'); }
  function skill(k, sets, min, max, rest, note) {
    var x = e(k, sets, min, max, rest, note, 'skill'); x.skill = true; return x;
  }

  var PHASES = [
    {
      name: 'Onramp', from: 1, to: 4,
      needs: 'No purchases. The floor, a wall, a sturdy chair, and a table edge or a door handle with a towel.',
      blurb: 'Learn the six patterns, build the habit, and let your tendons catch up to your muscles. Three sets of three main movements is the whole session. Finish every one feeling like you had more in you — that is the point, not a compromise.',
      sessions: {
        A: { title: 'Push emphasis', items: [
          skill('core', 3, 20, 40, 60, 'Hold the shape. Stop the set while it is still a good shape.'),
          main('push', 3, 6, 12, 90),
          main('hpull', 3, 8, 12, 90),
          main('squat', 3, 8, 12, 90),
          e('hinge', 2, 10, 15, 75),
          acc('calf', 2, 15, 20, 45)
        ]},
        B: { title: 'Pull emphasis', items: [
          skill('lsit', 3, 15, 20, 60),
          main('hpull', 3, 8, 12, 90),
          main('dip', 3, 6, 12, 90),
          main('hinge', 3, 10, 15, 75),
          e('push', 2, 8, 12, 90, 'Volume, not a max effort — leave three or four reps in the tank, or drop a rung.'),
          acc('legraise', 2, 10, 15, 60),
          acc('sideplank', 2, 30, 45, 45)
        ]},
        C: { title: 'Legs & full body', items: [
          skill('handstand', 3, 20, 30, 60),
          main('squat', 3, 8, 12, 120),
          main('hinge', 3, 10, 15, 90),
          main('vpush', 2, 6, 10, 90),
          e('hpull', 2, 8, 12, 90),
          acc('deadbug', 2, 10, 10, 45),
          acc('calf1', 2, 12, 15, 45)
        ]}
      }
    },
    {
      name: 'Foundation', from: 5, to: 12,
      needs: 'Everything above, plus a pull-up bar and one resistance band. Buy them during the Onramp — see the gear list.',
      blurb: 'The bar is up. This phase is about your first pull-up, full-range push-ups for real sets, and a chest-to-wall handstand. Sets go to four on the movement each session is built around.',
      sessions: {
        A: { title: 'Push emphasis', items: [
          skill('handstand', 4, 20, 40, 60),
          main('push', 4, 6, 12, 90),
          main('vpull', 4, 3, 8, 120, 'Assisted, negatives, or full reps — whatever your rung is.'),
          e('vpush', 3, 6, 10, 90),
          e('squat', 3, 8, 12, 120),
          acc('core', 3, 30, 45, 60)
        ]},
        B: { title: 'Pull emphasis', items: [
          skill('lsit', 4, 15, 20, 60),
          main('vpull', 4, 3, 8, 120, 'Underhand grip. Chin-ups are easier than pull-ups and they build the pull-up.'),
          main('dip', 4, 5, 12, 120),
          e('hpull', 3, 8, 12, 90),
          e('hinge', 3, 6, 12, 90),
          acc('legraise', 3, 10, 15, 60)
        ]},
        C: { title: 'Legs & skill', items: [
          skill('handstand', 4, 20, 40, 60, 'Wall walks, kick-up practice, heel pulls.'),
          main('squat', 4, 6, 10, 120),
          e('hpull', 3, 8, 12, 90),
          e('vpush', 3, 6, 10, 90),
          e('hinge', 3, 12, 15, 90),
          e('push', 2, 8, 12, 90),
          acc('hang', 2, 20, 60, 60)
        ]}
      }
    },
    {
      name: 'Build', from: 13, to: 24,
      needs: 'Everything above. Parallel bars or rings and a pair of parallettes open up the last few rungs, but nothing here is blocked without them.',
      blurb: 'Pull-ups and dips for real sets, wall handstand push-ups, pistol squats, your first L-sit. Where a rung has stalled, add load — a backpack with books — rather than adding sets.',
      sessions: {
        A: { title: 'Push emphasis', items: [
          skill('handstand', 4, 20, 45, 75, 'Freestanding work.'),
          main('push', 4, 6, 10, 120, 'Add a loaded backpack if this rung has stalled at the top of the rep range.'),
          main('vpull', 4, 5, 8, 120),
          main('vpush', 4, 4, 8, 120),
          e('squat', 3, 8, 12, 120),
          acc('core', 3, 45, 45, 60)
        ]},
        B: { title: 'Pull emphasis', items: [
          skill('lsit', 4, 15, 25, 60, 'Then tuck front lever, once you have 8 strict pull-ups.'),
          main('vpull', 4, 5, 8, 150),
          main('dip', 4, 6, 10, 150),
          e('hpull', 4, 6, 10, 90),
          e('hinge', 3, 5, 8, 90),
          e('push', 2, 6, 10, 90),
          acc('legraise', 3, 10, 12, 60)
        ]},
        C: { title: 'Legs & skill', items: [
          skill('handstand', 4, 20, 45, 75),
          main('squat', 4, 5, 8, 150),
          e('vpull', 2, 5, 8, 120),
          e('hpull', 3, 8, 12, 90),
          e('hinge', 3, 12, 15, 90),
          e('vpush', 2, 6, 10, 90),
          acc('hollowrock', 3, 15, 20, 60)
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

  /* Weeks 1-2 ramp volume so a beginner isn't wrecked before the habit forms.
     Scaled rather than subtracted, so it still ramps when the base is 3 sets.
     Deload weeks cut volume roughly in half and keep the difficulty the same,
     which is what preserves the adaptation while the fatigue drains off. */
  function setsForWeek(baseSets, week) {
    if (week === 1) return Math.max(2, Math.ceil(baseSets * 0.6));
    if (week === 2) return Math.max(2, Math.ceil(baseSets * 0.8));
    if (isDeload(week)) return Math.max(2, Math.round(baseSets / 2));
    return baseSets;
  }

  function label(key, rungs) {
    if (FIXED[key]) return FIXED[key].n;
    var l = LADDERS[key];
    if (!l) return key;
    var i = Math.min(Math.max(rungs && rungs[key] != null ? rungs[key] : 0, 0), l.rungs.length - 1);
    return l.rungs[i].n;
  }

  /* A ladder's unit, unless the rung you are on overrides it — a box squat is
     counted in reps, a pistol squat in reps per leg, on the same ladder. */
  function unit(key, rungs) {
    if (FIXED[key]) return FIXED[key].unit;
    var l = LADDERS[key];
    if (!l) return 'reps';
    if (rungs) {
      var i = Math.min(Math.max(rungs[key] != null ? rungs[key] : 0, 0), l.rungs.length - 1);
      if (l.rungs[i].unit) return l.rungs[i].unit;
    }
    return l.unit;
  }

  /* True when every rung on the ladder shares the ladder's unit, so a page that
     cannot know your rung can still print the unit safely. */
  function unitIsUniform(key) {
    var l = LADDERS[key];
    if (!l) return true;
    for (var i = 0; i < l.rungs.length; i++) if (l.rungs[i].unit) return false;
    return true;
  }

  /* The how-to for whichever rung you are currently on. */
  function guide(key, rungs) {
    if (FIXED[key]) return FIXED[key];
    var l = LADDERS[key];
    if (!l) return null;
    var i = Math.min(Math.max(rungs && rungs[key] != null ? rungs[key] : 0, 0), l.rungs.length - 1);
    return l.rungs[i];
  }

  /* Which rung of the ladder a key sits on, and how many there are. */
  function rungIndex(key, rungs) {
    var l = LADDERS[key];
    if (!l) return null;
    var i = Math.min(Math.max(rungs && rungs[key] != null ? rungs[key] : 0, 0), l.rungs.length - 1);
    return { index: i, count: l.rungs.length };
  }

  /* "Why these numbers" — composed from the slot's role and its actual
     prescription, so the explanation can never drift from the sets and reps
     printed next to it. Returns three short paragraphs, or null for a slot
     with no role. */
  var WHY_SETS = {
    skill: 'Skill work is practice, not a workout. {sets} short sets while you are still fresh teach the position. Grinding it tired teaches a worse one, so this always comes first and never goes to failure.',
    main: 'This is the movement the session exists to drive forward, so it gets {sets} sets while you are freshest. Three full-body sessions share a weekly budget of roughly ten hard sets per muscle — the 2026 ACSM figure — and this is where most of that budget goes.',
    secondary: '{sets} sets. Another session leads this pattern; here it is topping up your weekly volume rather than being pushed hard. Leave a little more in the tank than you would on a main lift.',
    accessory: '{sets} sets, late and cheap. Enough to add up over a month, not enough to cost you the recovery you need for the next session.'
  };

  function why(item) {
    if (!item) return null;
    var isHold = /sec/.test(unit(item.k));
    var sets = item.sets;
    var setsText = (WHY_SETS[item.role] || WHY_SETS.secondary).replace('{sets}', sets);

    var repsText;
    if (isHold) {
      repsText = item.min === item.max
        ? 'Hold for ' + item.min + ' seconds. Add difficulty only once that is comfortable and the shape holds all the way through.'
        : item.min + '\u2013' + item.max + ' seconds. Start at ' + item.min + '. Add time before you add difficulty — when all ' + sets + ' sets hit ' + item.max + ' seconds with the shape intact, move up a rung.';
    } else if (item.min === item.max) {
      repsText = item.min + ' reps every set. This one is not a progression lift; the number stays put.';
    } else {
      repsText = item.min + '\u2013' + item.max + ' reps. Start at ' + item.min + '. When you hit ' + item.max + ' on all ' + sets + ' sets with clean form, that is your signal to move up a rung and drop back to ' + item.min + '. That is double progression, and it is the engine of this whole program.';
    }

    var restText;
    if (item.rest <= 60) {
      restText = item.rest + ' seconds. Small muscles and held shapes recover fast, so a short rest is enough and it keeps the session moving.';
    } else if (item.rest <= 90) {
      restText = item.rest + ' seconds. Long enough that your next set is limited by the muscle you are training rather than by being out of breath. Time it — almost everyone rests less than they think.';
    } else {
      restText = Math.round(item.rest / 60 * 10) / 10 + ' minutes. Hard sets need it. Cutting rest here costs you reps on the next set, and added reps are exactly what you came for.';
    }

    var effort = item.role === 'skill'
      ? 'Never take skill work to failure. Stop each set while it still looks good.'
      : 'Stop two to three reps short of failure. Training to failure is not required for growth and it costs recovery you need for the next session.';

    return { sets: setsText, reps: repsText, rest: restText, effort: effort };
  }

  window.CAL = {
    LADDERS: LADDERS, FIXED: FIXED, PHASES: PHASES, ORDER: ORDER,
    DELOAD_WEEKS: DELOAD_WEEKS,
    phaseForWeek: phaseForWeek, isDeload: isDeload, setsForWeek: setsForWeek,
    label: label, unit: unit, unitIsUniform: unitIsUniform,
    guide: guide, why: why, rungIndex: rungIndex,
    defaultRungs: function () {
      return { push: 1, vpush: 0, vpull: 0, hpull: 0, dip: 0, squat: 1, hinge: 0, core: 0, legraise: 0, lsit: 0, handstand: 0 };
    }
  };
})();
