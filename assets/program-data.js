/* Machine-readable version of program.html and the exercise ladders.
   Consumed by today.html (session runner) and rungs.html (rung finder).
   Keep this in sync with _partials/body/program.html and exercises.html. */

(function () {
  /* Each ladder is ordered easiest → hardest. `gate` is the performance that
     earns the next rung, mirroring the ladders on the exercise library page. */
  var LADDERS = {
    push: {
      name: 'Horizontal push', page: 'exercises.html#hpush', unit: 'reps',
      rungs: [
        { n: 'Wall push-up', gate: '3 × 20' },
        { n: 'High incline push-up (counter)', gate: '3 × 15' },
        { n: 'Low incline push-up (chair)', gate: '3 × 15' },
        { n: 'Knee push-up', gate: '3 × 15' },
        { n: 'Negative push-up (5s down)', gate: '3 × 8' },
        { n: 'Full push-up', gate: '3 × 12' },
        { n: 'Feet-elevated push-up', gate: '3 × 12' },
        { n: 'Diamond push-up', gate: '3 × 12' },
        { n: 'Deficit push-up', gate: '3 × 12' },
        { n: 'Archer push-up', gate: '3 × 8 /side' },
        { n: 'Pseudo-planche push-up', gate: '3 × 8' }
      ]
    },
    vpush: {
      name: 'Vertical push', page: 'exercises.html#vpush', unit: 'reps',
      rungs: [
        { n: 'Incline pike push-up', gate: '3 × 12' },
        { n: 'Floor pike push-up', gate: '3 × 12' },
        { n: 'Feet-elevated pike push-up', gate: '3 × 10' },
        { n: 'Wall plank / wall walk', gate: '60 s' },
        { n: 'Chest-to-wall handstand hold', gate: '60 s' },
        { n: 'Partial wall handstand push-up', gate: '3 × 5' },
        { n: 'Full wall handstand push-up', gate: '3 × 8' }
      ]
    },
    vpull: {
      name: 'Vertical pull', page: 'exercises.html#vpull', unit: 'reps',
      rungs: [
        { n: 'Dead hang', gate: '60 s accumulated' },
        { n: 'Scapular pull-up', gate: '3 × 10' },
        { n: 'Band- or foot-assisted pull-up', gate: '3 × 8' },
        { n: 'Negative pull-up (5s down)', gate: '3 × 5' },
        { n: 'Chin-up (underhand)', gate: '3 × 5' },
        { n: 'Pull-up', gate: '3 × 5' },
        { n: 'Pull-up for reps', gate: '3 × 10' },
        { n: 'Weighted / archer pull-up', gate: '3 × 6 with 25 lb' }
      ]
    },
    hpull: {
      name: 'Horizontal pull', page: 'exercises.html#hpull', unit: 'reps',
      rungs: [
        { n: 'Doorway towel row', gate: '3 × 15' },
        { n: 'Table row, knees bent', gate: '3 × 12' },
        { n: 'Inverted row, legs straight', gate: '3 × 12' },
        { n: 'Feet-elevated inverted row', gate: '3 × 12' },
        { n: 'Archer row', gate: '3 × 8 /side' },
        { n: 'Tuck front lever row', gate: '3 × 6' }
      ]
    },
    dip: {
      name: 'Dip', page: 'exercises.html#dip', unit: 'reps',
      rungs: [
        { n: 'Bench dip, knees bent', gate: '3 × 15' },
        { n: 'Bench dip, legs straight', gate: '3 × 15' },
        { n: 'Bench dip, feet elevated', gate: '3 × 12' },
        { n: 'Parallel-bar support hold', gate: '3 × 30 s' },
        { n: 'Negative dip (5s down)', gate: '3 × 5' },
        { n: 'Parallel-bar dip', gate: '3 × 10' },
        { n: 'Weighted or ring dip', gate: '3 × 8' }
      ]
    },
    squat: {
      name: 'Squat pattern', page: 'exercises.html#squat', unit: 'reps /leg',
      rungs: [
        { n: 'Box squat', gate: '3 × 15' },
        { n: 'Bodyweight squat', gate: '3 × 20' },
        { n: 'Split squat', gate: '3 × 12 /leg' },
        { n: 'Bulgarian split squat', gate: '3 × 12 /leg' },
        { n: 'Assisted / box pistol squat', gate: '3 × 8 /leg' },
        { n: 'Shrimp squat', gate: '3 × 8 /leg' },
        { n: 'Pistol squat', gate: '3 × 5 /leg' }
      ]
    },
    hinge: {
      name: 'Hinge & hamstrings', page: 'exercises.html#hinge', unit: 'reps',
      rungs: [
        { n: 'Glute bridge', gate: '3 × 20' },
        { n: 'Single-leg glute bridge', gate: '3 × 15 /leg' },
        { n: 'Shoulder-elevated hip thrust', gate: '3 × 15' },
        { n: 'Sliding leg curl', gate: '3 × 10' },
        { n: 'Single-leg Romanian deadlift', gate: '3 × 12 /leg' },
        { n: 'Nordic curl negative', gate: '3 × 5' },
        { n: 'Full Nordic curl', gate: '3 × 3' }
      ]
    },
    core: {
      name: 'Core — anti-extension', page: 'exercises.html#core', unit: 'sec',
      rungs: [
        { n: 'Dead bug', gate: '3 × 10 /side' },
        { n: 'Plank', gate: '3 × 60 s' },
        { n: 'Tuck hollow hold', gate: '3 × 45 s' },
        { n: 'One-leg hollow hold', gate: '3 × 45 s' },
        { n: 'Full hollow hold', gate: '3 × 45 s' },
        { n: 'Hollow rock', gate: '3 × 20' },
        { n: 'Long-lever plank / ab wheel', gate: '3 × 30 s' }
      ]
    },
    legraise: {
      name: 'Leg raise', page: 'exercises.html#legraise', unit: 'reps',
      rungs: [
        { n: 'Lying knee tuck', gate: '3 × 20' },
        { n: 'Lying straight-leg raise', gate: '3 × 15' },
        { n: 'Hanging knee raise', gate: '3 × 15' },
        { n: 'Hanging straight-leg raise', gate: '3 × 12' },
        { n: 'Toes to bar', gate: '3 × 8' }
      ]
    },
    lsit: {
      name: 'L-sit', page: 'exercises.html#legraise', unit: 'sec',
      rungs: [
        { n: 'Foot-supported L-sit', gate: '3 × 20 s' },
        { n: 'Tuck L-sit', gate: '3 × 20 s' },
        { n: 'One-leg-extended L-sit', gate: '3 × 15 s /side' },
        { n: 'Full L-sit', gate: '3 × 15 s' }
      ]
    },
    handstand: {
      name: 'Handstand', page: 'exercises.html#skills', unit: 'sec',
      rungs: [
        { n: 'Plank → pike hold', gate: '60 s plank, 45 s pike' },
        { n: 'Wall walk', gate: 'in and out × 5' },
        { n: 'Chest-to-wall handstand hold', gate: '60 s' },
        { n: 'Kick-up to wall', gate: '10 controlled' },
        { n: 'Heel pulls / toe pulls', gate: '3 s free hold' },
        { n: 'Freestanding handstand', gate: '30 s' }
      ]
    }
  };

  /* Fixed accessories that don't need a whole ladder. */
  var FIXED = {
    calf:      { n: 'Standing calf raise',  unit: 'reps' },
    calf1:     { n: 'Single-leg calf raise', unit: 'reps /leg' },
    sideplank: { n: 'Side plank',           unit: 'sec /side' },
    superman:  { n: 'Superman hold',        unit: 'sec' },
    deadbug:   { n: 'Dead bug',             unit: 'reps /side' },
    hang:      { n: 'Dead hang',            unit: 'sec' },
    hollowrock:{ n: 'Hollow rock',          unit: 'reps' }
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

  window.CAL = {
    LADDERS: LADDERS, FIXED: FIXED, PHASES: PHASES, ORDER: ORDER,
    DELOAD_WEEKS: DELOAD_WEEKS,
    phaseForWeek: phaseForWeek, isDeload: isDeload, setsForWeek: setsForWeek,
    label: label, unit: unit,
    defaultRungs: function () {
      return { push: 1, vpush: 0, vpull: 0, hpull: 0, dip: 0, squat: 1, hinge: 0, core: 0, legraise: 0, lsit: 0, handstand: 0 };
    }
  };
})();
